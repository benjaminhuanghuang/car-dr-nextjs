# Car Doctor

## Features

- Manage cars
- Manage maintenance history
- maintenance notification
- Chat with LLM
- AI Tool calling

## Tech stacks

- Next.js 16 + React 19 + Tailwind CSS 4 + Shadcn + Vercel AI elements
- PostgreSQL(Supabase) + Drizzle
- Supabase Auth
- Vercel AI SDK 7 + Gemini-3.5-flash-lite

## Engineering

- husky + lint-staged + gitleaks

## Architecture

```mermaid
flowchart TD
    A["Frontend<br/>Next.js / React Chat UI"]
    B["AI API Route<br/>Auth / streamText"]
    C["LLM + Tool Calling<br/>Gemini / Vercel AI SDK"]
    D["Business Query Layer<br/>getCarsForUser / getMaintenanceForUser"]
    E["PostgreSQL<br/>Car information / maintenance log"]

    A --> B --> C --> D --> E
```

## Web URL

<https://car-dr-nextjs.vercel.app/>
