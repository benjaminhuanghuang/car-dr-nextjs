import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { cars } from "@/drizzle/schema";
import type { CarColor } from "@/lib/car-colors";
import type { CarMaintenanceSummary } from "@/lib/maintenance-suggestions";
import { formatMiles } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CarColorLabel } from "@/components/car-color-label";
import { MaintenanceStatusBadge } from "@/components/maintenance-status-badge";

/** List view row for a car: compact details plus maintenance status. */
export function CarListItem({
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
            {car.mileage != null && (
              <span className="tabular-nums">{formatMiles(car.mileage)}</span>
            )}
            {car.licensePlate ? (
              <Badge variant="outline" className="font-mono">
                {car.licensePlate}
              </Badge>
            ) : (
              "No license plate"
            )}
          </CardDescription>
          <CardAction className="flex items-center gap-3 self-center">
            <MaintenanceStatusBadge overdueCount={summary.overdueCount} />
            <ChevronRight
              aria-hidden
              className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
            />
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
}
