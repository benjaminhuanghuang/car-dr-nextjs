# AI Tool calling

```sh
npm i zod
```

Create tools: lib/chat-tools.ts

Implement query: lib/queries.ts

## UT

覆盖空数据、数据库错误和跨用户访问

如何证明模型不会编造保养历史？

如何测试用户 A 无法通过模型或 API 获取用户 B 的车辆信息？

如何评估 Tool Calling 的成功率、延迟和成本？
建立一组固定的 AI 测试问题。 验证工具选择、返回数据的准确性和模型是否虚构记录。

```sh
npm i -D vite vitest
```
