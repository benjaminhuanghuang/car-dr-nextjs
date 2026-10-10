import { eq, count } from "drizzle-orm";
import { db } from "./db";
import { users, cars, maintenanceRecords } from "@/drizzle/schema";

export async function getCarsForUser(userId: number) {
  return db.select().from(cars).where(eq(cars.userId, userId));
}

export async function getCarById(carId: number) {
  const [car] = await db.select().from(cars).where(eq(cars.id, carId));
  return car;
}

export async function getMaintenanceForCar(carId: number) {
  return db
    .select()
    .from(maintenanceRecords)
    .where(eq(maintenanceRecords.carId, carId));
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
