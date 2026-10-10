"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { maintenanceRecords } from "@/drizzle/schema";

export async function createMaintenanceRecord(
  carId: number,
  formData: FormData,
) {
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
  await db
    .delete(maintenanceRecords)
    .where(eq(maintenanceRecords.id, recordId));

  revalidatePath(`/cars/${carId}/maintenance`);
}
