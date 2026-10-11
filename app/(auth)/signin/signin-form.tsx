"use client";

import { useActionState } from "react";
import { signIn } from "@/lib/actions/auth";

export function SigninForm() {
  const [state, action, pending] = useActionState(signIn, undefined);

  return (
    <form action={action} className="flex max-w-sm flex-col gap-3">
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
      />
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-foreground px-4 py-2 text-background disabled:opacity-50"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
