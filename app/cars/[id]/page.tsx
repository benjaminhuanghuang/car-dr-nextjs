import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCarById } from "@/lib/queries";
import { updateCar, deleteCar } from "@/lib/actions/cars";
import { requireUser } from "@/lib/session";

export default function CarPage(props: PageProps<"/cars/[id]">) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <Suspense fallback={<p>Loading car...</p>}>
        <CarDetail paramsPromise={props.params} />
      </Suspense>
    </main>
  );
}

async function CarDetail({
  paramsPromise,
}: {
  paramsPromise: PageProps<"/cars/[id]">["params"];
}) {
  const { id } = await paramsPromise;
  const carId = Number(id);
  const user = await requireUser();
  const car = await getCarById(carId);

  if (!car || car.userId !== user.id) {
    notFound();
  }

  const updateCarWithId = updateCar.bind(null, carId);
  const deleteCarWithId = deleteCar.bind(null, carId);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {car.year} {car.make} {car.model}
        </h1>
        <Link href={`/cars/${car.id}/maintenance`} className="underline">
          Maintenance history
        </Link>
      </div>

      <form action={updateCarWithId} className="flex max-w-sm flex-col gap-3">
        <input
          name="make"
          defaultValue={car.make}
          required
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
        />
        <input
          name="model"
          defaultValue={car.model}
          required
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
        />
        <input
          name="year"
          type="number"
          defaultValue={car.year}
          required
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
        />
        <input
          name="licensePlate"
          defaultValue={car.licensePlate ?? ""}
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
        />
        <button
          type="submit"
          className="rounded bg-foreground px-4 py-2 text-background"
        >
          Save changes
        </button>
      </form>

      <form action={deleteCarWithId}>
        <button type="submit" className="text-red-600 underline">
          Delete car
        </button>
      </form>
    </>
  );
}
