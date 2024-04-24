import { NotificationType } from "shared/types";
import { z } from "zod";

export const notificationSchema = z.object({
  type: z.nativeEnum(NotificationType),
  message: z.string().min(1, "Message must be a non-empty string."),
});

export type NotificationData = z.infer<typeof notificationSchema>;
