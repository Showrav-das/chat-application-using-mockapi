"use client";
import { Chat, Message } from "@/lib/type";
import React, { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { MessageInput } from "./MessageInput";
import { useChat } from "@/context/ChatProvider";
import { sendMessageAction } from "@/app/actions/sendMessageAction";
import { Card, CardContent } from "./ui/card";

export default function Home() {
  const {
    messages,
    setMessages,
    setAllChats,
    allChats,
    setFirstTimeChat,
    setActiveChatIndex,
    firstTimeChat,
    activeChatIndex,
  }: {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    setAllChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    allChats: Chat[];
    setFirstTimeChat: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveChatIndex: React.Dispatch<React.SetStateAction<number>>;
    firstTimeChat: boolean;
    activeChatIndex: number;
  } = useChat();

  const [loading, setLoading] = useState(false);
  // Default to the first chat

  console.log("alll", allChats);

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
      setMessages((prev) => [...prev, userMessage]);

      // Get AI response
      const response = await sendMessageAction(content);

      // Create AI message
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: response || "Sorry, I could not process that.",
        role: "assistant" as const,
      };

      // Update messages with AI response
      setMessages((prev) => [...prev, aiMessage]);

      // Update allChats with the new messages for the active chat
      setAllChats((prev) => {
        return prev.map((chat, index) =>
          index === activeChatIndex
            ? { ...chat, messages: [...chat.messages, userMessage, aiMessage] }
            : chat
        );
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setFirstTimeChat(true);
    setMessages([]);

    // Create a new chat object
    const newChat = {
      id: Date.now().toString(),
      messages: [],
    };

    // Add the new chat to the end of the allChats array
    setAllChats((prev) => [...prev, newChat]);

    // Set the active chat index to the new chat's index
    setActiveChatIndex(allChats.length); // New chat is added at the end
  };

  const handleSwitchChat = (index: number) => {
    // Set the active chat index
    setActiveChatIndex(index);

    // Update the messages state to show the selected chat's messages
    setMessages(allChats[index].messages);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto px-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white px-4 py-4">
        {!firstTimeChat && (
          <div className="flex justify-center items-center">
            {messages.length === 0 && (
              <div>
                <div className="">
                  <Card
                    onClick={handleNewChat}
                    className="w-full max-w-md bg-white/70 mb-6 backdrop-blur-sm border-0 shadow-sm cursor-pointer"
                  >
                    <CardContent className="p-8">
                      <div className="space-y-3">
                        <h2 className="text-2xl md:text-3xl font-semibold text-blue-500">
                          Start Now
                        </h2>
                        <div className="space-y-1">
                          <p className="text-gray-600 text-lg">
                            Free access to Chat Application.
                          </p>
                          <p className="text-gray-500">What can I help with?</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}
        {firstTimeChat && (
          <MessageInput
            loading={loading}
            handleSendMessage={handleSendMessage}
          />
        )}

        {/* <button onClick={handleNewChat} className="mt-4 w-full ">
          New Chat
        </button> */}
      </div>
    </div>
  );
}
