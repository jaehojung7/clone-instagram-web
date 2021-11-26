import styled from "styled-components";

const StyledFormError = styled.span`
  color: tomato;
  /* font-weight: 600; */
  font-size: 12;
  margin-top: 5px;
`;

const FormError = ({ message }) => {
  // In case error message does not exist, return null to eliminate dead space occupied by the component
  return message === "" || !message ? null : (
    <StyledFormError>{message}</StyledFormError>
  );
};

export default FormError;
