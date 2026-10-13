import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

// The SVG is used as a shape only: `bg-current` paints it in the surrounding
// text color, so the logo follows the theme and surfaces like `.surface-brand`.
const maskStyle: CSSProperties = {
  maskImage: "url(/gear-car.svg)",
  WebkitMaskImage: "url(/gear-car.svg)",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
};

/** Car Doctor gear-and-car mark. Size it with a width class, e.g. `w-8`. */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block aspect-200/212 shrink-0 bg-current",
        className
      )}
      style={maskStyle}
    />
  );
}
