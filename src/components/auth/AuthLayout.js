import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 300px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 400px;
  width: 100%;
`;

function AuthLayout({ children }) {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}

export default AuthLayout;
