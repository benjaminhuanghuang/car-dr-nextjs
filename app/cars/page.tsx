import { Suspense } from "react";
import Link from "next/link";
import { getCarsForUser } from "@/lib/queries";
import { requireUser } from "@/lib/session";

export default function CarsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Cars</h1>
        <Link href="/cars/new" className="underline">
          Add a car
        </Link>
      </div>
      <Suspense fallback={<p>Loading cars...</p>}>
        <CarsList />
      </Suspense>
    </main>
  );
}

async function CarsList() {
  const user = await requireUser();
  const userCars = await getCarsForUser(user.id);

  if (userCars.length === 0) {
    return <p className="text-zinc-500">No cars yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {userCars.map((car) => (
        <li key={car.id}>
          <Link href={`/cars/${car.id}`} className="underline">
            {car.year} {car.make} {car.model}
          </Link>
        </li>
      ))}
    </ul>
  );
}
