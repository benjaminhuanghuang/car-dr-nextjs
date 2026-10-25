"use client";

import { useState } from "react";
import type { cars } from "@/drizzle/schema";
import type { CarColor } from "@/lib/car-colors";
import type { CarMaintenanceSummary } from "@/lib/maintenance-suggestions";
import { CarCard } from "@/components/car-card";
import { CarListItem } from "@/components/car-list-item";
import { ViewModeSwitcher, type ViewMode } from "@/components/cars/view-mode-switcher";

export type CarListEntry = {
  car: typeof cars.$inferSelect;
  color: CarColor | null;
  summary: CarMaintenanceSummary;
};

/** Renders `entries` as a grid or list, with a switcher to toggle between them. */
export function CarList({ entries }: { entries: CarListEntry[] }) {
  const [view, setView] = useState<ViewMode>("grid");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {entries.length}{" "}
          {entries.length === 1 ? "vehicle" : "vehicles"}
        </p>
        <ViewModeSwitcher value={view} onChange={setView} />
      </div>

      {view === "grid" ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map(({ car, color, summary }) => (
            <li key={car.id}>
              <CarCard car={car} color={color} summary={summary} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-3">
          {entries.map(({ car, color, summary }) => (
            <li key={car.id}>
              <CarListItem car={car} color={color} summary={summary} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
