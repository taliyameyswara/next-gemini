export interface Message {
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}
