import type { cars, maintenanceRecords } from "@/drizzle/schema";

type Car = typeof cars.$inferSelect;
type MaintenanceRecord = typeof maintenanceRecords.$inferSelect;

/** One upcoming service for a car: when it was last done and when it's due. */
export type MaintenanceSuggestion = {
  /** Service name, e.g. "oil change". Lowercase so it reads inside a sentence. */
  service: string;
  /** Last time it was done (ISO date "YYYY-MM-DD"), or null if never recorded. */
  lastDate: string | null;
  /** Odometer at the last service, in miles. */
  lastMileage: number | null;
  /** Deadline (ISO date "YYYY-MM-DD"). */
  dueDate: string;
  /** Odometer reading it's due at, in miles, if the interval is mileage-based too. */
  dueMileage: number | null;
};

/** Services due within this many months (or overdue) are highlighted. */
export const DUE_SOON_MONTHS = 2;

export function isOverdue(suggestion: MaintenanceSuggestion, now: Date) {
  return new Date(suggestion.dueDate) < startOfDayUTC(now);
}

export function isDueSoon(suggestion: MaintenanceSuggestion, now: Date) {
  const limit = startOfDayUTC(now);
  limit.setUTCMonth(limit.getUTCMonth() + DUE_SOON_MONTHS);
  return new Date(suggestion.dueDate) <= limit;
}

/**
 * Maintenance suggestions for a car, soonest deadline first.
 *
 * TODO: generate these from `records` (last service of each type) and the
 * car's mileage and year instead of returning sample data. `records` is passed in so the
 * call site doesn't change when this becomes real.
 */
export function getMaintenanceSuggestions(
  car: Car,
  records: MaintenanceRecord[],
  now: Date
): MaintenanceSuggestion[] {
  void records;
  const miles = car.mileage ?? 40_000;
  // Sample data relative to today, so both normal and highlighted rows show.
  const sample: MaintenanceSuggestion[] = [
    {
      service: "oil change",
      lastDate: isoDate(now, -5),
      lastMileage: miles - 4_200,
      dueDate: isoDate(now, 1),
      dueMileage: miles + 800,
    },
    {
      service: "brake inspection",
      lastDate: isoDate(now, -12, -10),
      lastMileage: miles - 11_000,
      dueDate: isoDate(now, 0, -10),
      dueMileage: null,
    },
    {
      service: "tire rotation",
      lastDate: isoDate(now, -2),
      lastMileage: miles - 1_500,
      dueDate: isoDate(now, 4),
      dueMileage: miles + 6_000,
    },
    {
      service: "cabin air filter replacement",
      lastDate: null,
      lastMileage: null,
      dueDate: isoDate(now, 8),
      dueMileage: null,
    },
  ];
  return sample.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

/** Condensed view of a car's maintenance state, for a car list/card. */
export type CarMaintenanceSummary = {
  overdueCount: number;
  lastService: {
    service: string;
    date: string;
    mileage: number | null;
  } | null;
  nextService: {
    service: string;
    dueDate: string;
    dueMileage: number | null;
  } | null;
};

/** Summarizes suggestions (soonest-due first, as returned by `getMaintenanceSuggestions`). */
export function summarizeMaintenance(
  suggestions: MaintenanceSuggestion[],
  now: Date
): CarMaintenanceSummary {
  const overdueCount = suggestions.filter((s) => isOverdue(s, now)).length;

  const mostRecentlyServiced = suggestions
    .filter((s) => s.lastDate != null)
    .reduce<MaintenanceSuggestion | null>(
      (latest, s) =>
        !latest || s.lastDate! > latest.lastDate! ? s : latest,
      null
    );

  const nextDue = suggestions[0] ?? null;

  return {
    overdueCount,
    lastService: mostRecentlyServiced
      ? {
          service: mostRecentlyServiced.service,
          date: mostRecentlyServiced.lastDate!,
          mileage: mostRecentlyServiced.lastMileage,
        }
      : null,
    nextService: nextDue
      ? {
          service: nextDue.service,
          dueDate: nextDue.dueDate,
          dueMileage: nextDue.dueMileage,
        }
      : null,
  };
}

function startOfDayUTC(date: Date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
}

function isoDate(from: Date, months: number, days = 0) {
  const d = startOfDayUTC(from);
  d.setUTCMonth(d.getUTCMonth() + months);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}
