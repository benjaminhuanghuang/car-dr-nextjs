import Link from "next/link";
import { createCar } from "@/lib/actions/cars";
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

export default function NewCarPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Add a Car</h1>
      <Card>
        <form action={createCar} className="contents">
          <CardHeader>
            <CardTitle>Car details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="make">Make</Label>
              <Input id="make" name="make" placeholder="Toyota" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" name="model" placeholder="Camry" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                inputMode="numeric"
                placeholder="2020"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="licensePlate">License plate</Label>
              <Input
                id="licensePlate"
                name="licensePlate"
                placeholder="Optional"
                className="font-mono"
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Link href="/cars" className={buttonVariants({ variant: "ghost" })}>
              Cancel
            </Link>
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
