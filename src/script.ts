// entry point for the content-script loaded in the web page
// the application running in the pop-up can communicate with this script
// via the browser messaging API
import { onMessageReceived } from "./browser";
import { PopUpMessage, ScriptMessage } from "./model";

const ACTIVE_DRAWING_DATA_KEY = "excalidraw";
const ACTIVE_DRAWING_NAME_KEY = "excalistore-active";

// logic to handle messages from the extension popup
onMessageReceived<PopUpMessage, ScriptMessage>((request, sendResponse) => {
  const reply = (message: ScriptMessage) => sendResponse(message);
  switch (request.action) {
    case "ping":
      reply({ action: "pong", currentUrl: window.location.href });
      break;
    case "get-drawing":
      reply({
        action: "drawing",
        data: localStorage.getItem(ACTIVE_DRAWING_DATA_KEY) ?? "[]",
      });
      break;
    case "set-drawing":
      if (request.data) {
        localStorage.setItem(ACTIVE_DRAWING_DATA_KEY, request.data);
      }
      if (request.activeDrawing)
        localStorage.setItem(
          ACTIVE_DRAWING_NAME_KEY,
          JSON.stringify(request.activeDrawing)
        );
      else localStorage.removeItem(ACTIVE_DRAWING_NAME_KEY);
      reply({
        action: "drawing-set",
        success: true,
      });
      // refresh the page to load the new content
      window.location.reload();
      break;
    case "get-active":
      const raw = localStorage.getItem(ACTIVE_DRAWING_NAME_KEY);
      reply({
        action: "active",
        data: raw ? JSON.parse(raw) : null,
      });
      break;
  }
});

export {};
