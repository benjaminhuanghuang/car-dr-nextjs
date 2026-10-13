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
import { PageLoading } from "@/components/page-loading";

export default function CarsPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Your Cars</h1>
        <Link href="/cars/new" className={buttonVariants()}>
          <Plus data-icon="inline-start" />
          Add a car
        </Link>
      </div>
      <Suspense fallback={<PageLoading label="Loading cars..." />}>
        <CarsList />
      </Suspense>
    </div>
  );
}

async function CarsList() {
  const user = await requireUser();
  const userCars = await getCarsForUser(user.id);

  if (userCars.length === 0) {
    return (
      <Empty className="border">
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
      {userCars.map((car) => (
        <li key={car.id}>
          <Link
            href={`/cars/${car.id}`}
            className="group block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Card className="transition-colors group-hover:bg-muted/50">
              <CardHeader>
                <CardTitle>
                  {car.year} {car.make} {car.model}
                </CardTitle>
                <CardDescription>
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
      ))}
    </ul>
  );
}
