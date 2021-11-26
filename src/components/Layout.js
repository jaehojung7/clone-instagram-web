// This component allows us to change the header layout based on our needs

import styled from "styled-components";
import Header from "./Header";

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 930px;
  width: 100%;
`;

function Layout({ children }) {
  return (
    // In React, you should always return a component
    // In case you want to return multiple components without a parent, create an empty parent component <></> (called "fragment")
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}

export default Layout;
