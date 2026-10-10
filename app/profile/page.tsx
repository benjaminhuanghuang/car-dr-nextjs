import { getCurrentUser } from "@/lib/session";

export default function ProfilePage() {
  const user = getCurrentUser();

  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <dl className="grid max-w-sm grid-cols-2 gap-2 text-sm">
        <dt className="text-zinc-500">Name</dt>
        <dd>{user.fullName}</dd>
        <dt className="text-zinc-500">Role</dt>
        <dd>{user.isAdmin ? "Admin" : "User"}</dd>
      </dl>
    </main>
  );
}
