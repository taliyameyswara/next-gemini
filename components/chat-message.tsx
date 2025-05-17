import { Message } from "@/interface/message";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user";

  return (
    <div className={cn("flex gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
          AI
        </div>
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <p className="text-sm">{message.content}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })}
        </p>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
          U
        </div>
      )}
    </div>
  );
}
