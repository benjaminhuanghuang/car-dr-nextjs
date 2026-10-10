import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/cars", label: "Cars" },
  { href: "/admin", label: "Admin" },
];

export function Nav() {
  return (
    <nav className="flex gap-4 border-b border-zinc-200 px-6 py-4 text-sm font-medium dark:border-zinc-800">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="hover:underline">
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
