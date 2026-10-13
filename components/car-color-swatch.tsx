import { cn } from "@/lib/utils";
import type { CarColor } from "@/lib/car-colors";

/** Small paint-color dot. The ring keeps white/black visible on any surface. */
export function CarColorSwatch({
  color,
  className,
}: {
  color: CarColor;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-3 shrink-0 rounded-full ring-1 ring-foreground/20",
        className,
      )}
      style={{ backgroundColor: color.swatch }}
    />
  );
}
