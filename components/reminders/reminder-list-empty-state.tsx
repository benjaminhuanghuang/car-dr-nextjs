import { BellOff } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function ReminderListEmptyState() {
  return (
    <Empty className="flex-none border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BellOff />
        </EmptyMedia>
        <EmptyTitle>You&apos;re all caught up</EmptyTitle>
        <EmptyDescription>
          No maintenance due soon on any of your cars.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
