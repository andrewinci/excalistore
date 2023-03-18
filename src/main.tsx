// entry point of the react app that powers the extension pop-up
import { Global } from "@emotion/react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createTab } from "./browser";
import {
  CreateEditBar,
  DrawingItem,
  Group,
  Text,
  TitleBar,
  Modal,
  Button,
} from "./components";
import { useStorage, useContentScript, useModal } from "./hooks";
import { Drawing } from "./model";
import { GlobalStyles } from "./style";

const App = () => {
  const { drawings, createDrawing, deleteDrawing, updateDrawing } =
    useStorage();
  const { isAlive, activeDrawing, url, getDrawing, setDrawing, checkIsAlive } =
    useContentScript();
  const { modalProps, closeModal, openModal } = useModal();
  const [mode, setMode] = useState<"Create" | "Edit">("Create");

  useEffect(() => {
    setMode(activeDrawing ? "Edit" : "Create");
  }, [activeDrawing]);

  const onSave = async (drawingName: string) => {
    // do nothing if the name is empty
    if ((drawingName?.length ?? 0) === 0) {
      openModal({
        title: "Invalid drawing name",
        description: "The name of a drawing should not be empty.",
        icons: "OK",
      });
      return;
    }

    // retrieve the drawing from content-script
    const rawDrawing = await getDrawing();
    if (!rawDrawing) throw Error("Unable to retrieve the raw drawing");

    const drawing = await createDrawing({
      id: Date.now().toString(), //todo: use an uuid
      name: drawingName!,
      lastUpdate: new Date().toDateString(),
      data: rawDrawing,
    });
    await setDrawing(drawing.data, drawing);
    setMode("Edit");
  };

  const onDelete = async (drawing: Drawing) => {
    openModal({
      title: "Deleting drawing",
      description: `Are you sure you want to delete ${drawing.name}?\nThis action is not reversible.`,
      icons: "OkIgnore",
      onSubmit: async (response) => {
        if (response === "Ok") {
          await deleteDrawing(drawing.id);
          if (activeDrawing?.id === drawing.id) {
            await setDrawing("[]", null);
          }
        }
        closeModal();
      },
    });
  };

  const onCleanCanvas = async () => {
    openModal({
      title: "Cleaning canvas",
      description: `Are you sure you want to clear the canvas?\nThe current drawing will be lost.`,
      icons: "OkIgnore",
      onSubmit: (response) => {
        if (response === "Ok") setDrawing("[]", null);
        closeModal();
      },
    });
  };

  const onUpdate = async () => {
    const rawDrawing = await getDrawing();
    if (!rawDrawing) throw Error("Unable to retrieve the raw drawing");
    openModal({
      title: "Update drawing",
      description: `Are you sure you want to update ${activeDrawing?.name}?`,
      icons: "OkIgnore",
      onSubmit: async (response) => {
        if (response === "Ok") {
          await updateDrawing({
            id: activeDrawing!.id,
            name: activeDrawing!.name,
            lastUpdate: new Date().toDateString(),
            data: rawDrawing,
          });
        }
        closeModal();
      },
    });
  };

  const onOpen = async (drawing: Drawing) => {
    openModal({
      title: "Open drawing",
      description: `Are you sure you want to open ${activeDrawing?.name}? Any unsaved changes to the current doc will be lost.`,
      icons: "OkIgnore",
      onSubmit: async (response) => {
        if (response === "Ok") {
          await setDrawing(drawing.data, drawing);
        }
        closeModal();
      },
    });
  };

  if (!isAlive) {
    return (
      <Modal
        title="Excalistore"
        description={
          <>
            <Text
              textAlign="center"
              size="xs"
            >{`This extensions only works on the Excalidraw website.`}</Text>
            <Group margin="25px 0 0 0">
              <Button
                color="green"
                onClick={() => createTab("https://excalidraw.com/")}
              >
                Go to Excalidraw
              </Button>
            </Group>
          </>
        }
        opened={true}
        icons={"None"}
        onSubmit={checkIsAlive}
      />
    );
  }

  console.debug("url", url);
  console.debug("isAlive", isAlive);
  if (url === null || url.substring(url.indexOf("#")).includes("#room=")) {
    return (
      <Modal
        title="Excalistore"
        description={
          <div style={{ marginTop: "25px" }}>
            <Text
              textAlign="center"
              size="xs"
            >{`Live collaboration is not supported.`}</Text>
            <Text
              textAlign="center"
              size="xs"
            >{`Exit from the live collaboration to use Excalistore.`}</Text>
          </div>
        }
        opened={true}
        icons={"None"}
        onSubmit={checkIsAlive}
      />
    );
  }

  return (
    <>
      <TitleBar />
      <CreateEditBar
        activeDrawingName={activeDrawing?.name ?? ""}
        mode={mode}
        onSaveAs={() => setMode("Create")}
        onUpdate={onUpdate}
        onClean={onCleanCanvas}
        onSave={onSave}
      />
      <Text margin="0px 0px 5px 0" textAlign="center" size="l">
        Local drawings:
      </Text>
      <div
        style={{
          maxHeight: "240px",
          minHeight: "240px",
          overflowY: "auto",
          border: "2px solid black",
          borderRadius: "4px",
        }}
      >
        {drawings.map((d) => (
          <DrawingItem
            key={d.id}
            name={d.name}
            date={d.lastUpdate}
            onDelete={() => onDelete(d)}
            onOpen={async () => await onOpen(d)}
          />
        ))}
      </div>
      <Modal {...modalProps} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Global styles={GlobalStyles} />
    <App />
  </React.StrictMode>
);
