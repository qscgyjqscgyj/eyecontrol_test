import { Notification } from "shared/types";

export type NotificationRequestData = Pick<Notification, "message" | "type">;
export type NotificationResponseData = Omit<
  Notification,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};
