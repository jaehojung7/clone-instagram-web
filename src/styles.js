import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  accent: "#0496f6",
  fontColor: "rgb(38,38,38)",
  bgColor: "#fafafa",
  borderColor: "rgb(219,219,219)",
};

export const darkTheme = {
  fontColor: "white",
  bgColor: "#2c2c2c",
  borderColor: "rgb(219,219,219)",
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
    font-size: 11px;
    color: ${(props) => props.theme.fontColor};
    background-color: ${(props) => props.theme.bgColor};
    font-family: "Open Sans", sans-serif;
  }
  a {
    text-decoration: none;
  }
`;
