"use client";
import { Message } from "@/lib/type";
import React, { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { MessageInput } from "./MessageInput";
import { useChat } from "@/context/ChatProvider";
import { sendMessageAction } from "@/app/actions/sendMessageAction";

export default function Home() {
 
  const { messages, setMessages }: { 
    messages: Message[]; 
    setMessages: React.Dispatch<React.SetStateAction<Message[]>> ;
    setNewChat: React.Dispatch<React.SetStateAction<boolean>>
  } = useChat();
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    setLoading(true);
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
    };
    setMessages((prev) => [...prev, userMessage]);

    // Get AI response
    const response = await sendMessageAction(content);

    // Add AI message
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response || "Sorry, I could not process that.",
      role: "assistant",
    };
    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto px-4">
        <div className="space-y-4 py-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white px-4 py-4">
        {messages.length === 0 && (
          <p className="text-center text-gray-500 mb-4">
            What can I help with?
          </p>
        )}
        <MessageInput loading={loading} handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
