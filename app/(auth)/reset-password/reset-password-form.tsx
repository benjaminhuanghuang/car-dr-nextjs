"use client";

import { useActionState } from "react";
import { resetPassword } from "@/lib/actions/auth";

export function ResetPasswordForm() {
  const [state, action, pending] = useActionState(resetPassword, undefined);

  return (
    <form action={action} className="flex w-full max-w-sm flex-col gap-3">
      <input
        name="password"
        type="password"
        placeholder="New password"
        required
        minLength={6}
        className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
      />
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-foreground px-4 py-2 text-background disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save new password"}
      </button>
    </form>
  );
}
