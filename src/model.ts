export type Drawing = {
  id: string;
  name: string;
  lastUpdate: string;
  data: any;
};

// **** messages exchanged between the script and the popup window **** //
// requests are messages from the pop up to the script
// responses are messages from the script to the pop up

/**
 * Message from the pop-up to the script
 * to check if the script is loaded in the page
 */
type PingRequest = { action: "ping" };
/**
 * Reply to Ping from the script to pop-up
 */
type PingResponse = { action: "pong" };

/**
 * Message from the pop-up to the script
 * to get the name of the current drawing
 */
type GetActiveDrawingRequest = { action: "get-active" };
/**
 * Reply to GetNameRequest from the script to pop-up
 * with the name of the current drawing (if available)
 */
type GetActiveDrawingResponse = {
  action: "active";
  data: { name: string; id: string } | null;
};

/**
 * Get the current drawing from the local store
 */
type GetDrawingRequest = { action: "get-drawing" };

/**
 * Return the current drawing to the pop up
 */
type GetDrawingResponse = { action: "drawing"; data: any };

/**
 * Set the current drawing in the local store
 * with the data content
 */
type SetDrawingRequest = {
  action: "set-drawing";
  activeDrawing: { name: string; id: string } | null;
  data: any;
};

type SetDrawingResponse = { action: "drawing-set"; success: boolean };

/**
 * Messages sent from the Pop up to the script page
 */
export type PopUpMessage =
  | PingRequest
  | GetActiveDrawingRequest
  | GetDrawingRequest
  | SetDrawingRequest;

/**
 * Messages sent from the script to the pop up window
 */
export type ScriptMessage =
  | PingResponse
  | GetActiveDrawingResponse
  | GetDrawingResponse
  | SetDrawingResponse;
