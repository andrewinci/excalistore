import { useEffect, useState } from "react";
import { Drawing } from "./model";

const DATA_KEY = "EXCALISTORE_DRAWINGS";
//todo: use local storage if chrome.storage is not available
const storage = chrome.storage.sync;

export const useChromeStorage = () => {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  useEffect(() => {
    readDrawings();
  }, []);

  const createDrawing = async (newDrawing: Drawing): Promise<void> => {
    await readDrawings();
    if (drawings.find((d) => d.id === newDrawing.id)) {
      throw Error("[createDrawing] Duplicated id found");
    }
    const result = [newDrawing, ...drawings];
    await storage.set({ [DATA_KEY]: result });
    // update the state with read drawings
    await readDrawings();
  };

  const readDrawings = async (): Promise<void> => {
    console.log("Retrieving drawings");
    const data = await storage.get(DATA_KEY);
    console.log("Data retrieved", data[DATA_KEY]);
    const result = data[DATA_KEY]
      ? (data[DATA_KEY] as unknown as Drawing[])
      : [];
    await setDrawings(result);
  };

  const updateDrawing = async (drawing: Drawing): Promise<void> => {
    await readDrawings();
    if (!drawings.find((d) => d.id === drawing.id)) {
      throw Error("[createDrawing] drawing to update not found");
    }
    const result = [drawing, ...drawings.filter((d) => d.id !== drawing.id)];
    await storage.set({ [DATA_KEY]: result });
    // update the state with read drawings
    await readDrawings();
  };

  const deleteDrawing = async (id: string): Promise<void> => {
    await readDrawings();
    const result = drawings.filter((d) => d.id !== id);
    await storage.set({ [DATA_KEY]: result });
    // update the state with read drawings
    await readDrawings();
  };

  return {
    drawings,
    createDrawing,
    updateDrawing,
    deleteDrawing,
  };
};
