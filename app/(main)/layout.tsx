import type { ReactNode } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
