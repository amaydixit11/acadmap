import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  console.log("GET handler invoked with request URL:", request.url);

  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  console.log("Authorization code received:", code);

  const next = searchParams.get('next') ?? '/profile';
  console.log("Next redirect path:", next);

  if (code) {
    const supabase = await createClient();
    console.log("Supabase client created, attempting session exchange...");

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error.message);
    } else {
      console.log("Session exchange successful");
    }

    const forwardedHost = request.headers.get('x-forwarded-host');
    console.log("Forwarded host:", forwardedHost);

    const isLocalEnv = process.env.NODE_ENV === 'development';
    console.log("Is local environment:", isLocalEnv);

    if (isLocalEnv) {
      console.log("Redirecting to local environment:", `${origin}${next}`);
      return NextResponse.redirect(`${origin}${next}`);
    } else if (forwardedHost) {
      console.log("Redirecting via forwarded host:", `https://${forwardedHost}${next}`);
      return NextResponse.redirect(`https://${forwardedHost}${next}`);
    } else {
      console.log("Redirecting via origin:", `${origin}${next}`);
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  console.error("Authorization code not provided or error occurred");
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
