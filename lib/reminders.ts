import { cache } from "react";
import type { cars } from "@/drizzle/schema";
import { getCarsForUser, getMaintenanceForCar } from "@/lib/queries";
import {
  getMaintenanceSuggestions,
  isDueSoon,
  isOverdue,
  type MaintenanceSuggestion,
} from "@/lib/maintenance-suggestions";

export type Reminder = {
  car: typeof cars.$inferSelect;
  suggestion: MaintenanceSuggestion;
  overdue: boolean;
};

/**
 * Maintenance due soon or overdue, across all of a user's cars, soonest first.
 *
 * Cached per request: the nav bell and the `/reminders` page both call this
 * with the same `userId`, and should share one DB round trip, not two. `now`
 * is computed inside (rather than taken as an argument) so the cache key stays
 * just `userId` — two `new Date()` instances from different call sites would
 * otherwise never match and defeat the memoization.
 */
export const getReminders = cache(async (userId: number): Promise<Reminder[]> => {
  const now = new Date();
  const userCars = await getCarsForUser(userId);

  const perCar = await Promise.all(
    userCars.map(async (car) => {
      const records = await getMaintenanceForCar(car.id);
      const suggestions = getMaintenanceSuggestions(car, records, now);
      return suggestions
        .filter((suggestion) => isDueSoon(suggestion, now))
        .map((suggestion) => ({
          car,
          suggestion,
          overdue: isOverdue(suggestion, now),
        }));
    })
  );

  return perCar
    .flat()
    .sort((a, b) =>
      a.suggestion.dueDate.localeCompare(b.suggestion.dueDate)
    );
});
