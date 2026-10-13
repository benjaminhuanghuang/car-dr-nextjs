"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "dark", label: "Dark theme", Icon: Moon },
  { value: "system", label: "System theme", Icon: Monitor },
] as const;

const noopSubscribe = () => () => {};

/** false during SSR and hydration, true afterwards — without a setState-in-effect. */
function useIsMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();

  return (
    <div
      role="group"
      aria-label="Theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-muted p-0.5",
        className
      )}
    >
      {options.map(({ value, label, Icon }) => {
        // The stored theme is unknown on the server, so nothing is highlighted
        // until mount instead of briefly highlighting the wrong option.
        const selected = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={selected}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
              selected && "bg-background text-foreground shadow-sm"
            )}
          >
            <Icon className="size-4" aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
