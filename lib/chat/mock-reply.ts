// TODO: replace with a real model call (AI SDK `useChat` + a route handler).

const MOCK_REPLY = `_This is a sample reply. The AI assistant isn't connected yet._

Here's a general maintenance checklist for most cars:

- **Engine oil:** every 5,000–7,500 miles with synthetic oil
- **Tire rotation:** every 5,000–7,500 miles
- **Brake pads:** inspect every 10,000 miles
- **Cabin air filter:** every 15,000–30,000 miles

Check your owner's manual for the exact intervals for your car.`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Yields the mock reply a few characters at a time, like a streaming model. */
export async function* streamMockReply(signal: AbortSignal) {
  await sleep(500);
  for (const chunk of MOCK_REPLY.split(/(\s+)/)) {
    if (signal.aborted) return;
    yield chunk;
    await sleep(25);
  }
}
