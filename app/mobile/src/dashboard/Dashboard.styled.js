import { StyleSheet } from 'react-native';
import { Colors } from 'constants/Colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.screenBase,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.horizontalDivider,
  },
  headerLabel: {
    paddingLeft: 16,
    fontSize: 20,
    color: Colors.text,
  },
  pad: {
    height: 32,
  },
  icon: {
    color: Colors.linkText,
    paddingLeft: 16,
  },
  end: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 32,
  },
  accounts: {
    borderBottomWidth: 1,
    borderColor: Colors.itemDivider,
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 0,
  },
  account: {
    width: '100%',
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.itemDivider,
  },
  details: {
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    paddingTop: 8,
  },
  name: {
    fontSize: 14,
    color: Colors.text,
  },
  handle: {
    fontSize: 14,
    color: Colors.text,
  },
  control: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  delete: {
    color: Colors.alert,
    paddingLeft: 16,
  },
  unlock: {
    color: Colors.alert,
    paddingLeft: 16,
  },
  disable: {
    color: Colors.pending,
    paddingLeft: 16,
  },
  saveText: {
    color: Colors.primaryButtonText,
  },
  save: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    padding: 6,
    marginRight: 8,
    width: 92,
    display: 'flex',
    alignItems: 'center',
  },
  cancel: {
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    borderRadius: 4,
    padding: 6,
    marginRight: 8,
    width: 92,
    display: 'flex',
    alignItems: 'center',
  },
  cancelText: {
    color: Colors.cancelButtonText,
  },
  modalBackground: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modalControls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderColor: Colors.divider,
  },
  modalContainer: {
    backgroundColor: Colors.modalBase,
    width: '80%',
    maxWidth: 400,
    maxHeight: '80%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.modalBorder,
  },
  modalHeader: {
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: Colors.divider,
    padding: 16,
  },
  modalHeaderText: {
    fontSize: 18,
    color: Colors.text,
  },
  modalBase: {
    display: 'flex', 
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  modalOverlay: {
    width: '100%',
    height: '100%',
  },
  modalBody: {
    padding: 16,
  },
  accessToken: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  token: {
    color: Colors.text,
  },
  modalLabel: {
    paddingTop: 8,
    color: Colors.text,
  },
  keyType: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
  },
  option: {
    color: Colors.text,
  },
  optionLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  optionRight: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderColor: Colors.primary,
    borderWidth: 1,
    marginRight: 8,
  },
  selected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderColor: Colors.primary,
    borderWidth: 1,
    marginRight: 8,
    backgroundColor: Colors.background,
  },
  input: {
    marginTop: 4,
    backgroundColor: Colors.white,
    padding: 4,
    borderRadius: 4,
    marginBottom: 16,
    fontSize: 12,
    color: Colors.text,
  },
  switch: {
    transform: [{ scaleX: .7 }, { scaleY: .7 }],
  },
  track: {
    false: Colors.grey,
    true: Colors.background,
  },
  media: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  tokenLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  copy: {
    marginLeft: 8,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.divider,
  },
  label: {
    borderTopWidth: 1,
    borderColor: Colors.divider,
    marginTop: 12,
  },
  labelText: {
    fontSize: 14,
    color: Colors.text,
  },
  ice: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    paddingBottom: 8,
  },
  field: {
    input: {
      backgroundColor: Colors.inputBase,
      borderRadius: 8,
      minHeight: 32,
      maxHeight: 128,
    },
    inputText: {
      color: Colors.inputText,
    },
    label: {
      height: 16,
      paddingLeft: 8,
    },
    labelText: {
      color: Colors.inputPlaceholder,
      fontSize: 12,
    },
    container: {
      width: '100%',
      marginBottom: 8,
    },
  },
});
