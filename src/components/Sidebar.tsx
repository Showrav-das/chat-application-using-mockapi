"use client";
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

export function AppSidebar() {
  const { allChats, handleNewChat, activeChatIndex, handleSwitchChat } =
    useChat();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-between items-center px-3">
            <SidebarGroupLabel className="mt-4">Application</SidebarGroupLabel>
            <SidebarGroupLabel className="cursor-pointer">
              <button onClick={handleNewChat} className="size-2 ">
                <Plus />
              </button>
            </SidebarGroupLabel>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="mt-8 grid gap-3 overflow-x-auto">
                {allChats.map((chat, index) => (
                  <button
                    key={chat.id}
                    onClick={() => handleSwitchChat(index)}
                    className={`px-4 py-2 text-left rounded-md w-full ${
                      activeChatIndex === index
                        ? "bg-gray-200 text-gray-700"
                        : "bg-transparent"
                    }`}
                  >
                    Chat {index + 1}
                  </button>
                ))}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
