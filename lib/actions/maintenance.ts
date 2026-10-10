"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { cars, maintenanceRecords } from "@/drizzle/schema";
import { requireUser } from "@/lib/session";

async function assertCarOwnership(carId: number, userId: number) {
  const [car] = await db.select().from(cars).where(eq(cars.id, carId));
  if (!car || car.userId !== userId) {
    throw new Error("Car not found");
  }
}

export async function createMaintenanceRecord(
  carId: number,
  formData: FormData,
) {
  const user = await requireUser();
  await assertCarOwnership(carId, user.id);

  await db.insert(maintenanceRecords).values({
    carId,
    serviceDate: new Date(String(formData.get("serviceDate"))),
    description: String(formData.get("description")),
    mileage: formData.get("mileage")
      ? Number(formData.get("mileage"))
      : null,
    cost: formData.get("cost") ? Number(formData.get("cost")) : null,
  });

  revalidatePath(`/cars/${carId}/maintenance`);
}

export async function deleteMaintenanceRecord(
  carId: number,
  recordId: number,
) {
  const user = await requireUser();
  await assertCarOwnership(carId, user.id);

  await db
    .delete(maintenanceRecords)
    .where(eq(maintenanceRecords.id, recordId));

  revalidatePath(`/cars/${carId}/maintenance`);
}
