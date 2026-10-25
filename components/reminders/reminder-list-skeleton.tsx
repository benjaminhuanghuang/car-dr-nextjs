import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** Same shape as the filters + reminder items, so the page doesn't jump when it loads. */
export function ReminderListSkeleton() {
  return (
    <div
      className="flex flex-col gap-4"
      aria-busy="true"
      aria-label="Loading reminders"
    >
      <div className="flex gap-2">
        <Skeleton className="h-8 w-28 rounded-lg" />
        <Skeleton className="h-8 w-32 rounded-lg" />
      </div>
      <ul className="flex flex-col gap-3">
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
    </div>
  );
}
