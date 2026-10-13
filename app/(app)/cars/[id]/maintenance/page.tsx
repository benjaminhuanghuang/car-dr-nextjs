import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2, Wrench } from "lucide-react";
import { getCarById, getMaintenanceForCar } from "@/lib/queries";
import {
  createMaintenanceRecord,
  deleteMaintenanceRecord,
} from "@/lib/actions/maintenance";
import { requireUser } from "@/lib/session";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { PageLoading } from "@/components/page-loading";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/page-header";
import { SubmitButton } from "@/components/submit-button";
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

export default function MaintenancePage(
  props: PageProps<"/cars/[id]/maintenance">,
) {
  return (
    <Suspense fallback={<PageLoading label="Loading history..." />}>
      <MaintenanceContent paramsPromise={props.params} />
    </Suspense>
  );
}

async function MaintenanceContent({
  paramsPromise,
}: {
  paramsPromise: PageProps<"/cars/[id]/maintenance">["params"];
}) {
  const { id } = await paramsPromise;
  const carId = Number(id);
  const user = await requireUser();
  const car = await getCarById(carId);

  if (!car || car.userId !== user.id) {
    notFound();
  }

  const records = await getMaintenanceForCar(carId);
  const createRecordForCar = createMaintenanceRecord.bind(null, carId);

  return (
    <>
      <PageHeader
        title="Maintenance History"
        eyebrow={
          <Link
            href={`/cars/${car.id}`}
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "-ml-2 w-fit text-muted-foreground",
            })}
          >
            <ArrowLeft data-icon="inline-start" />
            {car.year} {car.make} {car.model}
          </Link>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Records</CardTitle>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Wrench />
                </EmptyMedia>
                <EmptyTitle>No maintenance records yet</EmptyTitle>
                <EmptyDescription>
                  Add the first service below to start this car&apos;s history.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Mileage</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                  <TableHead className="w-0">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => {
                  const deleteRecord = deleteMaintenanceRecord.bind(
                    null,
                    carId,
                    record.id,
                  );
                  return (
                    <TableRow key={record.id}>
                      <TableCell className="tabular-nums">
                        {new Date(record.serviceDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        {record.description}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {record.mileage != null
                          ? `${record.mileage.toLocaleString()} mi`
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {record.cost != null
                          ? `$${record.cost.toLocaleString()}`
                          : "—"}
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label={`Delete record: ${record.description}`}
                                className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 />
                              </Button>
                            }
                          />
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete this record?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                &ldquo;{record.description}&rdquo; on{" "}
                                {new Date(
                                  record.serviceDate,
                                ).toLocaleDateString()}{" "}
                                will be permanently deleted.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <form action={deleteRecord}>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <SubmitButton
                                  variant="destructive"
                                  pendingText="Deleting..."
                                >
                                  Delete record
                                </SubmitButton>
                              </AlertDialogFooter>
                            </form>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <form action={createRecordForCar} className="contents">
          <CardHeader>
            <CardTitle>Add a record</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="serviceDate">Service date</FieldLabel>
                  <Input
                    id="serviceDate"
                    name="serviceDate"
                    type="date"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Oil change"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="mileage">Mileage</FieldLabel>
                  <Input
                    id="mileage"
                    name="mileage"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    placeholder="Optional"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="cost">Cost ($)</FieldLabel>
                  <Input
                    id="cost"
                    name="cost"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    placeholder="Optional"
                  />
                </Field>
              </div>
            </FieldGroup>
          </CardContent>
          <CardFooter className="justify-end">
            <SubmitButton pendingText="Adding...">Add record</SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
