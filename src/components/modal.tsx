import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import styled from "@emotion/styled";
import { POP_UP_WIDTH } from "../style";
import { Group, Text, Button } from "./base";

export type ModalProps = {
  title?: string;
  description?: string | ReactJSXElement;
  opened: boolean;
  icons?: "OK" | "Ignore" | "OkIgnore" | "None";
  onSubmit?: (response: "Ok" | "Ignore") => void;
};

export const Modal = (props: ModalProps) => {
  const { title, description, opened, onSubmit, icons } = props;
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
    max-width: 380px;

    padding: 10px;
    z-index: 999;

    border: 2px black solid;
    border-radius: 4px;
    background-color: white;
  `;
  return (
    <>
      <ModalBackground hidden={!opened} />
      <ModalContainer hidden={!opened}>
        <Group>
          <Text size="l">{title}</Text>
        </Group>
        <div style={{ margin: "5px 0 0 5px", minHeight: "60px" }}>
          {typeof description === "string" ? (
            <Group>
              <Text size="xs">{description}</Text>
            </Group>
          ) : (
            description
          )}
        </div>
        <Group
          margin="0px 28px"
          justifyContent={
            (icons ?? "OkIgnore") === "OkIgnore" ? "space-between" : "center"
          }
        >
          <Button
            hidden={icons === "None" || icons === "Ignore"}
            onClick={() => onSubmit?.("Ok")}
            color="red"
          >
            Ok
          </Button>
          <Button
            hidden={icons === "None" || icons === "OK"}
            onClick={() => onSubmit?.("Ignore")}
            color="green"
          >
            Ignore
          </Button>
        </Group>
      </ModalContainer>
    </>
  );
};
