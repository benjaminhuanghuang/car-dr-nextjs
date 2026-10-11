import type { ReactNode } from "react";
import { Nav } from "@/components/nav";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 p-6">
        {children}
      </main>
    </>
  );
}
