import styled from "@emotion/styled";

type GroupProps = {
    justifyContent?: "center" | "space-between"
    maxHeight?: number;
}

export const Group = styled.div<GroupProps>`
    display: flex; 
    justify-content: ${props => (props.justifyContent ?? "center")};
    max-height: ${props => props.maxHeight ? `${props.maxHeight}px` : undefined};
`