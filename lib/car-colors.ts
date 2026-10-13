/**
 * Preset paint colors a user can pick for a car. `swatch` is the paint color
 * itself (data, not a UI theme token), so it stays the same in light and dark mode.
 */
export const CAR_COLORS = [
  { value: "white", label: "White", swatch: "#f4f4f1" },
  { value: "black", label: "Black", swatch: "#1c1d20" },
  { value: "silver", label: "Silver", swatch: "#c2c6cb" },
  { value: "gray", label: "Gray", swatch: "#6c7076" },
  { value: "blue", label: "Blue", swatch: "#1f4f8f" },
  { value: "red", label: "Red", swatch: "#b3202a" },
  { value: "green", label: "Green", swatch: "#2f5e3b" },
  { value: "brown", label: "Brown", swatch: "#6b4b33" },
  { value: "beige", label: "Beige", swatch: "#d9caa9" },
  { value: "yellow", label: "Yellow", swatch: "#e3b519" },
  { value: "orange", label: "Orange", swatch: "#d9671f" },
] as const;

export type CarColor = (typeof CAR_COLORS)[number];

export function getCarColor(value: string | null | undefined) {
  return CAR_COLORS.find((color) => color.value === value) ?? null;
}

/** Reads the `color` form field; anything that isn't a preset becomes null. */
export function parseCarColor(value: FormDataEntryValue | null) {
  return getCarColor(typeof value === "string" ? value : null)?.value ?? null;
}
