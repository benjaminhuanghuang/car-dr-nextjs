import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { requireUser } from "@/lib/session";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { IconTile } from "@/components/icon-tile";
import { UserRound } from "lucide-react";

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="Profile" />
      <Suspense fallback={<ProfileSkeleton />}>
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
        <CardTitle className="flex items-center gap-2">
          <IconTile icon={UserRound} size="sm" />
          Account
        </CardTitle>
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

/** Mirrors the account card: title and two label/value rows. */
function ProfileSkeleton() {
  return (
    <Card aria-busy="true" aria-label="Loading profile">
      <CardHeader>
        <Skeleton className="h-7 w-28" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="grid grid-cols-[8rem_1fr] items-center gap-x-4"
          >
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
