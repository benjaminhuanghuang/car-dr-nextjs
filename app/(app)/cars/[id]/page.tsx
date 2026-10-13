import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Car, Trash2, Wrench } from "lucide-react";
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
import { SubmitButton } from "@/components/submit-button";
import { ActionForm } from "@/components/action-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CarColorLabel } from "@/components/car-color-label";
import { CarColorSelect } from "@/components/car-color-select";
import { getCarColor } from "@/lib/car-colors";
import { IconTile } from "@/components/icon-tile";

export default function CarPage(props: PageProps<"/cars/[id]">) {
  return (
    <Suspense fallback={<CarDetailSkeleton />}>
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
  const color = getCarColor(car.color);

  return (
    <>
      <PageHeader
        title={`${car.year} ${car.make} ${car.model}`}
        description={
          (color || car.licensePlate) && (
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              {color && <CarColorLabel color={color} />}
              {car.licensePlate && (
                <Badge variant="outline" className="font-mono">
                  {car.licensePlate}
                </Badge>
              )}
            </div>
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
        <ActionForm
          action={updateCarWithId}
          successMessage="Changes saved"
          className="contents"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconTile icon={Car} size="sm" />
              Car details
            </CardTitle>
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
                <Field>
                  <FieldLabel htmlFor="color">Color</FieldLabel>
                  <CarColorSelect id="color" defaultValue={car.color} />
                </Field>
              </div>
            </FieldGroup>
          </CardContent>
          <CardFooter className="justify-end">
            <SubmitButton pendingText="Saving...">Save changes</SubmitButton>
          </CardFooter>
        </ActionForm>
      </Card>

      <Card className="ring-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconTile icon={Trash2} size="sm" tone="destructive" />
            Delete this car
          </CardTitle>
          <CardDescription>
            Permanently removes this car and all of its maintenance records.
            This can&apos;t be undone.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-end">
          <AlertDialog>
            <AlertDialogTrigger
              render={<Button variant="destructive">Delete car</Button>}
            />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete {car.year} {car.make} {car.model}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This car and all of its maintenance records will be
                  permanently deleted. This can&apos;t be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <ActionForm
                action={deleteCarWithId}
                successMessage="Car deleted"
                redirectTo="/cars"
              >
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <SubmitButton variant="destructive" pendingText="Deleting...">
                    Delete car
                  </SubmitButton>
                </AlertDialogFooter>
              </ActionForm>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </>
  );
}

/** Mirrors the page: header, the car details form, and the delete card. */
function CarDetailSkeleton() {
  return (
    <div
      className="flex flex-col gap-6"
      aria-busy="true"
      aria-label="Loading car"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-8 w-44 rounded-lg" />
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-36" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Skeleton className="h-8 w-28 rounded-lg" />
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
      </Card>
    </div>
  );
}
