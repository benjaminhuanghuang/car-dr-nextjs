import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SigninForm } from "./signin-form";

export default function SigninPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Sign In</CardTitle>
        <CardDescription>Welcome back to Car Doctor.</CardDescription>
      </CardHeader>
      <CardContent>
        <SigninForm />
      </CardContent>
      <CardFooter className="justify-between text-sm">
        <Link href="/signup" className="underline-offset-4 hover:underline">
          Create an account
        </Link>
        <Link
          href="/forgot-password"
          className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Forgot password?
        </Link>
      </CardFooter>
    </Card>
  );
}
