"use client";

import type { ChatStatus, UIMessage } from "ai";
import { MessageSquare, X } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Button } from "@/components/ui/button";

type ChatPanelProps = {
  messages: UIMessage[];
  status: ChatStatus;
  onSend: (text: string) => void;
  onStop: () => void;
  onClose: () => void;
};

/** Floating chat window anchored to the bottom-right corner. */
export function ChatPanel({
  messages,
  status,
  onSend,
  onStop,
  onClose,
}: ChatPanelProps) {
  return (
    <section
      aria-label="Chat with Car Doctor AI"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
      className="fixed right-4 bottom-4 left-4 z-50 flex h-[min(560px,calc(100dvh-2rem))] flex-col overflow-hidden rounded-xl bg-card text-card-foreground shadow-xl ring-1 ring-foreground/10 sm:left-auto sm:w-96"
    >
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="font-semibold">Car Doctor AI</h2>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Close chat"
          onClick={onClose}
        >
          <X />
        </Button>
      </header>

      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<MessageSquare className="size-8" />}
              title="Ask about your car"
              description="Maintenance schedules, warning lights, odd noises…"
            />
          ) : (
            messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent>
                  {message.parts.map((part, index) =>
                    part.type === "text" ? (
                      message.role === "assistant" ? (
                        <MessageResponse key={index}>
                          {part.text}
                        </MessageResponse>
                      ) : (
                        <p key={index} className="whitespace-pre-wrap">
                          {part.text}
                        </p>
                      )
                    ) : null,
                  )}
                </MessageContent>
              </Message>
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t p-3">
        <PromptInput
          onSubmit={({ text }) => {
            // Ignore Enter while a reply is still in progress.
            if (status === "ready" && text.trim()) onSend(text.trim());
          }}
        >
          <PromptInputBody>
            <PromptInputTextarea
              autoFocus
              placeholder="Ask a question about your car"
            />
          </PromptInputBody>
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} onStop={onStop} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </section>
  );
}
