import styled from "@emotion/styled";

const fontSizes = {
  xl: "35px",
  l: "23px",
  s: "18px",
  xs: "14px",
};

type TextProps = {
  size: "xl" | "l" | "s" | "xs";
  margin?: string;
  textAlign?: "center";
};

export const Text = styled.p<TextProps>`
  font-size: ${(props) => fontSizes[props.size]};
  margin: ${(props) => props.margin ?? "0"};
  text-align: ${(props) => props.textAlign ?? undefined};
`;

export const Input = styled.input`
  font-family: virgil;
  padding: 3px;
  text-align: center;
  background-color: #ffffff;
  font-size: ${fontSizes.xs};
  border-radius: 4px;
  color: black;
  margin-left: 5px;
  margin-right: 5px;
`;

type GroupProps = {
  justifyContent?: "center" | "space-between";
  alignItems?: "flex-end";
  maxHeight?: number;
  margin?: string;
  padding?: string;
};

export const Group = styled.div<GroupProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent ?? "center"};
  max-height: ${(props) =>
    props.maxHeight ? `${props.maxHeight}px` : undefined};
  margin: ${(props) => props.margin ?? undefined};
  padding: ${(props) => props.padding ?? undefined};
  align-items: ${(props) => props.alignItems ?? undefined};
`;

type ButtonProps = {
  color: "green" | "orange" | "red";
};

export const Button = styled.button<ButtonProps>`
  font-family: virgil;
  padding: 3px 10px;
  background-color: ${(props) => props.color};
  font-size: ${fontSizes.xs};
  border-radius: 4px;
  color: black;
  margin-left: 5px;
  margin-right: 5px;
  &:hover {
    color: ${(props) => props.color};
    background-color: black;
  }
`;
