import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Notification } from "shared/types";
import { NotificationRequestData } from "src/services/notifications/types";
import { addNotification } from "src/store/NotificationsSlice";

export default function useWebsocket() {
  const [ws, setWs] = useState<WebSocket | null>(null);

  const dispatch = useDispatch();

  const sendMessage = (
    notificationData: NotificationRequestData,
    success: () => void,
    error?: (error: string) => void
  ) => {
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(notificationData));
      success();
    } else {
      error?.("WebSocket connection is not established");
    }
  };

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:5173/api");
    setWs(websocket);

    websocket.onmessage = (event: MessageEvent<string>) => {
      const notification: Notification = JSON.parse(event.data);
      dispatch(addNotification(notification));
    };

    return () => {
      websocket.close();
    };
  }, [dispatch]);

  return { ws, sendMessage };
}
