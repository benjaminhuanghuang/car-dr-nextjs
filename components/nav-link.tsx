"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

export function NavLink({
  href,
  className,
  ...props
}: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href.toString());

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`${isActive ? "underline" : "hover:underline"} ${className ?? ""}`.trim()}
      {...props}
    />
  );
}
