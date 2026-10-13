import { Suspense } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { NavRight } from "./nav-right";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  return (
    <nav className="flex items-center justify-between surface-brand border-b border-border px-6 py-4">
      <Link href="/" className="flex items-center gap-2">
        <Logo className="w-8" />
        <span className="text-xl font-bold">Car Doctor</span>
      </Link>
      <div className="flex items-center gap-4">
        <Suspense fallback={null}>
          <NavRight />
        </Suspense>
        <ThemeToggle />
      </div>
    </nav>
  );
}
