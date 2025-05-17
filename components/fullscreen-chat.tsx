import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Message } from "@/interface/message";
import ChatMessage from "./chat-message";
import LoadingDots from "./loading";

interface FullscreenChatProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function FullscreenChat({
  messages,
  inputValue,
  setInputValue,
  handleSendMessage,
  onClose,
  isLoading,
}: FullscreenChatProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between bg-primary/5">
        <div className="flex items-center gap-2">
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
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <ChatMessage key={i} message={message} />
        ))}
        {isLoading && <LoadingDots />}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) {
                handleSendMessage();
              }
            }}
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
