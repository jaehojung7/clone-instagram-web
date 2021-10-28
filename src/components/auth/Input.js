import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  margin-bottom: 7px;
  padding: 5px 15px;
  background-color: #fafafa;
  border-radius: 3px;
  border: 1px solid rgb(219, 219, 219);
  box-sizing: border-box;
  &::placeholder {
    font-size: 10px;
    font-weight: 600;
  }
`;

function Input(props) {
    return <StyledInput {...props} />;
}

export default Input;