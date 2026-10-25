import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** "Up to date" (green) or "N overdue" (red), from a car's maintenance summary. */
export function MaintenanceStatusBadge({
  overdueCount,
  className,
}: {
  overdueCount: number;
  className?: string;
}) {
  if (overdueCount > 0) {
    return (
      <Badge
        variant="secondary"
        className={cn("bg-destructive/10 text-destructive", className)}
      >
        {overdueCount} overdue
      </Badge>
    );
  }

  return (
    <Badge
      variant="secondary"
      className={cn("bg-success/10 text-success", className)}
    >
      Up to date
    </Badge>
  );
}
