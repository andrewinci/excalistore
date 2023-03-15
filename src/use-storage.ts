import { useEffect, useState } from "react";
import { Drawing } from "./model";

const DATA_KEY = "EXCALISTORE_DRAWINGS";

/// **** Abstraction on top of the storage to support both chrome and localStorage **** ///
type Storage = {
  set: (key: string, value: any) => Promise<void>;
  get: (key: string) => Promise<any>;
};

const ChromeStorage: Storage = {
  get: async (key: string) => {
    const data = await chrome.storage.sync.get(key);
    return data[key];
  },
  set: async (key: string, value: any) =>
    await chrome.storage.sync.set({ [key]: value }),
};

const Local: Storage = {
  get: async (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  },
  set: async (key: string, value: any) =>
    localStorage.setItem(key, JSON.stringify(value)),
};

const storage: Storage = chrome?.storage?.sync ? ChromeStorage : Local;

/// **** Storage hook  **** ///
export const useStorage = () => {
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
    await storage.set(DATA_KEY, result);
    // update the state with read drawings
    await readDrawings();
  };

  const readDrawings = async (): Promise<void> => {
    console.log("Retrieving drawings");
    const result = await storage.get(DATA_KEY) ?? [];
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
