"use client";

import { useActionState } from "react";
import { resetPassword } from "@/lib/actions/auth";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";

export function ResetPasswordForm() {
  const [state, action] = useActionState(resetPassword, undefined);

  return (
    <form action={action}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="password">New password</FieldLabel>
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
        <Field>
          <SubmitButton size="lg" pendingText="Saving...">
            Save new password
          </SubmitButton>
        </Field>
      </FieldGroup>
    </form>
  );
}
