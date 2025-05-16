import ChatInterface from "@/components/chat-interface";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
      <p className="text-xl max-w-2xl mb-4">
        This is a demo page. The chatbot is available in the bottom right
        corner.
      </p>
      <p className="text-gray-500">
        Try clicking the chat bubble to start a conversation!
      </p>

      <ChatInterface />
    </main>
  );
}
