import express from "express";
import http from "http";
import routes from "src/routes";
import { initWebsocketServer } from "src/websocket";

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

initWebsocketServer(server);

app.use(routes);

server.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
