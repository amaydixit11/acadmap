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
    github_url?: string;
    created_at?: string;
    updated_at?: string;
  }

// Stats interface for profile dashboard
export interface ProfileStats {
    uploads_count: number;
    upvotes_received: number;
    bookmarks_count: number;
  }
  