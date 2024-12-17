export interface ProfileModel {
    id: string; 
    email: string; 
    name: string; 
    role: 'student' | 'external' | 'alumni'; 
    batch?: string; 
    mobile?: string; 
    department?: string; 
    profile_image?: string; 
    bio?: string; 
    linkedin_url?: string; 
  }
  