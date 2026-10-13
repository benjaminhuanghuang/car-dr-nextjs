"use client";

import { useActionState } from "react";
import { forgotPassword } from "@/lib/actions/auth";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";

export function ForgotPasswordForm() {
  const [state, action] = useActionState(forgotPassword, undefined);

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
        {state?.error && <FieldError>{state.error}</FieldError>}
        {state?.message && (
          <FieldDescription role="status">{state.message}</FieldDescription>
        )}
        <Field>
          <SubmitButton size="lg" pendingText="Sending...">
            Send reset link
          </SubmitButton>
        </Field>
      </FieldGroup>
    </form>
  );
}
