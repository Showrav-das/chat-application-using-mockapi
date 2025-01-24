export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

export type Chat = {
  id: string;
  messages: Message[];
  // createdAt: Date;
};


export type ChatContextType = {
  
  allChats: Chat[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  messages: Message[];
  setNewChat: React.Dispatch<React.SetStateAction<boolean>>;
  setAllChats: React.Dispatch<React.SetStateAction<Chat[]>>;
};
