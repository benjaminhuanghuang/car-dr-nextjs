import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "./signup-form";

export default function SignupPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Sign Up</CardTitle>
        <CardDescription>Start tracking your car maintenance.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter className="text-sm">
        <Link href="/signin" className="underline-offset-4 hover:underline">
          Already have an account? Sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
