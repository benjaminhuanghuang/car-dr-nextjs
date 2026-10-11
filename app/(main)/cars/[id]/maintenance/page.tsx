import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCarById, getMaintenanceForCar } from "@/lib/queries";
import {
  createMaintenanceRecord,
  deleteMaintenanceRecord,
} from "@/lib/actions/maintenance";
import { requireUser } from "@/lib/session";

export default function MaintenancePage(
  props: PageProps<"/cars/[id]/maintenance">,
) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Maintenance History</h1>
      <Suspense fallback={<p>Loading history...</p>}>
        <MaintenanceContent paramsPromise={props.params} />
      </Suspense>
    </div>
  );
}

async function MaintenanceContent({
  paramsPromise,
}: {
  paramsPromise: PageProps<"/cars/[id]/maintenance">["params"];
}) {
  const { id } = await paramsPromise;
  const carId = Number(id);
  const user = await requireUser();
  const car = await getCarById(carId);

  if (!car || car.userId !== user.id) {
    notFound();
  }

  const records = await getMaintenanceForCar(carId);
  const createRecordForCar = createMaintenanceRecord.bind(null, carId);

  return (
    <>
      {records.length === 0 ? (
        <p className="text-zinc-500">No maintenance records yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {records.map((record) => {
            const deleteRecord = deleteMaintenanceRecord.bind(
              null,
              carId,
              record.id,
            );
            return (
              <li
                key={record.id}
                className="flex items-center justify-between gap-4 border-b border-zinc-200 py-2 dark:border-zinc-800"
              >
                <div>
                  <p>
                    {new Date(record.serviceDate).toLocaleDateString()} —{" "}
                    {record.description}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {record.mileage ? `${record.mileage} mi` : ""}
                    {record.cost ? ` · $${record.cost}` : ""}
                  </p>
                </div>
                <form action={deleteRecord}>
                  <button type="submit" className="text-red-600 underline">
                    Delete
                  </button>
                </form>
              </li>
            );
          })}
        </ul>
      )}

      <form
        action={createRecordForCar}
        className="flex max-w-sm flex-col gap-3"
      >
        <input
          name="serviceDate"
          type="date"
          required
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
        />
        <input
          name="description"
          placeholder="Description"
          required
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
        />
        <input
          name="mileage"
          type="number"
          placeholder="Mileage"
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
        />
        <input
          name="cost"
          type="number"
          placeholder="Cost"
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
        />
        <button
          type="submit"
          className="rounded bg-foreground px-4 py-2 text-background"
        >
          Add record
        </button>
      </form>
    </>
  );
}
