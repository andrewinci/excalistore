import { floppy, sword } from "../icons";
import { Group, Text } from "./base";

export const TitleBar = () => {
  return (
    <>
      <Group padding="0">
        <img
          alt="sword"
          style={{ width: "25px", marginRight: "10px" }}
          src={sword}
        />
        <Text size="xl" margin="0">
          Excalistore
        </Text>
        <img
          alt="floppy"
          style={{ width: "35px", marginLeft: "10px" }}
          src={floppy}
        />
      </Group>
      <Text textAlign="center" size="xs" margin="0">
        The Excalidraw drawings manager
      </Text>
    </>
  );
};
