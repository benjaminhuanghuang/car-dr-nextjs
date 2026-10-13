"use client";

import { useActionState } from "react";
import { signUp } from "@/lib/actions/auth";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";

export function SignupForm() {
  const [state, action] = useActionState(signUp, undefined);

  return (
    <form action={action}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fullName">Full name</FieldLabel>
          <Input id="fullName" name="fullName" autoComplete="name" required />
        </Field>
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
            autoComplete="new-password"
            required
            minLength={6}
          />
          <FieldDescription>At least 6 characters.</FieldDescription>
        </Field>
        {state?.error && <FieldError>{state.error}</FieldError>}
        {state?.message && (
          <FieldDescription role="status">{state.message}</FieldDescription>
        )}
        <Field>
          <SubmitButton size="lg" pendingText="Signing up...">
            Sign up
          </SubmitButton>
        </Field>
      </FieldGroup>
    </form>
  );
}
