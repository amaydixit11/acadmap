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

export async function getUserNameFromId(userId: string): Promise<string | undefined> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.admin.getUserById(userId);

    if (error) {
        console.error("Error fetching user:", error);
        return undefined;
    }
    console.log("data: ", data)
    const userName = data.user?.user_metadata?.name;
    return userName;
}