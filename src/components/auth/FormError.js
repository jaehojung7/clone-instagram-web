import styled from "styled-components";

const StyledFormError = styled.span`
  color: tomato;
  /* font-weight: 600; */
  font-size: 12;
  margin-top: 5px;
`;

const FormError = ({ message }) => {
  return (message === "" || !message) ? null : <StyledFormError>{message}</StyledFormError>;
};

export default FormError;
