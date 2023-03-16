import { useState } from "react";
import { Text, Button, Group, Input } from "./base";

type CreateEditBarProps = {
    activeDrawingName: string | null
    onSave?: (drawingName: string) => void,
    onClear?: () => void
}

export const CreateEditBar = ({ activeDrawingName, onSave, onClear }: CreateEditBarProps) => {
    const [drawingName, setDrawingName] = useState<string>("");
    const CreateNewDrawing = <>
        <Group margin="15px 0 0 0">
            <Input
                style={{ minWidth: "320px" }}
                placeholder='drawing title'
                value={drawingName}
                onChange={e => setDrawingName(e.currentTarget.value)}>
            </Input>
        </Group>
        <Group margin="5px 0 20px 0">
            <Button
                onClick={() => onSave?.(drawingName)}
                color='green'>Save</Button>
            <Button onClick={onClear} color='red'>Clear</Button>
        </Group>
    </>;

    const EditDrawing = <>
        <Group margin="15px 0 0 0">
            <Text size='s'>{activeDrawingName}</Text>
        </Group>
        <Group margin="5px 0 20px 0">
            <Button color='red' onClick={onClear}>New</Button>
            <Button color='orange'>Update</Button>
            <Button color='green'>Save as</Button>
        </Group>
    </>;

    return activeDrawingName ? EditDrawing : CreateNewDrawing;
}

