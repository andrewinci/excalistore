import { useEffect, useState } from "react";
import { Drawing, PopUpMessage, ScriptMessage } from "./model";

export const useContentScript = () => {
  const [isAlive, setIsAlive] = useState(false);
  const [activeDrawingName, setActiveDrawingName] = useState<string | null>(
    null
  );

  useEffect(() => {
    (async () => {
      try {
        // check if the content-script is responding
        const response = await sendReceiveMessage({ action: "ping" });
        setIsAlive(response?.action === "pong");
        // retrieve the name of the current drawing
        await updateActiveDrawingName();
      } catch (err) {
        setIsAlive(false);
      }
    })();
  }, []);

  const getDrawing = async () => {
    const response = await sendReceiveMessage({ action: "get-drawing" });
    if (response?.action === "drawing") {
      return response.data;
    } else {
      throw Error("Missing or invalid response from the content-script.");
    }
  };

  const setDrawing = async (drawing: {data: any, name: string | null}) => {
    const response = await sendReceiveMessage({
      action: "set-drawing",
      data: drawing.data,
      name: drawing.name,
    });
    if (response?.action === "drawing-set") {
      await updateActiveDrawingName();
      return true;
    } else {
      return false;
    }
  };

  const updateActiveDrawingName = async () => {
    const response = await sendReceiveMessage({ action: "get-name" });
    if (response?.action === "name") {
      setActiveDrawingName(response.name);
    } else {
      setActiveDrawingName(null);
    }
  };

  return {
    isAlive,
    activeDrawingName,
    getDrawing,
    setDrawing,
  };
};

const sendReceiveMessage = async (
  message: PopUpMessage
): Promise<ScriptMessage | null> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  if (!tab.id) {
    console.warn("Missing tab id");
    return null;
  }

  try {
    const response = await chrome.tabs.sendMessage(tab.id, message);
    return response;
  } catch (err) {
    console.warn("Unable to communicate with the content-script", err);
    return null;
  }
};
