import styled from "@emotion/styled";

type TextProps = {
    size: "xl" | "l" | "s";
    margin?: number
}

export const Text = styled.p<TextProps>`
    font-size: ${(props) => {
        switch (props.size) {
            case "xl": return "20px";
            case "l": return "10px";
            case "s": return "18px";
        }
    }};
    margin: ${props => props.margin ? `${props.margin}px` : 0};
` 