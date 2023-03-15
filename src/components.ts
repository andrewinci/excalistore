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
};

export const Text = styled.p<TextProps>`
  font-size: ${(props) => fontSizes[props.size]};
  margin: ${(props) => props.margin ?? "0"};
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
`;

export const Button = styled.button`
  font-family: virgil;
  padding: 3px 10px;
  background-color: #ffffff;
  font-size: ${fontSizes.xs};
  border-radius: 4px;
  color: black;
  margin-left: 5px;
  margin-right: 5px;
  &:hover {
    color: #ffffff;
    background-color: black;
  }
`;
