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

/** Maintenance due soon or overdue, across all of a user's cars, soonest first. */
export async function getReminders(
  userId: number,
  now: Date
): Promise<Reminder[]> {
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
}
