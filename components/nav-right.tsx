import Link from "next/link";
import { cn } from "cn";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "@/lib/actions/auth";
import { buttonVariants } from "@/components/ui/button";
import { NavLink } from "./nav-link";

export async function NavRight() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex items-center gap-4 text-sm font-medium">
        <NavLink href="/signin" className="text-muted-foreground">
          Sign In
        </NavLink>
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ size: "lg" }),
            "rounded-full px-6 uppercase tracking-wide"
          )}
        >
          Get Started
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 text-sm font-medium">
      <NavLink href="/profile">Profile</NavLink>
      <NavLink href="/cars">Cars</NavLink>
      {user.isAdmin && <NavLink href="/admin">Admin</NavLink>}
      <form action={signOut}>
        <button type="submit" className="hover:underline">
          Sign out
        </button>
      </form>
    </div>
  );
}
