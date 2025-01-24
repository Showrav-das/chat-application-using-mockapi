'use client';

import { ChatContextType,Chat, Message} from '@/lib/type';
import { createContext, useContext, useState, ReactNode } from 'react';


const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  // const [chats, setChats] = useState<Chat[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [allChats, setAllChats] = useState<Chat[]>([]);
    const [chat,setNewChat]=useState(false);

    // const addNewChat = (messages: Message[]) => {
    //   const newChat: Chat = {
    //     id: Date.now().toString(),
    //     messages,
    //   };
    //   setAllChats(prev => [...prev, newChat]);
    // };

 

  return (
    <ChatContext.Provider value={{
      allChats,
      setMessages,
      messages,
      setNewChat,setAllChats
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