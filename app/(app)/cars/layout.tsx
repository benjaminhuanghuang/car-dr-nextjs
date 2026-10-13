import type { ReactNode } from "react";
import { ChatWidget } from "@/components/chat/chat-widget";

/** Car pages get the floating AI chat. */
export default function CarsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ChatWidget />
    </>
  );
}
