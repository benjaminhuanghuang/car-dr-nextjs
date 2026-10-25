"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChatPanel } from "@/components/chat/chat-panel";

/**
 * Round "AI" button fixed to the bottom-right corner. Signed-in users open the
 * chat panel (the button hides while it's open); signed-out users see it
 * disabled with a hint.
 */
export function ChatLauncher({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Return focus to the launcher after the panel closes.
  useEffect(() => {
    if (wasOpen.current && !open) launcherRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  if (open) {
    return (
      <ChatPanel
        messages={messages}
        status={status}
        onSend={(text) => sendMessage({ text })}
        onStop={stop}
        onClose={() => setOpen(false)}
      />
    );
  }

  const launcher = (
    <Button
      ref={launcherRef}
      aria-label={signedIn ? "Open AI chat" : "AI chat (sign in to use)"}
      disabled={!signedIn}
      focusableWhenDisabled
      onClick={() => setOpen(true)}
      className="fixed right-6 bottom-6 z-50 size-14 rounded-full text-base font-bold shadow-lg data-disabled:cursor-not-allowed data-disabled:opacity-60"
    >
      AI
    </Button>
  );

  if (signedIn) return launcher;

  return (
    <Tooltip>
      <TooltipTrigger render={launcher} />
      <TooltipContent side="left">Sign in to chat with AI</TooltipContent>
    </Tooltip>
  );
}
