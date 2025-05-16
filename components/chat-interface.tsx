"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Maximize2, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import FullscreenChat from "./fullscreen-chat";
import ChatMessage from "./chat-message";
import { Message } from "@/interface/message";

// Sample message data
const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

export default function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    // Add bot response (in a real app, this would come from an API)
    const botResponse: Message = {
      id: messages.length + 2,
      content: "Thanks for your message! This is a demo response.",
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, botResponse]);
    setInputValue("");
  };

  const toggleFullscreen = () => {
    setIsFullscreenOpen(!isFullscreenOpen);
    setIsOpen(false);
  };

  if (isFullscreenOpen) {
    return (
      <FullscreenChat
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        onClose={() => setIsFullscreenOpen(false)}
      />
    );
  }

  return (
    <>
      {/* Floating Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="relative"
            >
              <Button
                onClick={() => setIsOpen(true)}
                size="icon"
                className="h-14 w-14 rounded-full bg-primary shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageSquare className="h-6 w-6" />
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-background rounded-lg shadow-xl flex flex-col overflow-hidden border"
            >
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between bg-primary/5">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <div className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center text-sm font-medium">
                      AI
                    </div>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-sm">Chat Assistant</h3>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={toggleFullscreen}
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t">
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
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Drawer for small screens */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              size="icon"
              className="h-14 w-14 rounded-full bg-primary shadow-lg hover:shadow-xl transition-all duration-300 md:hidden"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh]">
            <DrawerTitle className="sr-only">Chatbot</DrawerTitle>
            <div className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
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
                <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t">
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
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
