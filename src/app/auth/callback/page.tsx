"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/utils/supabase/client";

const OAuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // Listen for the authentication state change
    const { data } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          // User is authenticated, handle successful login here
          router.push("/"); // Redirect to a protected page
        } else {
          // Handle error if there's no session
          console.error("OAuth error: no session found");
        }
      }
    );

    // Cleanup listener when component is unmounted
    return () => {
      data?.subscription?.unsubscribe();
    };
  }, [router]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default OAuthCallback;
