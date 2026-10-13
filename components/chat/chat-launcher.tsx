"use client";

import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import type { ChatStatus, UIMessage } from "ai";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChatPanel } from "@/components/chat/chat-panel";
import { streamMockReply } from "@/lib/chat/mock-reply";

/**
 * Round "AI" button fixed to the bottom-right corner. Signed-in users open the
 * chat panel (the button hides while it's open); signed-out users see it
 * disabled with a hint.
 */
export function ChatLauncher({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("ready");
  const abortRef = useRef<AbortController | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Return focus to the launcher after the panel closes.
  useEffect(() => {
    if (wasOpen.current && !open) launcherRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  async function send(text: string) {
    const assistantId = nanoid();
    setMessages((prev) => [
      ...prev,
      { id: nanoid(), role: "user", parts: [{ type: "text", text }] },
    ]);
    setStatus("submitted");

    const controller = new AbortController();
    abortRef.current = controller;
    let reply = "";
    for await (const chunk of streamMockReply(controller.signal)) {
      reply += chunk;
      setStatus("streaming");
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== assistantId),
        {
          id: assistantId,
          role: "assistant",
          parts: [{ type: "text", text: reply }],
        },
      ]);
    }
    setStatus("ready");
  }

  if (open) {
    return (
      <ChatPanel
        messages={messages}
        status={status}
        onSend={send}
        onStop={() => abortRef.current?.abort()}
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
