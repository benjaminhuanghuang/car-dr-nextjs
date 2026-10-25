import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** Same shape as the car cards, so the list doesn't jump when it loads. */
export function CarListSkeleton() {
  return (
    <div
      className="flex flex-col gap-4"
      aria-busy="true"
      aria-label="Loading cars"
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-7 w-16 rounded-lg" />
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <li key={i}>
            <Card className="py-0">
              <div className="h-28 bg-muted" />
              <CardHeader className="pt-4">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-28" />
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
