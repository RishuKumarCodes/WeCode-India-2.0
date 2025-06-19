"use client";

import { useState } from "react";
import { ChatInput, ChatMessage } from "@/components/assistant";
import { Bot } from "lucide-react";

interface Message {
  content: string;
  role: "user" | "assistant";
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content:
        "Hi there! I'm your We Code India AI assistant. I can help with personalized roadmap suggestions, project recommendations, and answer your questions about software development. How can I help you today?",
      role: "assistant",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    try {
      setIsLoading(true);

      // Add user message
      const userMessage: Message = { content, role: "user" };
      setMessages((prev) => [...prev, userMessage]);

      // Call API
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ content, role }) => ({
            content,
            role,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      // Add assistant message
      const assistantMessage: Message = {
        content: data.message,
        role: "assistant",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          content: "Sorry, I encountered an error. Please try again.",
          role: "assistant",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] max-w-[50%] border-1 border-gray-850 rounded-2xl m-10 mx-auto flex-col">
      <div className="flex-1 overflow-y-auto relative">
        {messages.length === 1 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-primary/5">
              <Bot className="h-24 w-24 text-primary/20" />
            </div>
          </div>
        )}
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.content}
            isUser={message.role === "user"}
          />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
