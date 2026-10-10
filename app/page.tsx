import Link from "next/link";
import { getCurrentUser } from "@/lib/session";

export default function Home() {
  const user = getCurrentUser();

  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Car DR</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Welcome back, {user.fullName}.
      </p>
      <div className="flex gap-4">
        <Link href="/cars" className="underline">
          Manage your cars
        </Link>
        <Link href="/profile" className="underline">
          View profile
        </Link>
      </div>
    </main>
  );
}
