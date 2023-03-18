/// Abstraction to support multiple browsers

import { PopUpMessage, ScriptMessage } from "./model";

// *** STORAGE ***/
type Storage = {
  set: (key: string, value: any) => Promise<void>;
  get: (key: string) => Promise<any>;
};

const ChromeStorage: Storage = {
  get: async (key: string) => {
    const data = await chrome.storage.local.get(key);
    return data[key];
  },
  set: async (key: string, value: any) =>
    await chrome.storage.local.set({ [key]: value }),
};

const Local: Storage = {
  get: async (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  },
  set: async (key: string, value: any) =>
    localStorage.setItem(key, JSON.stringify(value)),
};

export const storage: Storage = chrome?.storage?.local ? ChromeStorage : Local;

// *** Messaging ***/
type sendReceiveMessageType = (
  message: PopUpMessage
) => Promise<ScriptMessage | null>;

const sendReceiveMessageChrome: sendReceiveMessageType = async (
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

export const sendReceiveMessage = sendReceiveMessageChrome;

// *** TABS ***
export const createTab = async (url: string) =>
  await chrome.tabs.create({ url });

// *** On message received ***
export function onMessageReceived<T>(
  handler: (request: T, sendResponse: (_: any) => void) => void
) {
  chrome.runtime.onMessage.addListener((message, _, sendResponse) =>
    handler(message, sendResponse)
  );
}
