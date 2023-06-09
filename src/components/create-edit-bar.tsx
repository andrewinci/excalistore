import { useEffect, useState } from "react";
import { Text, Button, Group, Input } from "./base";

type CreateEditBarProps = {
  activeDrawingName: string | null;
  mode: "Create" | "Edit";
  onSave?: (drawingName: string) => void;
  onUpdate?: () => void;
  onClean?: () => void;
  onSaveAs?: () => void;
};

export const CreateEditBar = (props: CreateEditBarProps) => {
  const { activeDrawingName, mode, onSave, onClean, onSaveAs, onUpdate } =
    props;
  const [drawingName, setDrawingName] = useState<string>("");
  useEffect(() => {
    setDrawingName(activeDrawingName ?? "");
  }, [activeDrawingName]);
  const CreateNewDrawing = (
    <>
      <Group margin="15px 0 0 0">
        <Input
          style={{ minWidth: "320px" }}
          placeholder="drawing title"
          value={drawingName}
          onChange={(e) => setDrawingName(e.currentTarget.value)}
        ></Input>
      </Group>
      <Group margin="5px 0 20px 0">
        <Button onClick={() => onSave?.(drawingName)} color="green">
          Save
        </Button>
        <Button onClick={onClean} color="red">
          Clean canvas
        </Button>
      </Group>
    </>
  );

  const EditDrawing = (
    <>
      <Text textAlign="center" margin="15px 0 0 0" size="s">
        {activeDrawingName}
      </Text>
      <Group margin="5px 0 20px 0">
        <Button color="red" onClick={onClean}>
          New
        </Button>
        <Button color="orange" onClick={onUpdate}>
          Update
        </Button>
        <Button color="green" onClick={onSaveAs}>
          Save as
        </Button>
      </Group>
    </>
  );

  return mode === "Edit" ? EditDrawing : CreateNewDrawing;
};
