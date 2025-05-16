"use client";

import { X, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import ChatMessage from "./chat-message";
import { Message } from "@/interface/message";

interface FullscreenChatProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  onClose: () => void;
}

export default function FullscreenChat({
  messages,
  inputValue,
  setInputValue,
  handleSendMessage,
  onClose,
}: FullscreenChatProps) {
  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8">
            <div className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center text-sm font-medium">
              AI
            </div>
          </Avatar>
          <div>
            <h3 className="font-medium">Chat Assistant</h3>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-3xl mx-auto w-full">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t max-w-3xl mx-auto w-full">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
