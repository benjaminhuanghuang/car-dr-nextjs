import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarClock,
  Car,
  Pencil,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import { getCarById, getMaintenanceForCar } from "@/lib/queries";
import { requireUser } from "@/lib/session";
import { getCarColor } from "@/lib/car-colors";
import {
  type MaintenanceSuggestion,
  DUE_SOON_MONTHS,
  getMaintenanceSuggestions,
  isDueSoon,
  isOverdue,
} from "@/lib/maintenance-suggestions";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CarColorLabel } from "@/components/car-color-label";
import { IconTile } from "@/components/icon-tile";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";
import { formatDate, formatMiles } from "@/lib/format";

export default function CarPage(props: PageProps<"/cars/[id]">) {
  return (
    <Suspense fallback={<CarDetailSkeleton />}>
      <CarDetail paramsPromise={props.params} />
    </Suspense>
  );
}

async function CarDetail({
  paramsPromise,
}: {
  paramsPromise: PageProps<"/cars/[id]">["params"];
}) {
  const { id } = await paramsPromise;
  const carId = Number(id);
  const user = await requireUser();
  const car = await getCarById(carId);

  if (!car || car.userId !== user.id) {
    notFound();
  }

  const records = await getMaintenanceForCar(carId);
  const now = new Date();
  const suggestions = getMaintenanceSuggestions(car, records, now);
  const color = getCarColor(car.color);

  const details: { label: string; value: React.ReactNode }[] = [
    { label: "Make", value: car.make },
    { label: "Model", value: car.model },
    { label: "Year", value: <span className="tabular-nums">{car.year}</span> },
    {
      label: "Mileage",
      value:
        car.mileage != null ? (
          <span className="tabular-nums">{formatMiles(car.mileage)}</span>
        ) : null,
    },
    {
      label: "License plate",
      value: car.licensePlate ? (
        <span className="font-mono">{car.licensePlate}</span>
      ) : null,
    },
    { label: "Color", value: color ? <CarColorLabel color={color} /> : null },
  ];

  return (
    <>
      <PageHeader
        title={`${car.year} ${car.make} ${car.model}`}
        actions={
          <>
            <Link
              href={`/cars/${car.id}/edit`}
              className={buttonVariants({ variant: "outline" })}
            >
              <Pencil data-icon="inline-start" />
              Edit
            </Link>
            <Link
              href={`/cars/${car.id}/maintenance`}
              className={buttonVariants({ variant: "outline" })}
            >
              <Wrench data-icon="inline-start" />
              Maintenance history
            </Link>
          </>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconTile icon={Car} size="sm" />
            Car details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {details.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <dt className="text-muted-foreground">{label}</dt>
                <dd>
                  {value ?? <span className="text-muted-foreground">—</span>}
                </dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconTile icon={CalendarClock} size="sm" />
            Upcoming maintenance
          </CardTitle>
          <CardDescription>
            Services due within {DUE_SOON_MONTHS} months are highlighted.
          </CardDescription>
          <CardAction>
            <Badge variant="outline">Sample data</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col divide-y">
            {suggestions.map((suggestion) => (
              <SuggestionItem
                key={suggestion.service}
                suggestion={suggestion}
                now={now}
              />
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}

function SuggestionItem({
  suggestion,
  now,
}: {
  suggestion: MaintenanceSuggestion;
  now: Date;
}) {
  const { service, lastDate, lastMileage, dueDate, dueMileage } = suggestion;
  const urgent = isDueSoon(suggestion, now);
  const overdue = isOverdue(suggestion, now);

  return (
    <li className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-muted-foreground">
          {lastDate ? (
            <>
              Your last {service} was on {formatDate(lastDate)}
              {lastMileage != null && <> at {formatMiles(lastMileage)}</>}.
            </>
          ) : (
            <>No {service} on record yet.</>
          )}
        </p>
        <p
          className={cn(
            "font-medium",
            urgent ? "text-destructive" : "text-foreground",
          )}
        >
          {urgent && (
            <TriangleAlert
              aria-hidden
              className="mr-1.5 inline size-4 -translate-y-px"
            />
          )}
          {overdue ? "Your" : "Your next"} {service} {overdue ? "was" : "is"}{" "}
          due {dueMileage != null && <>at {formatMiles(dueMileage)} or </>}
          by {formatDate(dueDate)}.
        </p>
      </div>
      {urgent && (
        <Badge variant="destructive" className="shrink-0">
          {overdue ? "Overdue" : "Due soon"}
        </Badge>
      )}
    </li>
  );
}

/** Mirrors the page: header, the read-only details, and the suggestions list. */
function CarDetailSkeleton() {
  return (
    <div
      className="flex flex-col gap-6"
      aria-busy="true"
      aria-label="Loading car"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Skeleton className="h-8 w-64" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded-lg" />
          <Skeleton className="h-8 w-44 rounded-lg" />
        </div>
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-36" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col gap-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-32" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
