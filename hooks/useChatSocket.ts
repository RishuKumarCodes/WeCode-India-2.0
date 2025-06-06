import { useEffect, useState } from "react";

export function useChatSocket(user: {
  id?: string;
  name?: string;
  email?: string;
}) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!user || !user.name || !user.email) return;

    const ws = new WebSocket("ws://localhost:3001");

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    ws.onmessage = async (event) => {
      let data = event.data;

      // If message is a Blob (e.g. from Node WebSocket), convert to text
      if (data instanceof Blob) {
        data = await data.text();
      }

      setMessages((prev) => [...prev, data]);
    };

    ws.onclose = () => {
      console.log("❌ WebSocket closed");
    };

    ws.onerror = (err) => {
      console.error("🔥 WebSocket error:", err);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [user.id, user.name, user.email]);

  const sendMessage = (text: string) => {
    const message = JSON.stringify({
      content: text,
      user: {
        id: user.id, 
        name: user.name,
        email: user.email,
      },
      createdAt: new Date().toISOString(),
    });
    socket?.send(message);
  };

  return { messages, sendMessage };
}
