import { Suspense } from "react";
import { PageLoading } from "@/components/page-loading";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Wrench } from "lucide-react";
import { getCarById } from "@/lib/queries";
import { updateCar, deleteCar } from "@/lib/actions/cars";
import { requireUser } from "@/lib/session";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PageHeader } from "@/components/page-header";

export default function CarPage(props: PageProps<"/cars/[id]">) {
  return (
    <Suspense fallback={<PageLoading label="Loading car..." />}>
      <CarDetail paramsPromise={props.params} />
    </Suspense>
  );
}

async function CarDetail({
  paramsPromise,
}: {
  paramsPromise: PageProps<"/cars/[id]">["params"];
}) {
  const { id } = await paramsPromise;
  const carId = Number(id);
  const user = await requireUser();
  const car = await getCarById(carId);

  if (!car || car.userId !== user.id) {
    notFound();
  }

  const updateCarWithId = updateCar.bind(null, carId);
  const deleteCarWithId = deleteCar.bind(null, carId);

  return (
    <>
      <PageHeader
        title={`${car.year} ${car.make} ${car.model}`}
        description={
          car.licensePlate && (
            <Badge variant="outline" className="font-mono">
              {car.licensePlate}
            </Badge>
          )
        }
        actions={
          <Link
            href={`/cars/${car.id}/maintenance`}
            className={buttonVariants({ variant: "outline" })}
          >
            <Wrench data-icon="inline-start" />
            Maintenance history
          </Link>
        }
      />

      <Card>
        <form action={updateCarWithId} className="contents">
          <CardHeader>
            <CardTitle>Car details</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="make">Make</FieldLabel>
                  <Input
                    id="make"
                    name="make"
                    defaultValue={car.make}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="model">Model</FieldLabel>
                  <Input
                    id="model"
                    name="model"
                    defaultValue={car.model}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="year">Year</FieldLabel>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    inputMode="numeric"
                    defaultValue={car.year}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="licensePlate">License plate</FieldLabel>
                  <Input
                    id="licensePlate"
                    name="licensePlate"
                    defaultValue={car.licensePlate ?? ""}
                    className="font-mono"
                  />
                </Field>
              </div>
            </FieldGroup>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit">Save changes</Button>
          </CardFooter>
        </form>
      </Card>

      <Card className="ring-destructive/30">
        <CardHeader>
          <CardTitle>Delete this car</CardTitle>
          <CardDescription>
            Permanently removes this car. This can&apos;t be undone.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-end">
          <form action={deleteCarWithId}>
            <Button type="submit" variant="destructive">
              Delete car
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
