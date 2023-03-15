// entry point of the react app that powers the extension pop-up
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Button, Group, Input, Text } from './components'
import { floppy, sword } from './icons'
import { useChromeStorage } from './storage'
import { GlobalStyles } from './style'

const TitleBar = () => {
  return <>
    <Group padding='0'>
      <img style={{ width: "25px", marginRight: "10px" }} src={sword} />
      <Text size="xl" margin="0">Excalistore</Text>
      <img style={{ width: "35px", marginLeft: "10px" }} src={floppy} />
    </Group>
    <Group margin='0' padding='0' >
      <Text size="s" margin="0">The Excalidraw drawings manager</Text>
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
        <Button onClick={onUpdate} color='orange'>Update</Button>
        <Button onClick={onDelete} color='red'>Bin it</Button>
      </Group>
      <Text size='s' margin="0px">{date}</Text>
    </Group>
  </ItemContainer>
}

const App = () => {
  const { drawings, createDrawing, deleteDrawing } = useChromeStorage();
  const [drawingName, setDrawingName] = useState<string>();
  const onSaveButtonClick = async () => {
    // do nothing if the name is empty
    //todo: show a warning to the user
    if ((drawingName?.length ?? 0) == 0) return;
    await createDrawing({
      id: Date.now().toString(), //todo: use an uuid
      name: drawingName!,
      lastUpdate: new Date().toDateString(),
      data: {} //todo
    })
  }

  return <>
    <TitleBar />
    <Group margin="25px 0 25px 0">
      <Input
        style={{ minWidth: "320px" }}
        placeholder='drawing title'
        value={drawingName}
        onChange={e => setDrawingName(e.currentTarget.value)}>
      </Input>
      <Button
        onClick={onSaveButtonClick}
        color='green'>Save drawing</Button>
    </Group>
    <Group margin='0px 0px 5px 0'>
      <Text size='l'>My drawings</Text>
    </Group>
    <div style={{ maxHeight: "245px", minHeight: "245px", overflow: "scroll", border: "2px solid black", borderRadius: "4px" }}>
      {drawings.map(d => <DrawingItem
        key={d.id}
        name={d.name}
        date={d.lastUpdate}
        onDelete={() => deleteDrawing(d.id)}
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