import { Suspense } from "react";
import Link from "next/link";
import { NavRight } from "./nav-right";

export function Nav() {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 text-sm font-medium dark:border-zinc-800">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      <Suspense fallback={null}>
        <NavRight />
      </Suspense>
    </nav>
  );
}
