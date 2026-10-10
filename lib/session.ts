import "server-only";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { createClient } from "@/lib/supabase/server";

export type CurrentUser = {
  id: number;
  fullName: string | null;
  isAdmin: boolean;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const authUser = data.user;
  if (!authUser) {
    return null;
  }

  const [profile] = await db
    .select()
    .from(users)
    .where(eq(users.authUserId, authUser.id));

  if (!profile) {
    return null;
  }

  return {
    id: profile.id,
    fullName: profile.fullName,
    isAdmin: profile.isAdmin,
  };
}

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireAdmin(): Promise<CurrentUser> {
  const user = await requireUser();
  if (!user.isAdmin) {
    redirect("/");
  }
  return user;
}
