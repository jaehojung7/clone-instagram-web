import styled from "styled-components";
import BaseBox from "../shared";

const StyledFormBox = styled(BaseBox)`
  display: flex;
  justify-content: content;
  align-items: center;
  flex-direction: column;
  padding: 35px 35px 25px 35px;
  margin-bottom: 10px;
  form {
    display: flex;
    justify-content: content;
    align-items: center;
    flex-direction: column;
    /* margin-top: 30px; */
    width: 100%;
  }
`;

function FormBox({ children }) {
  return <StyledFormBox>{children}</StyledFormBox>;
}

export default FormBox;
