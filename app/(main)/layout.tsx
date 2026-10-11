import type { ReactNode } from "react";
import { Nav } from "@/components/nav";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  );
}
