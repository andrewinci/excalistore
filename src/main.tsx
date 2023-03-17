// entry point of the react app that powers the extension pop-up
import { Global } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { CreateEditBar, DrawingItem, Group, Text, TitleBar, Modal } from './components'
import { useStorage, useContentScript, useModal } from './hooks'
import { Drawing } from './model'
import { GlobalStyles } from './style'


const App = () => {
  const { drawings, createDrawing, deleteDrawing, updateDrawing } = useStorage();
  const { isAlive, activeDrawingName, getDrawing, setDrawing, checkIsAlive } = useContentScript();
  const { modalProps, closeModal, openModal } = useModal();
  const [mode, setMode] = useState<"Create" | "Edit">("Create");

  useEffect(() => { setMode(activeDrawingName ? "Edit" : "Create") }, [activeDrawingName]);

  const onSave = async (drawingName: string) => {
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
    await setDrawing(drawing.data, drawing);
    setMode("Edit")
  }

  const onDelete = async (drawing: Drawing) => {
    openModal({
      title: "Deleting drawing",
      description: `Are you sure you want to delete ${drawing.name}?\nThis action is not reversible.`,
      icons: "OkIgnore",
      onSubmit: (response) => {
        if (response === 'Ok') deleteDrawing(drawing.id);
        closeModal();
      }
    })
  };

  const onClearCanvas = async () => {
    openModal({
      title: "Are you sure?",
      description: `Are you sure you want to clear the canvas?\nThe current drawing will be lost.`,
      icons: "OkIgnore",
      onSubmit: (response) => {
        if (response === 'Ok') setDrawing([], null);
        closeModal();
      }
    })
  };

  const onUpdate = async () => {
    const rawDrawing = await getDrawing();
    openModal({
      title: "Update drawing",
      description: `Are you sure you want to update ${activeDrawingName?.name}?`,
      icons: "OkIgnore",
      onSubmit: async (response) => {
        if (response === 'Ok') {
          await updateDrawing({
            id: activeDrawingName!.id,
            name: activeDrawingName!.name,
            lastUpdate: new Date().toDateString(),
            data: rawDrawing
          });
        }
        closeModal();
      }
    });
  }

  const onOpen = async (drawing: Drawing) => {
    openModal({
      title: "Open drawing",
      description: `Are you sure you want to open ${activeDrawingName?.name}? Any unsaved changes to the current doc will be lost.`,
      icons: "OkIgnore",
      onSubmit: async (response) => {
        if (response === 'Ok') {
          await setDrawing(drawing.data, drawing);
        }
        closeModal();
      }
    });

  }

  if (!isAlive) {
    return <Modal
      title="Excalistore"
      description={`This extensions only works on the Excalidraw website.\nMake sure to navigate to https://excalidraw.com/ before trying to use this extension.`}
      opened={true}
      icons={"OK"}
      onSubmit={checkIsAlive}
    />
  }

  return <>
    <TitleBar />
    <CreateEditBar
      activeDrawingName={activeDrawingName?.name ?? ""}
      mode={mode}
      onSaveAs={() => setMode("Create")}
      onUpdate={onUpdate}
      onClear={onClearCanvas}
      onSave={onSave} />
    <Group margin='0px 0px 5px 0'>
      <Text size='l'>Local drawings:</Text>
    </Group>
    <div style={{ maxHeight: "240px", minHeight: "240px", overflow: "scroll", border: "2px solid black", borderRadius: "4px" }}>
      {drawings.map(d => <DrawingItem
        key={d.id}
        name={d.name}
        date={d.lastUpdate}
        onDelete={() => onDelete(d)}
        onOpen={async () => await onOpen(d)}
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