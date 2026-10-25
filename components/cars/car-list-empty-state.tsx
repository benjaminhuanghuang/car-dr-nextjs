import Link from "next/link";
import { Car, Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function CarListEmptyState() {
  return (
    <Empty className="flex-none border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Car />
        </EmptyMedia>
        <EmptyTitle>No cars yet</EmptyTitle>
        <EmptyDescription>
          Add your first car to start tracking its maintenance.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href="/cars/new" className={buttonVariants()}>
          <Plus data-icon="inline-start" />
          Add a car
        </Link>
      </EmptyContent>
    </Empty>
  );
}
