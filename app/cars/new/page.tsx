import { createCar } from "@/lib/actions/cars";

export default function NewCarPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Add a Car</h1>
      <form action={createCar} className="flex max-w-sm flex-col gap-3">
        <input
          name="make"
          placeholder="Make"
          required
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
        />
        <input
          name="model"
          placeholder="Model"
          required
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
        />
        <input
          name="year"
          type="number"
          placeholder="Year"
          required
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
        />
        <input
          name="licensePlate"
          placeholder="License plate"
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-transparent"
        />
        <button
          type="submit"
          className="rounded bg-foreground px-4 py-2 text-background"
        >
          Save
        </button>
      </form>
    </main>
  );
}
