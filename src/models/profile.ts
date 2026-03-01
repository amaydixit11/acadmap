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
    program?: 'BTech' | 'MSc' | 'MTech' | 'PhD';
    selected_courses?: string[];
    completed_courses?: string[];
  }
  