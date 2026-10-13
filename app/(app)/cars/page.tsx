import { Suspense } from "react";
import Link from "next/link";
import { Car, ChevronRight, Plus } from "lucide-react";
import { getCarsForUser } from "@/lib/queries";
import { requireUser } from "@/lib/session";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { CarColorLabel } from "@/components/car-color-label";
import { getCarColor } from "@/lib/car-colors";

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

  return (
    <ul className="flex flex-col gap-3">
      {userCars.map((car) => {
        const color = getCarColor(car.color);
        return (
          <li key={car.id}>
            <Link
              href={`/cars/${car.id}`}
              className="group block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Card className="relative transition-colors group-hover:bg-muted/50">
                {color && (
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-1.5"
                    style={{ backgroundColor: color.swatch }}
                  />
                )}
                <CardHeader>
                  <CardTitle>
                    {car.year} {car.make} {car.model}
                  </CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-3">
                    {color && <CarColorLabel color={color} />}
                    {car.licensePlate ? (
                      <Badge variant="outline" className="font-mono">
                        {car.licensePlate}
                      </Badge>
                    ) : (
                      "No license plate"
                    )}
                  </CardDescription>
                  <CardAction className="self-center">
                    <ChevronRight
                      aria-hidden
                      className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    />
                  </CardAction>
                </CardHeader>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Same shape as the car cards, so the list doesn't jump when it loads. */
function CarsListSkeleton() {
  return (
    <ul
      className="flex flex-col gap-3"
      aria-busy="true"
      aria-label="Loading cars"
    >
      {[0, 1, 2].map((i) => (
        <li key={i}>
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-28" />
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
}
