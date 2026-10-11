"use client";

import { useActionState } from "react";
import { forgotPassword } from "@/lib/actions/auth";

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(forgotPassword, undefined);

  return (
    <form action={action} className="flex w-full max-w-sm flex-col gap-3">
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
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
        {pending ? "Sending..." : "Send reset link"}
      </button>
    </form>
  );
}
