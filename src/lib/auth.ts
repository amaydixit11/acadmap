import { createClient } from "@/utils/supabase/server";
import { createClient as createClientSupabase} from "@supabase/supabase-js";


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
    console.log("Initializing Supabase client...");
    const supabase = createClientSupabase(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      })
      
    
    console.log(`Fetching user details for userId: ${userId}`);
    const { data, error } = await supabase.auth.admin.getUserById(userId);

    if (error) {
        console.error("Error fetching user:", error);
        return undefined;
    }

    console.log("Raw data received from Supabase:", data);

    const userName = data?.user?.user_metadata?.name;
    if (!userName) {
        console.warn("User metadata or name is missing in the response.");
    } else {
        console.log(`Extracted user name: ${userName}`);
    }

    return userName;
}
