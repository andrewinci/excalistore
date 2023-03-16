import { useEffect, useState } from "react";
import { PopUpMessage, ScriptMessage } from "./model";

export const useContentScript = () => {
  const [isAlive, setIsAlive] = useState(false);

  useEffect(() => {
    (async () => {
      // check if the content-script is responding
      try {
        const response = await sendReceiveMessage({ action: "ping" });
        setIsAlive(response?.action === "pong");
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

  const setDrawing = async (data: any) => {
    const response = await sendReceiveMessage({ action: "set-drawing", data });
    if (response?.action === "drawing-set") {
      return true;
    } else {
      return false;
    }
  };

  return {
    isAlive,
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
