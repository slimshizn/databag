import styled from 'styled-components';

export const EditSubjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    padding-bottom: 16px;
  }

  .controls {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    padding-top: 16px;
    width: 100%;
  }

  input {
    padding-left: 8px;
    background-color: ${props => props.theme.inputArea};
    border: 1px solid ${props => props.theme.sectionBorder};
    color: ${props => props.theme.mainText};
  }

  input::placeholder {
    color: ${props => props.theme.placeholderText};
  }
`
