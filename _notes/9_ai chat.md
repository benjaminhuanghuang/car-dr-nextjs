# AI chat

## Front end: Vercel AI SDK + AI Elements + useChat

```sh
npm i ai @ai-sdk/google @ai-sdk/react

npx ai-elements@latest add conversation message prompt-input
```

- ai: Vercel AI SDK
- @ai-sdk/react: useChat hook provide sendMessage, messages, status. 负责调用 chat api
- ai-elements: Vercel 出的基于 shadcn 的聊天 UI 组件。ai-elements 依赖:
  - streamdown: 渲染 AI 回复里的 Markdown，处理“流式输出到一半”的情况
  - cmdk: prompt-input 里可搜索的下拉菜单
  - use-stick-to-bottom: 消息列表自动滚动到底部

## Backend

app/api/chat/route.ts

```ts
const result = streamText({
  model: chatModel,
  instructions: "You are a helpful car maintenance assistant.",
  messages: await convertToModelMessages(messages),
});
```
