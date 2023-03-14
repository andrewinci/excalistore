import { css } from "@emotion/react";
import virgil from "./Virgil.woff2";

export const GlobalStyles = css`
  @font-face {
    font-family: "virgil";
    src: url(${virgil}) format("woff2");
  }
`;
