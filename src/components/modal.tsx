import styled from "@emotion/styled";
import { useState } from "react";
import { POP_UP_WIDTH } from "../style";
import { Group, Text, Button } from "./base";

export type ModalProps = {
    title?: string,
    description?: string,
    opened: boolean,
    onSubmit: (response: "Ok" | "Ignore") => void
}

export const Modal = (props: ModalProps) => {
    const { title, description, opened, onSubmit } = props;
    const ModalBackground = styled.div`
      position: absolute;
      top: 0px;
      height: 100%;
      
      left: 0px;
      min-width: 100%;
      background-color: gray;
      opacity: 0.4;
    `;
    const ModalContainer = styled.div`
      position: absolute;
      top: 120px;
      min-height: 120px;
      
      left: ${(POP_UP_WIDTH - 380) / 2}px;
      min-width: 380px;
  
      padding: 10px;
      z-index: 999;
  
      border: 2px black solid;
      border-radius: 4px;
      background-color: white;
    `;
    return <>
        <ModalBackground hidden={!opened} />
        <ModalContainer hidden={!opened}>
            <Group>
                <Text size='l'>{title}</Text>
            </Group>
            <Group margin='5px 0 0 0' style={{ minHeight: "60px" }}>
                <Text size='s'>{description}</Text>
            </Group>
            <Group margin='0px 30px' justifyContent='space-between'>
                <Button onClick={() => props.onSubmit("Ignore")} color='green'>Ignore</Button>
                <Button onClick={() => props.onSubmit("Ok")} color='red'>Ok</Button>
            </Group>
        </ModalContainer>
    </>
}