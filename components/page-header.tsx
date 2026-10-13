import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: ReactNode;
  /** Small content above the title, e.g. a back link. */
  eyebrow?: ReactNode;
  /** Content under the title, e.g. a subtitle or badges. */
  description?: ReactNode;
  /** Buttons aligned to the right of the title. */
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  eyebrow,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-wrap items-end justify-between gap-4",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-2">
        {eyebrow}
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      )}
    </header>
  );
}
