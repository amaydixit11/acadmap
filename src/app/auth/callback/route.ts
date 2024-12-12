import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    console.log("Received GET request"); // Log entry point
    const requestUrl = new URL(request.url);
    console.log("Parsed request URL:", requestUrl.toString()); // Log the full request URL

    const code = requestUrl.searchParams.get("code");
    console.log("Extracted 'code' parameter:", code); // Log the extracted 'code' parameter

    const origin = requestUrl.origin;
    console.log("Determined origin:", origin); // Log the origin

    const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();
    console.log("Extracted 'redirect_to' parameter:", redirectTo); // Log the extracted 'redirect_to' parameter

    if (code) {
      console.log("Code is present. Creating Supabase client...");
      const supabase = await createClient();
      console.log("Supabase client created. Attempting to exchange code for session...");
      const session = await supabase.auth.exchangeCodeForSession(code);
      console.log("Session exchange response:", session); // Log the session exchange response
    } else {
      console.log("No code provided. Skipping session exchange.");
    }

    if (redirectTo) {
      console.log(`Redirecting to: ${origin}${redirectTo}`); // Log the redirection URL
      return NextResponse.redirect(`${origin}${redirectTo}`);
    }

    console.log(`Redirecting to default: ${origin}/`); // Log the default redirection
    return NextResponse.redirect(`${origin}/`);
  } catch (error) {
    console.error("Error occurred in GET handler:", error); // Log any errors
    return NextResponse.error(); // Return a server error response
  }
}
