'use client';

import { ChatContextType,Chat, Message} from '@/lib/type';
import { createContext, useContext, useState, ReactNode } from 'react';


const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [chat,setNewChat]=useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date()
    };
    setChats(prev => [...prev, newChat]);
    setActiveChat(newChat.id);
  };

  const addMessage = (chatId: string, message: Message) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        const updatedMessages = [...chat.messages, message];
        const title = chat.messages.length === 0 && message.role === 'user' 
          ? message.content 
          : chat.title;
        return { ...chat, messages: updatedMessages, title };
      }
      return chat;
    }));
  };

  return (
    <ChatContext.Provider value={{
      chats,
      activeChat,
      setActiveChat,
      createNewChat,
      addMessage,
      setMessages,
      messages,
      setNewChat
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}