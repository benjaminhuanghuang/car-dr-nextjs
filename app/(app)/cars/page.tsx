import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { CarsLoader } from "@/components/cars/cars-loader";
import { CarListSkeleton } from "@/components/cars/car-list-skeleton";

export default function CarsPage() {
  return (
    <>
      <PageHeader
        title="Your Cars"
        actions={
          <Link href="/cars/new" className={buttonVariants()}>
            <Plus data-icon="inline-start" />
            Add a car
          </Link>
        }
      />
      <Suspense fallback={<CarListSkeleton />}>
        <CarsLoader />
      </Suspense>
    </>
  );
}
