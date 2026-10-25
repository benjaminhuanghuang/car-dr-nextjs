"use client";

import { useState } from "react";
import { LayoutGrid, List as ListIcon } from "lucide-react";
import type { cars } from "@/drizzle/schema";
import type { CarColor } from "@/lib/car-colors";
import type { CarMaintenanceSummary } from "@/lib/maintenance-suggestions";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { CarCard } from "@/components/car-card";
import { CarListItem } from "@/components/car-list-item";

export type CarListEntry = {
  car: typeof cars.$inferSelect;
  color: CarColor | null;
  summary: CarMaintenanceSummary;
};

type ViewMode = "grid" | "list";

export function CarsView({ entries }: { entries: CarListEntry[] }) {
  const [view, setView] = useState<ViewMode>("grid");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {entries.length}{" "}
          {entries.length === 1 ? "vehicle" : "vehicles"}
        </p>
        <ButtonGroup>
          <Button
            type="button"
            variant={view === "grid" ? "secondary" : "outline"}
            size="icon-sm"
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
          >
            <LayoutGrid />
          </Button>
          <Button
            type="button"
            variant={view === "list" ? "secondary" : "outline"}
            size="icon-sm"
            aria-label="List view"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
          >
            <ListIcon />
          </Button>
        </ButtonGroup>
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
