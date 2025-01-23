'use client';
import { Calendar, Home, Inbox, Plus, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useChat } from "@/context/ChatProvider";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
];

export function AppSidebar() {
  const {setNewChat,setMessages,messages}=useChat();

const handleNewChat=()=>{
setMessages([]);
}

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-between">
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupLabel className="cursor-pointer"
            onClick={handleNewChat}
            >
              <Plus /> 
            </SidebarGroupLabel>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {messages?.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    {/* <a href={item.url}> */}
                      {/* <item.icon /> */}
                      <span>{item.content}</span>
                    {/* </a> */}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
