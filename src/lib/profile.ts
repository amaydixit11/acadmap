import { ProfileModel } from "@/models/profile";
import { createClient } from "@/utils/supabase/client";
import { getRecordById, insertRecord } from "./supabase";

export const createProfileIfNotExist = async (authId: string, email: string, name: string, profileImage: string) => {
    const existingProfile = await getRecordById('profile', authId)
    // const { data: existingProfile, error } = await supabase
    //   .from('profile')
    //   .select('*')
    //   .eq('id', authId)
    //   .single(); // Assuming 'id' is unique for each user
  
    // if (error && error.code !== 'PGRST116') {
    //   console.error('Error fetching profile:', error);
    //   return;
    // }
  
    // If no existing profile is found, create a new one
    if (!existingProfile) {
        const profile = createProfileData(authId, email, name, profileImage)
        const response = await insertRecord('profile', profile)
        console.log("Inserted profile: ", response)
    //   const { data, error: insertError } = await supabase
    //     .from('profile')
    //     .insert([
    //       {
    //         id: profile.id,
    //         email: profile.email,
    //         name: profile.name,
    //         role: profile.role,
    //         profileImage: profile.profileImage,
    //       }
    //     ]);
    } else {
      console.log('profile already exists:', existingProfile);
    }
  };
  
export function createProfileData(authId: string, email: string, name: string, profileImage: string): ProfileModel{
    return {
        id: authId,
        email: email,
        name: name,
        role: getRole(email),
        profileImage: profileImage,
    }

}

export function getRole(email ?: string, batch ?: string): ('student' | 'alumni' | 'external'){
    let role:('student' | 'alumni' | 'external') = 'external';
    const currentYear = Number((new Date().getFullYear()).toString());
    if (batch && currentYear >= Number(batch)) role = 'alumni';
    if (email?.endsWith('iitbhilai.ac.in')) role = 'student';
    return role;
}