// entry point for the content-script loaded in the web page
// the application running in the pop-up can communicate with this script

import { PopUpMessage, ScriptMessage } from "./model";

// via chrome messaging
const LOCAL_STORAGE_KEY = "excalidraw";

// logic to handle messages from the extension popup
chrome.runtime.onMessage.addListener(function (
  genericRequest,
  _,
  sendResponse
) {
  const request = genericRequest as PopUpMessage;
  const reply = (message: ScriptMessage) => sendResponse(message);
  switch (request.action) {
    case "ping":
      reply({ action: "pong" });
      break;
    case "get-drawing":
      reply({
        action: "drawing",
        data: localStorage.getItem(LOCAL_STORAGE_KEY),
      });
      break;
    case "set-drawing":
      localStorage.setItem(LOCAL_STORAGE_KEY, request.data);
      reply({
        action: "drawing-set",
        success: true,
      });
      // refresh the page to load the new content
      window.location.reload();
      break;
  }
});

export {};
