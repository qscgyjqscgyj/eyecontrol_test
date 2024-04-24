import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", (_req, res) => {
  res.send("WebSocket server with Express");
});

router.get("/notifications", async (_req, res) => {
  const notifications = await prisma.notification.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
  res.json(notifications);
});

export default router;
