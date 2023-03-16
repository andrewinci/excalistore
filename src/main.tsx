// entry point of the react app that powers the extension pop-up
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { CreateEditBar, DrawingItem, Group, Text, TitleBar, Modal } from './components'
import { useStorage, useContentScript, useModal } from './hooks'
import { GlobalStyles, POP_UP_HEIGHT, POP_UP_WIDTH } from './style'


const App = () => {
  const { drawings, createDrawing, deleteDrawing, updateDrawing } = useStorage();
  const { isAlive, activeDrawingName, getDrawing, setDrawing, checkIsAlive } = useContentScript();
  const { modalProps, closeModal, openModal } = useModal();

  const onSaveButtonClick = async (drawingName: string) => {
    // do nothing if the name is empty
    if ((drawingName?.length ?? 0) == 0) {
      openModal({
        title: "Invalid drawing name",
        description: "The name of a drawing should not be empty.",
        icons: "OK"
      })
      return;
    }

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
    return <Modal
      title="Are you on the Excalidraw website?"
      description={`This extensions only works on the Excalidraw website.\nMake sure to navigate to https://excalidraw.com/ before trying to use this extension.`}
      opened={true}
      icons={"OK"}
      onSubmit={checkIsAlive}
    />
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
    <Modal {...modalProps} />
  </>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Global styles={GlobalStyles} />
    <App />
  </React.StrictMode>,
)