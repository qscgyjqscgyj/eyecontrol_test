import { useState } from "react";
import { NotificationType } from "shared/types";
import useWebsocket from "src/services/websocket/hooks";
import "./styles.css";

export default function NotificationsPage() {
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  const { sendMessage } = useWebsocket();

  const onNotificationMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotificationMessage(event.target.value);
  };

  const pushNotification = (type: NotificationType) => {
    sendMessage(
      { message: notificationMessage, type },
      () => {
        setNotificationMessage("");
      },
      (error) => {
        alert(error);
      }
    );
  };

  return (
    <>
      <h1>Create Notification</h1>

      <div className="addNotificationWrapper">
        <input
          type="text"
          className="notificationInput"
          placeholder="Enter notification message"
          onChange={onNotificationMessageChange}
          value={notificationMessage}
        />

        <button
          className={`pushButton ${NotificationType.Info}`}
          onClick={() => pushNotification(NotificationType.Info)}
        >
          Push Info
        </button>
        <button
          className={`pushButton ${NotificationType.Warning}`}
          onClick={() => pushNotification(NotificationType.Warning)}
        >
          Push Warning
        </button>
        <button
          className={`pushButton ${NotificationType.Error}`}
          onClick={() => pushNotification(NotificationType.Error)}
        >
          Push Error
        </button>
      </div>
    </>
  );
}
