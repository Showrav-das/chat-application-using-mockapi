"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type MessageInputProps = {
  handleSendMessage: (message: string) => void;
  loading: boolean;
};

export function MessageInput({
  handleSendMessage,
  loading,
}: MessageInputProps) {
  const [input, setInput] = useState("");

  return (
    <div className="flex gap-2 mb-10">
      <Input
        value={input}
        onChange={(e: any) => setInput(e.target.value)}
        placeholder="Type a message..."
        onKeyPress={(e: any) => {
          if (!loading && e.key === "Enter") {
            handleSendMessage(input);
            setInput("");
          }
        }}
      />
      <Button
        disabled={loading}
        onClick={() => {
          handleSendMessage(input);
          setInput("");
        }}
      >
        Send
      </Button>
    </div>
  );
}
