import { RawData, Server as WebSocketServer, WebSocket } from "ws";
import { Server } from "http";
import { PrismaClient } from "@prisma/client";
import { notificationSchema, NotificationData } from "src/schema/notification";
import { Notification } from "src/types";

const prisma = new PrismaClient();

export function initWebsocketServer(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.on("message", (message) => handleMessage(message, wss));
    ws.on("close", () => console.log("Client disconnected"));
  });
}

async function handleMessage(message: RawData, wss: WebSocketServer) {
  try {
    const notificationData = JSON.parse(message.toString());

    const notificationParsedData: NotificationData =
      notificationSchema.parse(notificationData);

    const createdNotification = await createNotification(
      notificationParsedData
    );
    broadcastNotification(createdNotification, wss);
  } catch (error) {
    console.error("Error processing message:", error);
  }
}

async function createNotification(notificationData: NotificationData) {
  return await prisma.notification.create({
    data: notificationData,
  });
}

function broadcastNotification(
  notification: Notification,
  wss: WebSocketServer
) {
  const notificationString = JSON.stringify(notification);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(notificationString);
    }
  });
}
