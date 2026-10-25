import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** Same shape as a reminder item, so the list doesn't jump when it loads. */
export function ReminderListSkeleton() {
  return (
    <ul
      className="flex flex-col gap-3"
      aria-busy="true"
      aria-label="Loading reminders"
    >
      {[0, 1, 2].map((i) => (
        <li key={i}>
          <Card>
            <CardContent className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-5 w-20 rounded-full" />
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
