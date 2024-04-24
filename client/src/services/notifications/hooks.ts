import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNotifications,
  setNotifications,
} from "src/store/NotificationsSlice";
import { Notification } from "shared/types";

export default function useNotifications() {
  const notifications = useSelector(selectNotifications);

  const dispatch = useDispatch();

  useEffect(() => {
    if (notifications === null) {
      const loadNotifications = async () => {
        const notificationsResponse = await fetch("/api/notifications");

        const notificationsData: Notification[] =
          await notificationsResponse.json();

        dispatch(setNotifications(notificationsData));
      };

      loadNotifications();
    }
  }, [notifications, dispatch]);

  return { notifications };
}
