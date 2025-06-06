"use client";

import { useSession } from "next-auth/react";
import { useChatSocket } from "@/hooks/useChatSocket";
import { useEffect, useState, useRef } from "react";

export default function ChatPage() {
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const [initialMessages, setInitialMessages] = useState<any[]>([]);
  const { messages: liveMessages, sendMessage } = useChatSocket({
    name: session?.user?.name!,
    email: session?.user?.email!,
    id: session?.user?.id,
  });

  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/chat")
      .then((res) => res.json())
      .then(setInitialMessages);
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [initialMessages, liveMessages]);

  const allMessages = [
    ...initialMessages.map((msg) => ({
      content: msg.content,
      user: { name: msg.user.name },
    })),
    ...liveMessages.map((msg) => JSON.parse(msg)),
  ];

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(text.trim());
      setText("");
    }
  };

  if (!session) return <p>Login to join chat</p>;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">🌐 Global Chat</h2>

      <div
        ref={chatBoxRef}
        className="h-96 overflow-y-auto border rounded-lg p-4 bg-gray-100 shadow-sm"
      >
        {allMessages.map((msg, i) => (
          <div key={i} className="mb-3">
            <strong className="text-blue-600">{msg.user.name}:</strong>{" "}
            <span className="text-black">{msg.content}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
