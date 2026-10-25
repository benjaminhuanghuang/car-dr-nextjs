import { Suspense } from "react";
import Link from "next/link";
import { Car, Plus } from "lucide-react";
import { getCarsForUser, getMaintenanceForCar } from "@/lib/queries";
import { requireUser } from "@/lib/session";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/page-header";
import { getCarColor } from "@/lib/car-colors";
import { getMaintenanceSuggestions, summarizeMaintenance } from "@/lib/maintenance-suggestions";
import { CarsView, type CarListEntry } from "@/components/cars/cars-view";

export default function CarsPage() {
  return (
    <>
      <PageHeader
        title="Your Cars"
        actions={
          <Link href="/cars/new" className={buttonVariants()}>
            <Plus data-icon="inline-start" />
            Add a car
          </Link>
        }
      />
      <Suspense fallback={<CarsListSkeleton />}>
        <CarsList />
      </Suspense>
    </>
  );
}

async function CarsList() {
  const user = await requireUser();
  const userCars = await getCarsForUser(user.id);

  if (userCars.length === 0) {
    return (
      <Empty className="flex-none border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Car />
          </EmptyMedia>
          <EmptyTitle>No cars yet</EmptyTitle>
          <EmptyDescription>
            Add your first car to start tracking its maintenance.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/cars/new" className={buttonVariants()}>
            <Plus data-icon="inline-start" />
            Add a car
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  const now = new Date();
  const entries: CarListEntry[] = await Promise.all(
    userCars.map(async (car) => {
      const records = await getMaintenanceForCar(car.id);
      const suggestions = getMaintenanceSuggestions(car, records, now);
      return {
        car,
        color: getCarColor(car.color),
        summary: summarizeMaintenance(suggestions, now),
      };
    }),
  );

  return <CarsView entries={entries} />;
}

/** Same shape as the car cards, so the list doesn't jump when it loads. */
function CarsListSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading cars">
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
