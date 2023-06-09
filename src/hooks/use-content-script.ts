import { useEffect, useState } from "react";
import { sendReceiveMessage } from "../browser";

export const useContentScript = () => {
  const [isAlive, setIsAlive] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [activeDrawing, setActiveDrawing] = useState<{
    name: string;
    id: string;
  } | null>(null);

  const checkIsAlive = async (): Promise<void> => {
    await sendReceiveMessage({ action: "ping" })
      .then((response) => {
        if (response?.action === "pong") {
          setIsAlive(true);
          setUrl(response.currentUrl);
        }
      })
      .then(() => updateActiveDrawingName())
      .catch((err) => {
        console.debug(`Unable to communicate with the content-script`, err);
        setIsAlive(false);
      });
  };

  useEffect(() => {
    checkIsAlive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDrawing = async (): Promise<string | null> =>
    await sendReceiveMessage({ action: "get-drawing" })
      .then((response) => {
        if (response?.action === "drawing") {
          return response.data;
        } else {
          console.error(
            "Missing or invalid response from the content-script. Try to reload the page."
          );
          throw Error("Missing or invalid response from the content-script.");
        }
      })
      .catch((err) => {
        console.debug(`Error sending/receiving the get-drawing message`, err);
        return null;
      });

  const setDrawing = async (
    data: string,
    activeDrawing: { name: string; id: string } | null
  ) => {
    await sendReceiveMessage({
      action: "set-drawing",
      data,
      activeDrawing,
    })
      .then(async (response) => {
        if (response?.action === "drawing-set") {
          await updateActiveDrawingName();
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.debug(`Error sending/receiving the set-drawing message`, err);
      });
  };

  const updateActiveDrawingName = async () => {
    await sendReceiveMessage({ action: "get-active" })
      .then((response) => {
        if (response?.action === "active") {
          setActiveDrawing(response.data);
        } else {
          setActiveDrawing(null);
        }
      })
      .catch((err) => {
        console.debug(`Error sending/receiving the get-active message`, err);
      });
  };

  return {
    isAlive,
    activeDrawing,
    url,
    getDrawing,
    setDrawing,
    checkIsAlive,
  };
};
