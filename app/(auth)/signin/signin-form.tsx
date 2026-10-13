"use client";

import { useActionState } from "react";
import { signIn } from "@/lib/actions/auth";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";

export function SigninForm() {
  const [state, action] = useActionState(signIn, undefined);

  return (
    <form action={action}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </Field>
        {state?.error && <FieldError>{state.error}</FieldError>}
        <Field>
          <SubmitButton size="lg" pendingText="Signing in...">
            Sign in
          </SubmitButton>
        </Field>
      </FieldGroup>
    </form>
  );
}
