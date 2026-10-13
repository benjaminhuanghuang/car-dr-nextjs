import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllUsersWithCarCounts, getAnalyticsSummary } from "@/lib/queries";
import { requireAdmin } from "@/lib/session";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/page-header";
import { IconTile } from "@/components/icon-tile";
import { Car, Users, Wrench } from "lucide-react";

export default function AdminPage() {
  return (
    <>
      <PageHeader title="Admin Dashboard" />
      <Suspense fallback={<AdminSkeleton />}>
        <AdminContent />
      </Suspense>
    </>
  );
}

async function AdminContent() {
  await requireAdmin();

  const [{ userCount, carCount, maintenanceCount }, allUsers] =
    await Promise.all([getAnalyticsSummary(), getAllUsersWithCarCounts()]);

  const stats = [
    { label: "Users", value: userCount, icon: Users },
    { label: "Cars", value: carCount, icon: Car },
    { label: "Maintenance records", value: maintenanceCount, icon: Wrench },
  ];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">
                {stat.value.toLocaleString()}
              </CardTitle>
              <CardAction>
                <IconTile icon={stat.icon} />
              </CardAction>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconTile icon={Users} size="sm" />
            Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Cars</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.fullName}</TableCell>
                  <TableCell className="text-muted-foreground tabular-nums">
                    {u.phone || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.isAdmin ? "default" : "secondary"}>
                      {u.isAdmin ? "Admin" : "User"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {u.carCount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

/** Mirrors the page: three stat cards and the users table. */
function AdminSkeleton() {
  return (
    <div
      className="flex flex-col gap-6"
      aria-busy="true"
      aria-label="Loading dashboard"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-12" />
              <CardAction>
                <Skeleton className="size-9 rounded-lg" />
              </CardAction>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-24" />
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
