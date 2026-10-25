import { tool } from "ai";
import { z } from "zod";
import { getCarsForUser, getMaintenanceForUser } from "@/lib/queries";

/** Tools for the chat assistant, scoped to the signed-in user. */
export function getChatTools(userId: number) {
  return {
    listUserCars: tool({
      description:
        "List the cars the signed-in user owns, including how many they have.",
      inputSchema: z.object({}),
      execute: async () => {
        const cars = await getCarsForUser(userId);
        return {
          count: cars.length,
          cars: cars.map((car) => ({
            year: car.year,
            make: car.make,
            model: car.model,
            mileage: car.mileage,
          })),
        };
      },
    }),
    listMaintenanceRecords: tool({
      description:
        "List maintenance/service records across all of the signed-in user's cars (service date, description, mileage, cost).",
      inputSchema: z.object({}),
      execute: async () => {
        const records = await getMaintenanceForUser(userId);
        return {
          count: records.length,
          records: records.map((record) => ({
            car: `${record.carYear} ${record.carMake} ${record.carModel}`,
            date: new Date(record.serviceDate).toISOString().slice(0, 10),
            description: record.description,
            mileage: record.mileage,
            cost: record.cost,
          })),
        };
      },
    }),
  };
}
