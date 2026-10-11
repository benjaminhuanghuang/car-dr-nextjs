import Link from "next/link";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Sign In</h1>
      <LoginForm />
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
