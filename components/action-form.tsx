"use client";

import type { ComponentProps } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ActionFormProps = Omit<ComponentProps<"form">, "action"> & {
  /** Server action to run on submit. */
  action: (formData: FormData) => Promise<void>;
  /** Toast shown after the action succeeds. */
  successMessage: string;
  /** Navigate here after success (instead of redirecting in the action). */
  redirectTo?: string;
};

/**
 * <form> that runs a server action, then shows a success toast and
 * optionally navigates. Use <SubmitButton> inside for the pending state.
 */
export function ActionForm({
  action,
  successMessage,
  redirectTo,
  ...props
}: ActionFormProps) {
  const router = useRouter();

  return (
    <form
      {...props}
      action={async (formData) => {
        await action(formData);
        toast.success(successMessage);
        if (redirectTo) router.push(redirectTo);
      }}
    />
  );
}
