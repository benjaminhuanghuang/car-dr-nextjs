import Link from "next/link";
import { SignupForm } from "./signup-form";

export default function SignupPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Sign Up</h1>
      <SignupForm />
      <Link href="/login" className="text-sm underline">
        Already have an account? Sign in
      </Link>
    </main>
  );
}
