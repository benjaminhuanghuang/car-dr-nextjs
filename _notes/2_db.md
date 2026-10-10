# Database

create project "car-dr" on supabase.com
connect -> ORM -> Drizzle, copy prompt provided by Supabase

```sh
npm i drizzle-orm
npm i -D drizzle-kit
```

.env

```env
DATABASE_URL="postgresql://..."
```

Create files

- drizzle.config.ts for drizzle-kit CLI
- drizzle/schema.ts
- lib/db.ts

Add package.json scripts

```json
  "db:generate": "drizzle-kit generate",
  "db:push": "drizzle-kit push",
  "db:studio": "drizzle-kit studio"
```

Install Agent Skills (optional)

```sh
npx skills add supabase/agent-skills
```
