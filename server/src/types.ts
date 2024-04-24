import { $Enums } from "@prisma/client";
import { Notification as NotificationShared } from "shared/types";

export type Notification = Omit<NotificationShared, "type"> & {
  type: $Enums.NotificationType;
};
