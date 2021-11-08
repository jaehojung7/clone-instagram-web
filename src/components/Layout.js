import styled from "styled-components";
import Header from "./Header";

const Content = styled.main`
  margin: 0 auto;
  margin-top: 50px;
  max-width: 950px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

function Layout({ children }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}

export default Layout;
