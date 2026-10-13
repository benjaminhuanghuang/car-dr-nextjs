import { Suspense } from "react";
import { requireUser } from "@/lib/session";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
        <ProfileDetails />
      </Suspense>
    </div>
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
