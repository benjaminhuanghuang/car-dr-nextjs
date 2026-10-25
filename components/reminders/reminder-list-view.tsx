"use client";

import { useMemo, useState } from "react";
import type { Reminder } from "@/lib/reminders";
import { ReminderItem } from "@/components/reminders/reminder-item";
import {
  ReminderFilters,
  type ReminderFiltersValue,
} from "@/components/reminders/reminder-filters";

/** Filterable (by car, by due status) view of a user's reminders. */
export function ReminderListView({ reminders }: { reminders: Reminder[] }) {
  const carOptions = useMemo(() => {
    const seen = new Map<number, string>();
    for (const { car } of reminders) {
      if (!seen.has(car.id)) {
        seen.set(car.id, `${car.year} ${car.make} ${car.model}`);
      }
    }
    return Array.from(seen, ([id, label]) => ({ id, label }));
  }, [reminders]);

  const [filters, setFilters] = useState<ReminderFiltersValue>({
    carId: "all",
    status: "all",
  });

  const filtered = reminders.filter((reminder) => {
    if (filters.carId !== "all" && reminder.car.id !== filters.carId) {
      return false;
    }
    if (filters.status === "overdue" && !reminder.overdue) return false;
    if (filters.status === "due-soon" && reminder.overdue) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
      <ReminderFilters cars={carOptions} value={filters} onChange={setFilters} />
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No reminders match these filters.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map((reminder) => (
            <li key={`${reminder.car.id}-${reminder.suggestion.service}`}>
              <ReminderItem reminder={reminder} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
