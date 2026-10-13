import Link from "next/link";
import { createCar } from "@/lib/actions/cars";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PageHeader } from "@/components/page-header";

export default function NewCarPage() {
  return (
    <>
      <PageHeader title="Add a Car" />
      <Card>
        <form action={createCar} className="contents">
          <CardHeader>
            <CardTitle>Car details</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="make">Make</FieldLabel>
                  <Input id="make" name="make" placeholder="Toyota" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="model">Model</FieldLabel>
                  <Input id="model" name="model" placeholder="Camry" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="year">Year</FieldLabel>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    inputMode="numeric"
                    placeholder="2020"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="licensePlate">License plate</FieldLabel>
                  <Input
                    id="licensePlate"
                    name="licensePlate"
                    placeholder="Optional"
                    className="font-mono"
                  />
                </Field>
              </div>
            </FieldGroup>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Link href="/cars" className={buttonVariants({ variant: "ghost" })}>
              Cancel
            </Link>
            <SubmitButton pendingText="Saving...">Save</SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
