import useWebsocket from "src/services/websocket/hooks";
import useNotifications from "src/services/notifications/hooks";
import { formatDate } from "src/utils/date";
import "./styles.css";

export default function MainPage() {
  const { notifications } = useNotifications();

  useWebsocket();

  return (
    <>
      <h1>Notifications</h1>

      <div className="notificationsWrapper">
        {notifications?.map((notification) => (
          <div
            key={notification.id}
            className={`notification ${notification.type}`}
          >
            <div>{notification.message}</div>
            <div>{formatDate(notification.updatedAt)}</div>
          </div>
        ))}
      </div>
    </>
  );
}
