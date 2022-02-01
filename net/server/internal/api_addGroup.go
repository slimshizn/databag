package databag

import (
  "net/http"
  "gorm.io/gorm"
  "github.com/google/uuid"
  "databag/internal/store"
)

func AddGroup(w http.ResponseWriter, r *http.Request) {

  account, code, err := BearerAppToken(r, false)
  if err != nil {
    ErrResponse(w, code, err)
    return
  }

  var subject Subject
  if err := ParseRequest(r, w, &subject); err != nil {
    ErrResponse(w, http.StatusBadRequest, err)
    return
  }

  var group *store.Group
  err = store.DB.Transaction(func(tx *gorm.DB) error {

    label := &store.Label{
      LabelId: uuid.New().String(),
      AccountID: account.ID,
      Revision: 1,
      Direct: true,
    }
    if res := tx.Save(label).Error; res != nil {
      return res
    }

    group = &store.Group{
      GroupId: uuid.New().String(),
      AccountID: account.ID,
      LabelID: label.ID,
      Revision: 1,
      DataType: subject.DataType,
      Data: subject.Data,
    }
    if res := tx.Save(group).Error; res != nil {
      return res
    }

    label.Groups = []store.Group{*group}
    if res := tx.Save(label).Error; res != nil {
      return res
    }

PrintMsg("ADDED")
PrintMsg(group.GroupId)
PrintMsg(label.LabelId)
PrintMsg("***")

    if res := tx.Model(&account).Update("group_revision", account.GroupRevision + 1).Error; res != nil {
      return res
    }
    return nil
  })
  if err != nil {
    ErrResponse(w, http.StatusInternalServerError, err)
    return
  }

  SetStatus(account)
  WriteResponse(w, getGroupModel(group))
}



