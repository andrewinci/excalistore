// entry point of the react app that powers the extension pop-up
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Button, CreateEditBar, DrawingItem, Group, Input, Text, TitleBar } from './components'
import { useStorage, useContentScript } from './hooks'
import { GlobalStyles } from './style'


const App = () => {
  const { drawings, createDrawing, deleteDrawing, updateDrawing } = useStorage();
  const { isAlive, activeDrawingName, getDrawing, setDrawing } = useContentScript();

  const onSaveButtonClick = async (drawingName: string) => {
    // do nothing if the name is empty
    //todo: show a warning to the user
    if ((drawingName?.length ?? 0) == 0) return;

    // retrieve the drawing from content-script
    const rawDrawing = await getDrawing();
    const drawing = await createDrawing({
      id: Date.now().toString(), //todo: use an uuid
      name: drawingName!,
      lastUpdate: new Date().toDateString(),
      data: rawDrawing
    });
    await setDrawing(drawing);
  }

  if (!isAlive) {
    //todo: use a modal instead
    return <p>Make sure to be in the excalidraw website to use this extension.</p>
  }

  return <>
    <TitleBar />
    <CreateEditBar
      activeDrawingName={activeDrawingName}
      onClear={() => setDrawing({ data: [], name: null })}
      onSave={onSaveButtonClick} />
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