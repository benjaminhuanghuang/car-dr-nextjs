import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>
      <main className="mx-auto flex w-full max-w-sm flex-1 flex-col items-center justify-center gap-4 p-6">
        {children}
      </main>
    </>
  );
}
