import express from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);

  ws.on('message', (data) => {
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
      client.send(data.toString());
      }
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});