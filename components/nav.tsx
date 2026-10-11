import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavRight } from "./nav-right";

export function Nav() {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo-white.svg" alt="" width={32} height={32} />
        <span className="text-xl font-bold">Car Doctor</span>
      </Link>
      <Suspense fallback={null}>
        <NavRight />
      </Suspense>
    </nav>
  );
}
