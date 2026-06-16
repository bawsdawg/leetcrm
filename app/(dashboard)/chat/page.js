import { ChatPanel } from "@/components/chat/chat-panel";

export const metadata = { title: "AI Chat · 1337-crm by Searchmind" };

export default function ChatPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col" style={{ height: "calc(100vh - 52px)" }}>
      <ChatPanel />
    </div>
  );
}
