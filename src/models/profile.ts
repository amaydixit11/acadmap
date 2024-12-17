export interface ProfileModel {
    id: string; 
    email: string; 
    name: string; 
    role: 'student' | 'external' | 'alumni'; 
    batch?: string; 
    mobile?: string; 
    department?: string; 
    profileImage?: string; 
    bio?: string; 
    linkedinUrl?: string; 
  }
  