import styled from "styled-components";

const StyledButton = styled.input`
  background-color: ${(props) => props.theme.accent};
  text-align: center;
  color: white;
  margin-top: 5px;
  padding: 6px 0px;
  border: none;
  border-radius: 3px;
  font-size: 12 px;
  font-weight: 600;
  width: 100%;
`;

function Button(props) {
  return <StyledButton {...props} />;
}

export default Button;
