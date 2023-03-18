/// Abstraction to support multiple browsers

import { PopUpMessage, ScriptMessage } from "./model";

// *** STORAGE ***/
type Storage = {
  set: <T>(key: string, value: T) => Promise<void>;
  get: <T>(key: string) => Promise<T>;
};

const ChromeStorage: Storage = {
  get: async (key: string) => {
    const data = await chrome.storage.local.get(key);
    return data[key];
  },
  set: async <T>(key: string, value: T) =>
    await chrome.storage.local.set({ [key]: value }),
};

const Local: Storage = {
  get: async (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  },
  set: async <T>(key: string, value: T) =>
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
export function onMessageReceived<T, R>(
  handler: (request: T, sendResponse: (_: R) => void) => void
) {
  chrome.runtime.onMessage.addListener((message, _, sendResponse) =>
    handler(message, sendResponse)
  );
}
