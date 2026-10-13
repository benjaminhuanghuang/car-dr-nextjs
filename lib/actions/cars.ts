"use server";

import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { cars } from "@/drizzle/schema";
import { requireUser } from "@/lib/session";
import { parseCarColor } from "@/lib/car-colors";

export async function createCar(formData: FormData) {
  const user = await requireUser();

  await db.insert(cars).values({
    userId: user.id,
    make: String(formData.get("make")),
    model: String(formData.get("model")),
    year: Number(formData.get("year")),
    licensePlate: String(formData.get("licensePlate") ?? ""),
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
