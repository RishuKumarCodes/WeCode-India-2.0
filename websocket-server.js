const WebSocket = require("ws");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const wss = new WebSocket.Server({ port: 3001 });

const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("Client connected. Total:", clients.size);

  ws.on("message", async (message) => {
    try {
      const parsed = JSON.parse(message);

      if (!parsed.user?.email) {
        throw new Error("User email missing in message data");
      }

      // Lookup user in DB by email
      const user = await prisma.user.findUnique({
        where: { email: parsed.user.email },
      });

      if (!user) {
        throw new Error("User not found in database");
      }

      await prisma.message.create({
        data: {
          userName: user.name,
          content: parsed.content,
          userId: user.id,
        },
      });

      // Broadcast to all clients
      for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected. Total:", clients.size);
  });
});

console.log("✅ WebSocket server running on ws://localhost:3001");
