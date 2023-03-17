import { css } from "@emotion/react";
// global styles
import virgil from "./Virgil.woff2";

export const POP_UP_WIDTH = 500;
export const POP_UP_HEIGHT = 450;

export const GlobalStyles = css`
  @font-face {
    font-family: "virgil";
    src: url(${virgil}) format("woff2");
  }
  * {
    font-family: "virgil";
  }
  html {
    min-width: ${POP_UP_WIDTH}px;
    max-width: ${POP_UP_WIDTH}px;

    min-height: ${POP_UP_HEIGHT}px;
    max-height: ${POP_UP_HEIGHT}px;

    font-family: virgil;
  }
`;
