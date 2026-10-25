"use client";

import { LayoutGrid, List as ListIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export type ViewMode = "grid" | "list";

export function ViewModeSwitcher({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}) {
  return (
    <ButtonGroup>
      <Button
        type="button"
        variant={value === "grid" ? "secondary" : "outline"}
        size="icon-sm"
        aria-label="Grid view"
        aria-pressed={value === "grid"}
        onClick={() => onChange("grid")}
      >
        <LayoutGrid />
      </Button>
      <Button
        type="button"
        variant={value === "list" ? "secondary" : "outline"}
        size="icon-sm"
        aria-label="List view"
        aria-pressed={value === "list"}
        onClick={() => onChange("list")}
      >
        <ListIcon />
      </Button>
    </ButtonGroup>
  );
}
