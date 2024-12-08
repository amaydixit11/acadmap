import { createClient } from "@/utils/supabase/client";

export async function getUserData() {
    const supabase = createClient(); 

    try {
        const { data, error } = await supabase.auth.getUser(); 

        if (error) {
            console.error("Supabase Error: ", error);
            return null; 
        }
        
        return data; 
    } catch (err) {
        console.error("Unexpected Error: ", err);
        return null; 
    }
}
