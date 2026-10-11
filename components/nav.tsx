import { Suspense } from "react";
import Link from "next/link";
import { NavLink } from "./nav-link";
import { NavRight } from "./nav-right";

export function Nav() {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 text-sm font-medium dark:border-zinc-800">
      <Suspense fallback={<Link href="/">Car Doctor</Link>}>
        <NavLink href="/">Car Doctor</NavLink>
      </Suspense>
      <Suspense fallback={null}>
        <NavRight />
      </Suspense>
    </nav>
  );
}
