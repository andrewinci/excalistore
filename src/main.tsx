// entry point of the react app that powers the extension pop-up
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Button, Group, Input, Text } from './components'
import { floppy, sword } from './icons'
import { useStorage } from './use-storage'
import { GlobalStyles } from './style'
import { useContentScript } from './use-content-script'
import { Drawing } from './model'

const TitleBar = () => {
  return <>
    <Group padding='0'>
      <img style={{ width: "25px", marginRight: "10px" }} src={sword} />
      <Text size="xl" margin="0">Excalistore</Text>
      <img style={{ width: "35px", marginLeft: "10px" }} src={floppy} />
    </Group>
    <Group margin='0' padding='0' >
      <Text size="xs" margin="0">The Excalidraw drawings manager</Text>
    </Group>
  </>
}

type DrawingItemProps = {
  name: string,
  date: string,
  onOpen?: () => void,
  onUpdate?: () => void,
  onDelete?: () => void,
}

const DrawingItem = (props: DrawingItemProps) => {
  const { name, date, onOpen, onDelete, onUpdate } = props;
  const ItemContainer = styled.div`
    border: 1px solid black;
    padding: 0px 10px;
    background-color: #e8e8e8;
  `;
  return <ItemContainer>
    <Text margin="5px" size='s'>{name}</Text>
    <Group margin='0px 0px 5px 0px' alignItems='flex-end' justifyContent="space-between">
      <Group maxHeight={30}>
        <Button onClick={onOpen} color='green'>Open</Button>
        {/* <Button onClick={onUpdate} color='orange'>Update</Button> */}
        <Button onClick={onDelete} color='red'>Bin it</Button>
      </Group>
      <Text size='s' margin="0px">{date}</Text>
    </Group>
  </ItemContainer>
}

const App = () => {
  const { drawings, createDrawing, deleteDrawing } = useStorage();
  const { isAlive, activeDrawingName, getDrawing, setDrawing } = useContentScript();
  const [drawingName, setDrawingName] = useState<string>("");

  const onSaveButtonClick = async () => {
    // do nothing if the name is empty
    //todo: show a warning to the user
    if ((drawingName?.length ?? 0) == 0) return;

    // retrieve the drawing from content-script
    const drawing = await getDrawing();
    await createDrawing({
      id: Date.now().toString(), //todo: use an uuid
      name: drawingName!,
      lastUpdate: new Date().toDateString(),
      data: drawing
    })
  }

  const SaveNewDrawing = <>
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
        onClick={onSaveButtonClick}
        color='green'>Save</Button>
    </Group>
  </>;

  const UpdateDrawing = <>
    <Group margin="15px 0 0 0">
      <Text size='s'>{activeDrawingName}</Text>
    </Group>
    <Group margin="5px 0 20px 0">
      <Button color='red'>New</Button>
      <Button color='orange'>Update</Button>
      <Button color='green'>Save as</Button>
    </Group>
  </>;

  if (!isAlive) {
    //todo: use a modal instead
    return <p>Make sure to be in the excalidraw website to use this extension.</p>
  }

  return <>
    <TitleBar />
    {activeDrawingName ? UpdateDrawing : SaveNewDrawing}
    <Group margin='0px 0px 5px 0'>
      <Text size='l'>Local drawings:</Text>
    </Group>
    <div style={{ maxHeight: "240px", minHeight: "240px", overflow: "scroll", border: "2px solid black", borderRadius: "4px" }}>
      {drawings.map(d => <DrawingItem
        key={d.id}
        name={d.name}
        date={d.lastUpdate}
        onDelete={() => deleteDrawing(d.id)}
        //todo: this needs a warning to the user
        onOpen={async () => await setDrawing(d)}
      />)}
    </div>
  </>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Global styles={GlobalStyles} />
    <App />
  </React.StrictMode>,
)