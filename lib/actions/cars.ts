"use server";

import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { cars } from "@/drizzle/schema";
import { requireUser } from "@/lib/session";
import { parseCarColor } from "@/lib/car-colors";

/** Odometer in whole miles; empty or invalid input is stored as null. */
function parseMileage(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.trim() === "") return null;
  const miles = Number(value);
  return Number.isInteger(miles) && miles >= 0 ? miles : null;
}

export async function createCar(formData: FormData) {
  const user = await requireUser();

  await db.insert(cars).values({
    userId: user.id,
    make: String(formData.get("make")),
    model: String(formData.get("model")),
    year: Number(formData.get("year")),
    licensePlate: String(formData.get("licensePlate") ?? ""),
    mileage: parseMileage(formData.get("mileage")),
    color: parseCarColor(formData.get("color")),
  });

  revalidatePath("/cars");
}

export async function updateCar(carId: number, formData: FormData) {
  const user = await requireUser();

  await db
    .update(cars)
    .set({
      make: String(formData.get("make")),
      model: String(formData.get("model")),
      year: Number(formData.get("year")),
      licensePlate: String(formData.get("licensePlate") ?? ""),
      mileage: parseMileage(formData.get("mileage")),
      color: parseCarColor(formData.get("color")),
    })
    .where(and(eq(cars.id, carId), eq(cars.userId, user.id)));

  revalidatePath(`/cars/${carId}`);
  revalidatePath("/cars");
}

export async function deleteCar(carId: number) {
  const user = await requireUser();

  await db
    .delete(cars)
    .where(and(eq(cars.id, carId), eq(cars.userId, user.id)));

  revalidatePath("/cars");
}
