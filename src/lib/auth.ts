import { createClient } from "@/utils/supabase/server";


export async function getUserSessionData() {
    const supabase = await createClient();

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData?.session) {
        console.error("No active session found", sessionError);
        return null; // Handle no session case appropriately
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
        console.error("Failed to fetch user data:", userError);
        return null;
    }

    return userData; 
}
