"use client";

import { CAR_COLORS, getCarColor } from "@/lib/car-colors";
import { CarColorLabel } from "@/components/car-color-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Paint color picker for car forms; submits the preset value as `name`. */
export function CarColorSelect({
  id,
  name = "color",
  defaultValue,
}: {
  id?: string;
  name?: string;
  defaultValue?: string | null;
}) {
  return (
    <Select name={name} defaultValue={getCarColor(defaultValue)?.value ?? null}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue placeholder="Optional">
          {(value: string | null) => {
            const color = getCarColor(value);
            return color ? <CarColorLabel color={color} /> : "Optional";
          }}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {CAR_COLORS.map((color) => (
          <SelectItem key={color.value} value={color.value}>
            <CarColorLabel color={color} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
