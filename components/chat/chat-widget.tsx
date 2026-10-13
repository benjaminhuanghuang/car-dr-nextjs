import { Suspense } from "react";
import { getCurrentUser } from "@/lib/session";
import { ChatLauncher } from "@/components/chat/chat-launcher";

async function ChatWidgetInner() {
  const user = await getCurrentUser();
  return <ChatLauncher signedIn={!!user} />;
}

/**
 * The floating AI chat. Render it on pages where the assistant is useful
 * (home and the car pages), not on auth, admin or profile pages.
 */
export function ChatWidget() {
  return (
    <Suspense fallback={null}>
      <ChatWidgetInner />
    </Suspense>
  );
}
