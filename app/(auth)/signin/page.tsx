import Link from "next/link";
import { SigninForm } from "./signin-form";

export default function SigninPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Sign In</h1>
      <SigninForm />
      <div className="flex gap-4 text-sm">
        <Link href="/signup" className="underline">
          Create an account
        </Link>
        <Link href="/forgot-password" className="underline">
          Forgot password?
        </Link>
      </div>
    </>
  );
}
