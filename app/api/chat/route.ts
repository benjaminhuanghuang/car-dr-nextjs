import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from "ai";
import { chatModel } from "@/lib/ai";
import { requireUser } from "@/lib/session";

export const maxDuration = 30;

export async function POST(req: Request) {
  await requireUser();
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: chatModel,
    instructions: "You are a helpful car maintenance assistant.",
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
