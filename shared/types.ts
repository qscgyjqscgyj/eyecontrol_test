export enum NotificationType {
  Info = "Info",
  Warning = "Warning",
  Error = "Error",
}

export type Notification = {
  id: string;
  message: string;
  type: NotificationType;
  createdAt: Date;
  updatedAt: Date;
};
