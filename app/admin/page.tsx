import { Suspense } from "react";
import { getAllUsersWithCarCounts, getAnalyticsSummary } from "@/lib/queries";

export default function AdminPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      <Suspense fallback={<p>Loading analytics...</p>}>
        <AnalyticsSummary />
      </Suspense>

      <Suspense fallback={<p>Loading users...</p>}>
        <UsersTable />
      </Suspense>
    </main>
  );
}

async function AnalyticsSummary() {
  const { userCount, carCount, maintenanceCount } =
    await getAnalyticsSummary();

  return (
    <div className="flex gap-6 text-sm">
      <div>
        <p className="text-2xl font-semibold">{userCount}</p>
        <p className="text-zinc-500">Users</p>
      </div>
      <div>
        <p className="text-2xl font-semibold">{carCount}</p>
        <p className="text-zinc-500">Cars</p>
      </div>
      <div>
        <p className="text-2xl font-semibold">{maintenanceCount}</p>
        <p className="text-zinc-500">Maintenance records</p>
      </div>
    </div>
  );
}

async function UsersTable() {
  const allUsers = await getAllUsersWithCarCounts();

  return (
    <table className="max-w-xl text-left text-sm">
      <thead>
        <tr className="border-b border-zinc-200 dark:border-zinc-800">
          <th className="py-2">Name</th>
          <th className="py-2">Phone</th>
          <th className="py-2">Role</th>
          <th className="py-2">Cars</th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map((u) => (
          <tr key={u.id} className="border-b border-zinc-100 dark:border-zinc-900">
            <td className="py-2">{u.fullName}</td>
            <td className="py-2">{u.phone}</td>
            <td className="py-2">{u.isAdmin ? "Admin" : "User"}</td>
            <td className="py-2">{u.carCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
