import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "@/lib/actions/auth";

export async function AuthStatus() {
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
    <form action={signOut} className="flex items-center gap-3">
      <span className="text-zinc-500">{user.fullName ?? "Account"}</span>
      <button type="submit" className="hover:underline">
        Sign out
      </button>
    </form>
  );
}
