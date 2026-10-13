import { cn } from "@/lib/utils";
import type { CarColor } from "@/lib/car-colors";

/** A car's paint color: a dot in that color followed by its name ("● Silver"). */
export function CarColorLabel({
  color,
  className,
}: {
  color: CarColor;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      {/* The ring keeps white/black dots visible on light and dark surfaces. */}
      <span
        aria-hidden
        className="size-3 shrink-0 rounded-full ring-1 ring-foreground/20"
        style={{ backgroundColor: color.swatch }}
      />
      {color.label}
    </span>
  );
}
