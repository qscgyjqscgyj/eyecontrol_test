import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "shared/types";

interface NotificationsStore {
  notifications: Notification[] | null;
}

const initialState: NotificationsStore = { notifications: null };

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.notifications = action.payload;
    },
    addNotification(state, action: PayloadAction<Notification>) {
      if (state.notifications !== null) {
        state.notifications = [action.payload, ...state.notifications];
      }
    },
  },
});

export const { setNotifications, addNotification } = notificationsSlice.actions;

export const selectNotifications = (state: {
  notifications: NotificationsStore;
}) => state.notifications.notifications;
