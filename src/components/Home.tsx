"use client";
import { Chat, Message } from "@/lib/type";
import React, { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { MessageInput } from "./MessageInput";
import { useChat } from "@/context/ChatProvider";
import { sendMessageAction } from "@/app/actions/sendMessageAction";

export default function Home() {
const [allChats, setAllChats] = useState<Chat[]>([]);
  const { messages, setMessages }: { 
    messages: Message[]; 
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  
    // setAllChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  } = useChat();
  const [loading, setLoading] = useState(false);


  console.log('alll',allChats)
  const handleSendMessage = async (content: string) => {
    try {
      setLoading(true);
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        content,
        role: "user" as const,
      };
      
      // Update messages state with user message
      setMessages(prev => [...prev, userMessage]);
      
      // Create new chat with user message
      const newChat = {
        id: Date.now().toString(),
        messages: [...messages, userMessage], // Include existing messages and new user message
      };
      setAllChats(prev => [...prev, newChat]);
  
      // Get AI response
      const response = await sendMessageAction(content);
  
      // Create AI message
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: response || "Sorry, I could not process that.",
        role: "assistant" as const,
      };
  
      // Update messages with AI response
      setMessages(prev => [...prev, aiMessage]);
  
      // Update chat history with AI response
      setAllChats(prev => 
        prev.map(chat => 
          chat.id === newChat.id 
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      );
  
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
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
