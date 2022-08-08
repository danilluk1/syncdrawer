import { RawData, WebSocketServer, WebSocket } from "ws";
import { roomsStore } from "./roomsStore";

async function entryPoint() {
  const wss = new WebSocketServer({ port: 8080 });

  wss.on("connection", function connection(ws) {
    ws.on("message", function message(data: RawData) {
      const message = JSON.parse(data.toString());
      console.log("received %s", message);
      let roomClients = roomsStore.getRoomClients(message.room);

      switch (message.method) {
        case "newUser":
          roomsStore.add(message.room, { name: message.username, socket: ws });
          roomClients = roomsStore.getRoomClients(message.room);
          if (!roomClients) return;

          for (const client of roomClients) {
            if (client.socket.readyState === WebSocket.OPEN) {
              if (client.name !== message.username)
                client.socket.send(JSON.stringify(message));
            }
          }
          break;

        default:
          roomClients = roomsStore.getRoomClients(message.room);
          if (!roomClients) return;

          for (const client of roomClients) {
            if (client.socket.readyState === WebSocket.OPEN) {
              if (client.name !== message.username)
                client.socket.send(JSON.stringify(message));
            }
          }
          break;
      }
    });
    ws.send("Connection establish");
  });
}

entryPoint();

console.log("Server started");
