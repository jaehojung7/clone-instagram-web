import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  accent: "#0496f6",
  borderColor: "rgb(219,219,219)",
};

export const darkTheme = {
  fontColor: "white",
  bgColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  input {
    all: unset;
  };
  * {
    box-sizing: border-box;
  };

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    color: rgb(38,38,38);
    background-color: #fafafa;
    font-family: "Open Sans", sans-serif;
  }
  a {
    text-decoration: none;
  }
`;
