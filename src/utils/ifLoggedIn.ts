import { createClient } from "@/utils/supabase/client";

export async function isUserLoggedIn() {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
            return false;
        }

        return true;
    } catch (err) {
        console.error("Error checking login status:", err);
        return false;
    }
}
