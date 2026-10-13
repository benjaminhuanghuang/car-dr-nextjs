"use client";

import type { ComponentProps, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type SubmitButtonProps = Omit<ComponentProps<typeof Button>, "type"> & {
  /** Text shown while the form is submitting. Defaults to `children`. */
  pendingText?: ReactNode;
};

/**
 * Submit button for <form action={...}>: disabled with a spinner while the
 * action runs. Must be rendered inside the form.
 */
export function SubmitButton({
  children,
  pendingText,
  disabled,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled} {...props}>
      {pending && <Spinner data-icon="inline-start" />}
      {pending ? (pendingText ?? children) : children}
    </Button>
  );
}
