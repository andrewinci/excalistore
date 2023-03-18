import { useEffect, useState } from "react";
import { Text, Button, Group, Input } from "./base";

type CreateEditBarProps = {
  activeDrawingName: string | null;
  mode: "Create" | "Edit";
  onSave?: (drawingName: string) => void;
  onUpdate?: () => void;
  onClear?: () => void;
  onSaveAs?: () => void;
};

export const CreateEditBar = (props: CreateEditBarProps) => {
  const { activeDrawingName, mode, onSave, onClear, onSaveAs, onUpdate } =
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
        <Button onClick={onClear} color="red">
          Clear canvas
        </Button>
      </Group>
    </>
  );

  const EditDrawing = (
    <>
      <Group margin="15px 0 0 0">
        <Text size="s">{activeDrawingName}</Text>
      </Group>
      <Group margin="5px 0 20px 0">
        <Button color="red" onClick={onClear}>
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
