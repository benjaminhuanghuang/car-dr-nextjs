"use client";

import { useActionState } from "react";
import { signUp } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignupForm() {
  const [state, action, pending] = useActionState(signUp, undefined);

  return (
    <form action={action} className="flex flex-col gap-3">
      <Input
        name="fullName"
        placeholder="Full name"
        aria-label="Full name"
        autoComplete="name"
        required
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        aria-label="Email"
        autoComplete="email"
        required
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        aria-label="Password"
        autoComplete="new-password"
        required
        minLength={6}
      />
      {state?.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
      {state?.message && (
        <p role="status" className="text-sm text-muted-foreground">
          {state.message}
        </p>
      )}
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Signing up..." : "Sign up"}
      </Button>
    </form>
  );
}
