import { describe, expect, it, vi, beforeEach } from "vitest";
import { getChatTools } from "@/lib/chat-tools";
import { getCarsForUser, getMaintenanceForUser } from "@/lib/queries";

vi.mock("@/lib/queries", () => ({
  getCarsForUser: vi.fn(),
  getMaintenanceForUser: vi.fn(),
}));

const mockGetCarsForUser = vi.mocked(getCarsForUser);
const mockGetMaintenanceForUser = vi.mocked(getMaintenanceForUser);

// The AI SDK's execute() signature takes a required ToolExecutionOptions
// second argument that callers never need to construct by hand; a minimal
// stub is enough to invoke the tool the same way the chat route does.
const toolExecutionOptions = { toolCallId: "test-call", messages: [] };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function runTool(tool: any) {
  return tool.execute({}, toolExecutionOptions);
}

beforeEach(() => {
  vi.resetAllMocks();
});

describe("listUserCars", () => {
  it("returns a count matching the database for a user with multiple cars", async () => {
    const cars = [
      {
        id: 1,
        userId: 1,
        year: 2020,
        make: "Honda",
        model: "Civic",
        licensePlate: "ABC123",
        mileage: 30000,
        color: "Blue",
      },
      {
        id: 2,
        userId: 1,
        year: 2018,
        make: "Toyota",
        model: "Camry",
        licensePlate: null,
        mileage: 50000,
        color: null,
      },
    ];
    mockGetCarsForUser.mockResolvedValue(cars);

    const tools = getChatTools(1);
    const result = await runTool(tools.listUserCars);

    expect(mockGetCarsForUser).toHaveBeenCalledWith(1);
    expect(result).toEqual({
      count: 2,
      cars: [
        { year: 2020, make: "Honda", model: "Civic", mileage: 30000 },
        { year: 2018, make: "Toyota", model: "Camry", mileage: 50000 },
      ],
    });
  });

  it("returns an empty list and count 0 for a user with no cars", async () => {
    mockGetCarsForUser.mockResolvedValue([]);

    const tools = getChatTools(1);
    const result = await runTool(tools.listUserCars);

    expect(result).toEqual({ count: 0, cars: [] });
  });

  it("only requests cars scoped to the calling user, never another user's", async () => {
    mockGetCarsForUser.mockImplementation(async (userId: number) =>
      userId === 1
        ? [
            {
              id: 1,
              userId: 1,
              year: 2021,
              make: "Mazda",
              model: "3",
              licensePlate: null,
              mileage: 1000,
              color: null,
            },
          ]
        : [],
    );

    const tools = getChatTools(1);
    await runTool(tools.listUserCars);

    expect(mockGetCarsForUser).toHaveBeenCalledTimes(1);
    expect(mockGetCarsForUser).toHaveBeenCalledWith(1);
    expect(mockGetCarsForUser).not.toHaveBeenCalledWith(2);
  });

  it("fails safely when the database query throws", async () => {
    mockGetCarsForUser.mockRejectedValue(new Error("connection reset"));

    const tools = getChatTools(1);

    await expect(runTool(tools.listUserCars)).rejects.toThrow(
      "connection reset",
    );
  });
});

describe("listMaintenanceRecords", () => {
  it("returns records belonging to the user's own cars", async () => {
    const records = [
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
      {
        id: 2,
        carId: 11,
        carYear: 2018,
        carMake: "Toyota",
        carModel: "Camry",
        serviceDate: new Date("2024-03-02"),
        description: "Brake pads",
        mileage: 51000,
        cost: 21000,
      },
    ];
    mockGetMaintenanceForUser.mockResolvedValue(records);

    const tools = getChatTools(1);
    const result = await runTool(tools.listMaintenanceRecords);

    expect(mockGetMaintenanceForUser).toHaveBeenCalledWith(1);
    expect(result).toEqual({
      count: 2,
      records: [
        {
          car: "2020 Honda Civic",
          date: "2024-01-15",
          description: "Oil change",
          mileage: 30000,
          cost: 4999,
        },
        {
          car: "2018 Toyota Camry",
          date: "2024-03-02",
          description: "Brake pads",
          mileage: 51000,
          cost: 21000,
        },
      ],
    });
  });

  it("does not leak another user's maintenance records", async () => {
    // getMaintenanceForUser already scopes by userId via an inner join on
    // cars.userId; the tool must forward the caller's own id, not trust
    // any other id, and must not merge in data for other users.
    mockGetMaintenanceForUser.mockImplementation(async (userId: number) =>
      userId === 1
        ? []
        : [
            {
              id: 99,
              carId: 50,
              carYear: 2015,
              carMake: "Ford",
              carModel: "Focus",
              serviceDate: new Date("2024-05-01"),
              description: "Belongs to user 2",
              mileage: 80000,
              cost: 10000,
            },
          ],
    );

    const tools = getChatTools(1);
    const result = await runTool(tools.listMaintenanceRecords);

    expect(mockGetMaintenanceForUser).toHaveBeenCalledWith(1);
    expect(result).toEqual({ count: 0, records: [] });
  });

  it("fails safely when the service date is malformed", async () => {
    mockGetMaintenanceForUser.mockResolvedValue([
      {
        id: 1,
        carId: 10,
        carYear: 2020,
        carMake: "Honda",
        carModel: "Civic",
        serviceDate: "not-a-date" as unknown as Date,
        description: "Oil change",
        mileage: 30000,
        cost: 4999,
      },
    ]);

    const tools = getChatTools(1);

    await expect(runTool(tools.listMaintenanceRecords)).rejects.toThrow();
  });

  it("fails safely when the database query throws", async () => {
    mockGetMaintenanceForUser.mockRejectedValue(new Error("query timeout"));

    const tools = getChatTools(1);

    await expect(runTool(tools.listMaintenanceRecords)).rejects.toThrow(
      "query timeout",
    );
  });
});
