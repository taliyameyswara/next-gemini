import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user";

  return (
    <div
      className={cn(
        "flex gap-3 max-w-[80%]",
        isUser ? "ml-auto flex-row-reverse" : ""
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <div className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center text-sm font-medium">
            AI
          </div>
        </Avatar>
      )}

      <div
        className={cn(
          "rounded-lg p-3",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <p className="text-sm">{message.content}</p>
        <div
          className={cn(
            "text-xs mt-1",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <div className="bg-zinc-800 text-zinc-50 w-full h-full flex items-center justify-center text-sm font-medium">
            U
          </div>
        </Avatar>
      )}
    </div>
  );
}
