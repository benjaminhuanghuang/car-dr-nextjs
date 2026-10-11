import { getCurrentUser } from "@/lib/session";
import { signOut } from "@/lib/actions/auth";
import { NavLink } from "./nav-link";

export async function NavRight() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex gap-4">
        <NavLink href="/login">Sign in</NavLink>
        <NavLink href="/signup">Sign up</NavLink>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
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
