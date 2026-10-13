import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MaintenancePage(
  props: PageProps<"/cars/[id]/maintenance">,
) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6">
      <Suspense
        fallback={<p className="text-muted-foreground">Loading history...</p>}
      >
        <MaintenanceContent paramsPromise={props.params} />
      </Suspense>
    </div>
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
      <div className="flex flex-col gap-2">
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
        <h1 className="text-2xl font-semibold">Maintenance History</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Records</CardTitle>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No maintenance records yet.
            </p>
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
                        <form action={deleteRecord}>
                          <Button
                            type="submit"
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Delete record: ${record.description}`}
                            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 />
                          </Button>
                        </form>
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
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="serviceDate">Service date</Label>
              <Input id="serviceDate" name="serviceDate" type="date" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Oil change"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                name="mileage"
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="Optional"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cost">Cost ($)</Label>
              <Input
                id="cost"
                name="cost"
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="Optional"
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit">Add record</Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
