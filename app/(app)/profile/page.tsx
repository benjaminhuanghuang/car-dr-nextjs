import { Suspense } from "react";
import { PageLoading } from "@/components/page-loading";
import { requireUser } from "@/lib/session";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="Profile" />
      <Suspense fallback={<PageLoading label="Loading..." />}>
        <ProfileDetails />
      </Suspense>
    </>
  );
}

async function ProfileDetails() {
  const user = await requireUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-[8rem_1fr] items-center gap-x-4 gap-y-3">
          <dt className="text-muted-foreground">Name</dt>
          <dd>{user.fullName}</dd>
          <dt className="text-muted-foreground">Role</dt>
          <dd>
            <Badge variant={user.isAdmin ? "default" : "secondary"}>
              {user.isAdmin ? "Admin" : "User"}
            </Badge>
          </dd>
        </dl>
      </CardContent>
    </Card>
  );
}
