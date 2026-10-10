"use server";

import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { cars } from "@/drizzle/schema";
import { getCurrentUser } from "@/lib/session";

export async function createCar(formData: FormData) {
  const user = getCurrentUser();

  await db.insert(cars).values({
    userId: user.id,
    make: String(formData.get("make")),
    model: String(formData.get("model")),
    year: Number(formData.get("year")),
    licensePlate: String(formData.get("licensePlate") ?? ""),
  });

  revalidatePath("/cars");
  redirect("/cars");
}

export async function updateCar(carId: number, formData: FormData) {
  const user = getCurrentUser();

  await db
    .update(cars)
    .set({
      make: String(formData.get("make")),
      model: String(formData.get("model")),
      year: Number(formData.get("year")),
      licensePlate: String(formData.get("licensePlate") ?? ""),
    })
    .where(and(eq(cars.id, carId), eq(cars.userId, user.id)));

  revalidatePath(`/cars/${carId}`);
  revalidatePath("/cars");
}

export async function deleteCar(carId: number) {
  const user = getCurrentUser();

  await db
    .delete(cars)
    .where(and(eq(cars.id, carId), eq(cars.userId, user.id)));

  revalidatePath("/cars");
  redirect("/cars");
}
