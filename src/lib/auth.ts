import { createClient } from "@/utils/supabase/client";

export async function getUserSessionData() {
    console.log("Creating Supabase client...");
    const supabase = await createClient();

    console.log("Fetching session data...");
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData?.session) {
        console.error("No active session found", sessionError);
        return null; // Handle no session case appropriately
    }
    console.log("Session data fetched successfully:", sessionData);

    console.log("Fetching user data...");
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
        console.error("Failed to fetch user data:", userError);
        return null;
    }
    console.log("User data fetched successfully:", userData);
    
    return userData;
}
