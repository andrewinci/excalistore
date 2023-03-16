import { useEffect, useState } from "react";
import { PopUpMessage, ScriptMessage } from "./model";

export const useContentScript = () => {
  const [isAlive, setIsAlive] = useState(false);

  useEffect(() => {
    (async () => {
      // check if the content-script is responding
      const response = await sendReceiveMessage({ action: "ping" });
      setIsAlive(response.action === "pong");
    })();
  }, []);

  return {
    isAlive,
  };
};

const sendReceiveMessage = async (
  message: PopUpMessage
): Promise<ScriptMessage> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  if (!tab.id) throw Error("Missing tab id");

  const response = await chrome.tabs.sendMessage(tab.id, message);
  return response;
};
