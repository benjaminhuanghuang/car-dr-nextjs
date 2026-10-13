import type { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconTileVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-lg",
  {
    variants: {
      tone: {
        primary: "bg-primary/10 text-primary",
        destructive: "bg-destructive/10 text-destructive",
      },
      size: {
        sm: "size-7 [&_svg]:size-4",
        default: "size-9 [&_svg]:size-5",
      },
    },
    defaultVariants: { tone: "primary", size: "default" },
  },
);

/** An icon on a tinted square, e.g. next to a card title or stat. */
export function IconTile({
  icon: Icon,
  tone,
  size,
  className,
}: { icon: LucideIcon; className?: string } & VariantProps<
  typeof iconTileVariants
>) {
  return (
    <span
      aria-hidden
      className={cn(iconTileVariants({ tone, size }), className)}
    >
      <Icon />
    </span>
  );
}
