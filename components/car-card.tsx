import Link from "next/link";
import { Car } from "lucide-react";
import type { cars } from "@/drizzle/schema";
import type { CarColor } from "@/lib/car-colors";
import type { CarMaintenanceSummary } from "@/lib/maintenance-suggestions";
import { formatDate, formatMiles } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CarColorLabel } from "@/components/car-color-label";
import { MaintenanceStatusBadge } from "@/components/maintenance-status-badge";

/** Grid view of a car: photo-less banner, key details, and maintenance status. */
export function CarCard({
  car,
  color,
  summary,
}: {
  car: typeof cars.$inferSelect;
  color: CarColor | null;
  summary: CarMaintenanceSummary;
}) {
  return (
    <Link
      href={`/cars/${car.id}`}
      className="group block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="relative h-full py-0 transition-colors group-hover:bg-muted/50">
        {color && (
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 z-10 h-1.5"
            style={{ backgroundColor: color.swatch }}
          />
        )}
        <div className="flex h-28 items-center justify-center bg-muted">
          <Car aria-hidden className="size-10 text-muted-foreground" />
        </div>
        <CardHeader className="pt-4">
          <CardTitle>
            {car.year} {car.make} {car.model}
          </CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-3">
            {color && <CarColorLabel color={color} />}
            {car.mileage != null && (
              <span className="tabular-nums">{formatMiles(car.mileage)}</span>
            )}
            {car.licensePlate && (
              <Badge variant="outline" className="font-mono">
                {car.licensePlate}
              </Badge>
            )}
          </CardDescription>
          <CardAction>
            <MaintenanceStatusBadge overdueCount={summary.overdueCount} />
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-1 pb-4 text-sm">
          {summary.lastService ? (
            <p>
              <span className="text-muted-foreground">Last service: </span>
              {summary.lastService.service} on{" "}
              {formatDate(summary.lastService.date)}
              {summary.lastService.mileage != null && (
                <> at {formatMiles(summary.lastService.mileage)}</>
              )}
            </p>
          ) : (
            <p className="text-muted-foreground">No service on record yet.</p>
          )}
          {summary.nextService && (
            <p>
              <span className="text-muted-foreground">Next service: </span>
              {summary.nextService.service} by{" "}
              {formatDate(summary.nextService.dueDate)}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
