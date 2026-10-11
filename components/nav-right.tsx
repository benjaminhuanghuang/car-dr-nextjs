import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "@/lib/actions/auth";

export async function NavRight() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex gap-4">
        <Link href="/login" className="hover:underline">
          Sign in
        </Link>
        <Link href="/signup" className="hover:underline">
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/profile" className="hover:underline">
        Profile
      </Link>
      <Link href="/cars" className="hover:underline">
        Cars
      </Link>
      {user.isAdmin && (
        <Link href="/admin" className="hover:underline">
          Admin
        </Link>
      )}
      <form action={signOut}>
        <button type="submit" className="hover:underline">
          Sign out
        </button>
      </form>
    </div>
  );
}
