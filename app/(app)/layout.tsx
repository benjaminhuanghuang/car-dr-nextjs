import type { ReactNode } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

/** Layout for the signed-in app pages (cars, admin, profile). */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6">
        {children}
      </main>
      <Footer />
    </>
  );
}
