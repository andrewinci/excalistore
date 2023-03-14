import { css } from "@emotion/react";
// global styles
import virgil from "./Virgil.woff2";

export const GlobalStyles = css`
  @font-face {
    font-family: "virgil";
    src: url(${virgil}) format("woff2");
  }
  * {
    font-family: "virgil";
  }
  html {
    min-width: 600px;
    max-width: 600px;

    min-height: 450px;
    max-height: 450px;

    font-family: virgil;
  }
`;
