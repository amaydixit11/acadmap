import { ProfileModel } from "@/models/profile";
import { getRecordById, insertRecord, updateRecord } from "./supabase";
import { getUserSessionData } from "./auth";

export const createProfileIfNotExist = async (authId: string, email: string, name: string, profile_image: string) => {
    console.log("Checking if profile exists for authId:", authId);
    const existingProfile = await getRecordById('profiles', authId);
    console.log("Existing profile data:", existingProfile);
    if (!existingProfile) {
        console.log("No existing profile found. Creating new profile.");
        const profile = createProfileData(authId, email, name, profile_image);
        console.log("Profile data to insert:", profile);

        const response = await insertRecord('profiles', profile);
        console.log("Inserted profile response:", response);
    } else {
        console.log('Profile already exists:', existingProfile);
    }
};
  
export function createProfileData(authId: string, email: string, name: string, profile_image: string): ProfileModel {
    console.log("Creating profile data for:", { authId, email, name, profile_image });
    const profile = {
        id: authId,
        email: email,
        name: name,
        role: getRole(email),
        profile_image: profile_image,
        batch: '',
        mobile: '',
        department: '',
        bio: '',
        linkedin_url: '',
    };
    console.log("Generated profile data:", profile);
    return profile;
}

export function getRole(email ?: string, batch ?: string): ('student' | 'alumni' | 'external') {
    console.log("Determining role for email:", email, "and batch:", batch);
    
    let role: ('student' | 'alumni' | 'external') = 'external';
    const currentYear = Number((new Date().getFullYear()).toString());
    console.log("Current year:", currentYear);
    
    if (batch && currentYear >= Number(batch)) {
        role = 'alumni';
        console.log("Assigned role 'alumni' based on batch:", batch);
    }
    
    if (email?.endsWith('iitbhilai.ac.in')) {
        role = 'student';
        console.log("Assigned role 'student' based on email domain.");
    }
    
    console.log("Determined role:", role);
    return role;
}

export async function getCurrentUserProfile() {
    console.log("Getting current user profile.");
    const user = await getUserSessionData();
    if (!user) {
        console.error("No active session found. Returning null profile.");
        return null;
    }
    createProfileIfNotExist(user.user.id, user.user.user_metadata.email, user.user.user_metadata.full_name, user.user.user_metadata.avatar_url)
    const userProfile = await getRecordById('profiles', user.user.id);
    let profile: ProfileModel = {
        id: '1',
        email: 'test@test.test',
        name: 'Tester',
        role: 'external',
        batch: '2027',
        mobile: '9999999999',
        department: 'CSE',
        profile_image: '',
        bio: 'hi',
        linkedin_url: '',
    };
    if (userProfile){
        profile = {
            id: userProfile.id,
            email: userProfile.email,
            name: userProfile.name,
            role: userProfile.role,
            batch: userProfile.batch,
            mobile: userProfile.mobile,
            department: userProfile.department,
            profile_image: userProfile.profile_image,
            bio: userProfile.bio,
            linkedin_url: userProfile.linkedin_url
        }
    }
    console.log("Current user profile:", profile);
    return profile;
}

export const updateUserProfile = async (profileData: Partial<ProfileModel>)=> {
    console.log("[DEBUG] Attempting to update user profile:", profileData);

    // Validate required fields
    if (!profileData.id) {
        console.error("[ERROR] Cannot update profile: Missing user ID");
        return null;
    }
    console.log("[DEBUG] User ID provided:", profileData.id);

    // Determine role if email or batch is updated
    let updatedRole: ('student' | 'alumni' | 'external') | undefined;
    if (profileData.email || profileData.batch) {
        console.log("[DEBUG] Email or batch updated, determining new role...");
        updatedRole = getRole(profileData.email, profileData.batch);
        console.log("[DEBUG] Determined role:", updatedRole);
    }

    // Prepare update payload
    const updatePayload: Partial<ProfileModel> = {
        ...profileData,
        ...(updatedRole && { role: updatedRole }) // Conditionally add role if determined
    };
    console.log("[DEBUG] Update payload prepared:", updatePayload);

    try {
        console.log("[DEBUG] Updating record in the 'profiles' table...");
        // Update record in the 'profiles' table
        const updatedProfile = await updateRecord('profiles', profileData.id, updatePayload);
        
        // if (!updatedProfile) {
        //     console.error("[ERROR] Failed to update profile for ID:", profileData.id);
        //     return null;
        // }

        console.log("[DEBUG] Profile updated successfully:", updatedProfile);
        // return updatedProfile as ProfileModel;
    } catch (error) {
        console.error("[ERROR] Exception while updating user profile:", error);
        // return null;
    }
};
