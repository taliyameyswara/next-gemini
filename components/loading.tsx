import { cn } from "@/lib/utils";

interface LoadingDotsProps {
  className?: string;
}

export default function LoadingDots({ className }: LoadingDotsProps) {
  return (
    <div
      className={cn(
        "bg-muted text-foreground rounded-xl p-3 flex justify-center w-fit",
        className
      )}
    >
      <div className="flex space-x-2">
        <div className="size-1 bg-muted-foreground/40 rounded-full animate-bounce"></div>
        <div
          className="size-1 bg-muted-foreground/40 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="size-1 bg-muted-foreground/40 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
}
