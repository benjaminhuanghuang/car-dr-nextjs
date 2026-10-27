import { eq, and, count, desc } from "drizzle-orm";
import { db } from "./db";
import { users, cars, maintenanceRecords } from "@/drizzle/schema";

export async function getCarsForUser(userId: number) {
  return db.select().from(cars).where(eq(cars.userId, userId));
}

/** A car, scoped to its owner; undefined if it doesn't exist or belongs to someone else. */
export async function getOwnedCar(carId: number, userId: number) {
  const [car] = await db
    .select()
    .from(cars)
    .where(and(eq(cars.id, carId), eq(cars.userId, userId)));
  return car;
}

export async function getMaintenanceForCar(carId: number) {
  return db
    .select()
    .from(maintenanceRecords)
    .where(eq(maintenanceRecords.carId, carId));
}

/** Maintenance records across all of a user's cars, newest first. */
export async function getMaintenanceForUser(userId: number) {
  return db
    .select({
      id: maintenanceRecords.id,
      carId: maintenanceRecords.carId,
      carYear: cars.year,
      carMake: cars.make,
      carModel: cars.model,
      serviceDate: maintenanceRecords.serviceDate,
      description: maintenanceRecords.description,
      mileage: maintenanceRecords.mileage,
      cost: maintenanceRecords.cost,
    })
    .from(maintenanceRecords)
    .innerJoin(cars, eq(maintenanceRecords.carId, cars.id))
    .where(eq(cars.userId, userId))
    .orderBy(desc(maintenanceRecords.serviceDate));
}

export async function getAllUsersWithCarCounts() {
  return db
    .select({
      id: users.id,
      fullName: users.fullName,
      phone: users.phone,
      isAdmin: users.isAdmin,
      carCount: count(cars.id),
    })
    .from(users)
    .leftJoin(cars, eq(cars.userId, users.id))
    .groupBy(users.id);
}

export async function getAnalyticsSummary() {
  const [[{ userCount }], [{ carCount }], [{ maintenanceCount }]] =
    await Promise.all([
      db.select({ userCount: count() }).from(users),
      db.select({ carCount: count() }).from(cars),
      db.select({ maintenanceCount: count() }).from(maintenanceRecords),
    ]);

  return { userCount, carCount, maintenanceCount };
}
