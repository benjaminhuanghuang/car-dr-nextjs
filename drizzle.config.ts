import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle/migrations",
  schema: "./drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    // drizzle-kit must not use Supabase's transaction pooler (port 6543): it
    // breaks schema introspection. Use the session pooler (5432) or direct URL.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL!,
  },
});
