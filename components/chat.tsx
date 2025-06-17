"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Message = {
  id: string;
  content: string;
  createdAt: string;
  user_email: string;
};

export default function Chat({ mail }: { mail: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Load history
  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("Message")
        .select("*")
        .order("createdAt", { ascending: true });

      if (data) setMessages(data);
      if (error) console.error("Load error:", error.message);
    };
    load();
  }, []);

  // Realtime listener
  useEffect(() => {
    const channel = supabase
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Message" },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => [...prev, newMsg]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Send
  const send = async () => {
    if (!input.trim()) return;

    const { data, error } = await supabase.from("Message").insert({
      content: input,
      user_email: mail,
    });

    if (error) {
      console.error("Insert error:", error.message);
    } else {
      console.log("Sent:", data);
    }

    setInput("");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-2">💬 Chat</h2>
      <div className="h-96 overflow-y-auto border rounded p-2 mb-4">
        {messages.map((m) => (
          <div key={m.id} className="mb-2">
            <strong>{m.user_email}:</strong> {m.content}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border rounded-l p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type your message…"
        />
        <button
          className="px-4 rounded-r bg-blue-600 text-white"
          onClick={send}
        >
          Send
        </button>
      </div>
    </div>
  );
}