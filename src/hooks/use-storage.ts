import { useEffect, useState } from "react";
import { storage } from "../browser";
import { Drawing } from "../model";

const DATA_KEY = "EXCALISTORE_DRAWINGS";

/// **** Storage hook  **** ///
export const useStorage = () => {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  useEffect(() => {
    readDrawings();
  }, []);

  const createDrawing = async (newDrawing: Drawing): Promise<Drawing> => {
    await readDrawings();
    if (drawings.find((d) => d.id === newDrawing.id)) {
      throw Error("[createDrawing] Duplicated id found");
    }
    const result = [newDrawing, ...drawings];
    await storage.set(DATA_KEY, result);
    // update the state with read drawings
    await readDrawings();
    return newDrawing;
  };

  const readDrawings = async (): Promise<void> => {
    console.log("Retrieving drawings");
    const result = (await storage.get(DATA_KEY)) ?? [];
    console.log("Data retrieved", result);
    await setDrawings(result);
  };

  const updateDrawing = async (drawing: Drawing): Promise<void> => {
    await readDrawings();
    if (!drawings.find((d) => d.id === drawing.id)) {
      throw Error("[createDrawing] drawing to update not found");
    }
    const result = [drawing, ...drawings.filter((d) => d.id !== drawing.id)];
    await storage.set(DATA_KEY, result);
    // update the state with read drawings
    await readDrawings();
  };

  const deleteDrawing = async (id: string): Promise<void> => {
    await readDrawings();
    const result = drawings.filter((d) => d.id !== id);
    await storage.set(DATA_KEY, result);
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
