import { getCarsForUser, getMaintenanceForCar } from "@/lib/queries";
import { requireUser } from "@/lib/session";
import { getCarColor } from "@/lib/car-colors";
import {
  getMaintenanceSuggestions,
  summarizeMaintenance,
} from "@/lib/maintenance-suggestions";
import { CarList, type CarListEntry } from "@/components/cars/car-list";
import { CarListEmptyState } from "@/components/cars/car-list-empty-state";

/** Fetches the user's cars and their maintenance summaries, then hands off to `CarList`. */
export async function CarsLoader() {
  const user = await requireUser();
  const userCars = await getCarsForUser(user.id);

  if (userCars.length === 0) {
    return <CarListEmptyState />;
  }

  const now = new Date();
  const entries: CarListEntry[] = await Promise.all(
    userCars.map(async (car) => {
      const records = await getMaintenanceForCar(car.id);
      const suggestions = getMaintenanceSuggestions(car, records, now);
      return {
        car,
        color: getCarColor(car.color),
        summary: summarizeMaintenance(suggestions, now),
      };
    }),
  );

  return <CarList entries={entries} />;
}
