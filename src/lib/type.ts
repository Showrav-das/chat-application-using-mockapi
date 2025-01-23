export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
};


export type ChatContextType = {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (id: string) => void;
  createNewChat: () => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  messages: Message[];
  addMessage: (chatId: string, message: Message) => void;
  setNewChat: React.Dispatch<React.SetStateAction<boolean>>
};
