import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import type { Reminder } from "@/lib/reminders";
import { formatDate, formatMiles } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function ReminderItem({ reminder }: { reminder: Reminder }) {
  const { car, suggestion, overdue } = reminder;
  const { service, dueDate, dueMileage } = suggestion;

  return (
    <Link
      href={`/cars/${car.id}`}
      className="group block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="transition-colors group-hover:bg-muted/50">
        <CardContent className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-sm text-muted-foreground">
              {car.year} {car.make} {car.model}
            </p>
            <p
              className={cn(
                "font-medium",
                overdue ? "text-destructive" : "text-foreground",
              )}
            >
              <TriangleAlert
                aria-hidden
                className="mr-1.5 inline size-4 -translate-y-px"
              />
              {overdue ? "Your" : "Your next"} {service}{" "}
              {overdue ? "was" : "is"} due{" "}
              {dueMileage != null && <>at {formatMiles(dueMileage)} or </>}
              by {formatDate(dueDate)}.
            </p>
          </div>
          <Badge
            variant={overdue ? "destructive" : "secondary"}
            className={cn("shrink-0", !overdue && "bg-warning/10 text-warning")}
          >
            {overdue ? "Overdue" : "Due soon"}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}
