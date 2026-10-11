import { Suspense } from "react";
import Link from "next/link";
import { Box } from "lucide-react";
import { NavRight } from "./nav-right";

export function Nav() {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
      <Link href="/" className="flex items-center gap-2">
        <Box className="h-6 w-6" strokeWidth={1.5} />
        <span className="text-xl font-bold">Car Doctor</span>
      </Link>
      <Suspense fallback={null}>
        <NavRight />
      </Suspense>
    </nav>
  );
}
