import styled from "styled-components";

const StyledSeparator = styled.div`
  margin: 10px 0 15px 0;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(219, 219, 219);
  }
  span {
    margin: 0 15px;
    color: #8e8e8e;
    font-weight: 600;
  }
`;

function Separator() {
  return (
    <StyledSeparator>
      <div></div>
      <span>Or</span>
      <div></div>
    </StyledSeparator>
  );
}

export default Separator;
