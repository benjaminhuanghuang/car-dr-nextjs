import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  toUIMessageStream,
  UIMessage,
} from "ai";
import { chatModel } from "@/lib/ai";
import { getChatTools } from "@/lib/chat-tools";
import { requireUser } from "@/lib/session";

export const maxDuration = 30;

export async function POST(req: Request) {
  const user = await requireUser();
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: chatModel,
    instructions:
      "You are a helpful car maintenance assistant. Use the listUserCars tool when the user asks about which or how many cars they own, and the listMaintenanceRecords tool when they ask about service/maintenance history.",
    messages: await convertToModelMessages(messages),
    tools: getChatTools(user.id),
    stopWhen: stepCountIs(5),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
