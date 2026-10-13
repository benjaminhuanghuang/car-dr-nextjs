import { Suspense } from "react";
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
import { Label } from "@/components/ui/label";

export default function CarPage(props: PageProps<"/cars/[id]">) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-6">
      <Suspense fallback={<p className="text-muted-foreground">Loading car...</p>}>
        <CarDetail paramsPromise={props.params} />
      </Suspense>
    </div>
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">
            {car.year} {car.make} {car.model}
          </h1>
          {car.licensePlate && (
            <Badge variant="outline" className="font-mono">
              {car.licensePlate}
            </Badge>
          )}
        </div>
        <Link
          href={`/cars/${car.id}/maintenance`}
          className={buttonVariants({ variant: "outline" })}
        >
          <Wrench data-icon="inline-start" />
          Maintenance history
        </Link>
      </div>

      <Card>
        <form action={updateCarWithId} className="contents">
          <CardHeader>
            <CardTitle>Car details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="make">Make</Label>
              <Input id="make" name="make" defaultValue={car.make} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" name="model" defaultValue={car.model} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                inputMode="numeric"
                defaultValue={car.year}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="licensePlate">License plate</Label>
              <Input
                id="licensePlate"
                name="licensePlate"
                defaultValue={car.licensePlate ?? ""}
                className="font-mono"
              />
            </div>
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
