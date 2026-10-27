import { describe, it, expect, vi, beforeEach } from "vitest";
import { eq, and } from "drizzle-orm";
import { cars, maintenanceRecords } from "@/drizzle/schema";

vi.mock("@/lib/db", () => ({ db: { select: vi.fn() } }));

import { db } from "@/lib/db";
import {
  getCarsForUser,
  getOwnedCar,
  getMaintenanceForUser,
  getMaintenanceForCar,
} from "@/lib/queries";

const mockSelect = vi.mocked(db.select);

/** A chainable stand-in for Drizzle's query builder, resolving to `result`. */
function queryBuilder(result: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const builder: any = {};
  const self = () => builder;
  builder.from = vi.fn(self);
  builder.where = vi.fn(self);
  builder.innerJoin = vi.fn(self);
  builder.orderBy = vi.fn(self);
  builder.then = (
    resolve: (value: unknown) => unknown,
    reject: (reason: unknown) => unknown,
  ) => Promise.resolve(result).then(resolve, reject);
  return builder;
}

beforeEach(() => {
  mockSelect.mockReset();
});

describe("data isolation", () => {
  it("returns a user's own cars, scoped by userId in the query", async () => {
    const own = [
      { id: 1, userId: 1, year: 2020, make: "Honda", model: "Civic" },
    ];
    const builder = queryBuilder(own);
    mockSelect.mockReturnValue(builder);

    const result = await getCarsForUser(1);

    expect(result).toEqual(own);
    expect(builder.where).toHaveBeenCalledWith(eq(cars.userId, 1));
  });

  it("returns a user's own maintenance records, scoped by the car owner's userId", async () => {
    const own = [
      {
        id: 1,
        carId: 10,
        carYear: 2020,
        carMake: "Honda",
        carModel: "Civic",
        serviceDate: new Date("2024-01-15"),
        description: "Oil change",
        mileage: 30000,
        cost: 4999,
      },
    ];
    const builder = queryBuilder(own);
    mockSelect.mockReturnValue(builder);

    const result = await getMaintenanceForUser(1);

    expect(result).toEqual(own);
    expect(builder.innerJoin).toHaveBeenCalledWith(
      cars,
      eq(maintenanceRecords.carId, cars.id),
    );
    expect(builder.where).toHaveBeenCalledWith(eq(cars.userId, 1));
  });

  it("returns undefined for a car id that belongs to another user", async () => {
    // The real WHERE clause requires both the id AND the owner to match, so
    // a real database would never return a row here regardless of how the
    // mock is configured; what we're verifying is that the query itself
    // enforces ownership rather than relying on an app-level check.
    const builder = queryBuilder([]);
    mockSelect.mockReturnValue(builder);

    const result = await getOwnedCar(99, 1);

    expect(result).toBeUndefined();
    expect(builder.where).toHaveBeenCalledWith(
      and(eq(cars.id, 99), eq(cars.userId, 1)),
    );
  });

  it("never fetches maintenance for a car that failed the ownership check", async () => {
    // Mirrors the pattern every page/action uses: getOwnedCar gates access,
    // and getMaintenanceForCar is only reachable once that check passes.
    const ownedCarBuilder = queryBuilder([]);
    mockSelect.mockReturnValueOnce(ownedCarBuilder);

    const car = await getOwnedCar(99, 1);
    const records = car ? await getMaintenanceForCar(car.id) : [];

    expect(car).toBeUndefined();
    expect(records).toEqual([]);
    expect(mockSelect).toHaveBeenCalledTimes(1);
  });

  it("returns an empty list for a user with no cars", async () => {
    const builder = queryBuilder([]);
    mockSelect.mockReturnValue(builder);

    const result = await getCarsForUser(1);

    expect(result).toEqual([]);
  });
});
