"use client";

import { useActionState } from "react";
import { signUp } from "@/lib/actions/auth";

export function SignupForm() {
  const [state, action, pending] = useActionState(signUp, undefined);

  return (
    <form action={action} className="flex max-w-sm flex-col gap-3">
      <input
        name="fullName"
        placeholder="Full name"
        required
        className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
      />
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
        minLength={6}
        className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
      />
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.message && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-foreground px-4 py-2 text-background disabled:opacity-50"
      >
        {pending ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
}
