// entry point for the content-script loaded in the web page
// the application running in the pop-up can communicate with this script

import { PopUpMessage, ScriptMessage } from "./model";

// via chrome messaging
const ACTIVE_DRAWING_DATA_KEY = "excalidraw";
const ACTIVE_DRAWING_NAME_KEY = "excalistore-name";

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
        data: localStorage.getItem(ACTIVE_DRAWING_DATA_KEY),
      });
      break;
    case "set-drawing":
      localStorage.setItem(ACTIVE_DRAWING_DATA_KEY, request.data);
      if (request.name)
        localStorage.setItem(ACTIVE_DRAWING_NAME_KEY, request.name);
      else localStorage.removeItem(ACTIVE_DRAWING_NAME_KEY);
      reply({
        action: "drawing-set",
        success: true,
      });
      // refresh the page to load the new content
      window.location.reload();
      break;
    case "get-name":
      reply({
        action: "name",
        name: localStorage.getItem(ACTIVE_DRAWING_NAME_KEY),
      });
      break;
  }
});

export {};
