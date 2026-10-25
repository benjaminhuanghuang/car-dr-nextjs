"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ReminderCarOption = { id: number; label: string };

export type ReminderFiltersValue = {
  carId: "all" | number;
  status: "all" | "overdue" | "due-soon";
};

const statusLabels: Record<ReminderFiltersValue["status"], string> = {
  all: "All statuses",
  overdue: "Overdue",
  "due-soon": "Due soon",
};

export function ReminderFilters({
  cars,
  value,
  onChange,
}: {
  cars: ReminderCarOption[];
  value: ReminderFiltersValue;
  onChange: (value: ReminderFiltersValue) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Car</span>
        <Select
          value={String(value.carId)}
          onValueChange={(carId) =>
            onChange({
              ...value,
              carId: carId === "all" ? "all" : Number(carId),
            })
          }
        >
          <SelectTrigger aria-label="Filter by car">
            <SelectValue placeholder="All cars">
              {(carId: string) => {
                if (carId === "all") return "All cars";
                return (
                  cars.find((car) => String(car.id) === carId)?.label ??
                  "All cars"
                );
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cars</SelectItem>
            {cars.map((car) => (
              <SelectItem key={car.id} value={String(car.id)}>
                {car.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Status</span>
        <Select
          value={value.status}
          onValueChange={(status) =>
            onChange({
              ...value,
              status: status as ReminderFiltersValue["status"],
            })
          }
        >
          <SelectTrigger aria-label="Filter by status">
            <SelectValue placeholder="All statuses">
              {(status: string) =>
                statusLabels[status as ReminderFiltersValue["status"]] ??
                "All statuses"
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="due-soon">Due soon</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
