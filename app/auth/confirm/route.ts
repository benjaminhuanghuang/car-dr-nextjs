import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Landing spot for signup-confirmation and password-reset email links.
// Supabase's email verifies the token server-side, then redirects here with
// token_hash + type; verifyOtp exchanges it for a session before we forward
// the user to `next`. Requires the Supabase email templates to point at
// this route (see Dashboard > Authentication > Email Templates) instead of
// the default Supabase-hosted confirmation URL.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=invalid-link`);
}
