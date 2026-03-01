export interface ResourceModel { 
    resourceId: string;
    course_code: string;
    title: string;
    type: 'document' | 'video' | 'image' | 'archive' | 'link' | 'other';
    category: 'lecture' | 'tutorial' | 'assignment' | 'pyq' | 'lab' | 'unclassified'
    url: string;
    uploadedBy: string;
    description?: string;
    year: number;
    git_url?: string;
    upvotes_count?: number;
    is_upvoted?: boolean;
    is_bookmarked?: boolean;
  }

// Saved timetable configuration
export interface SavedTimetable {
    id: string;
    user_id: string;
    name: string;
    config: TimetableConfig;
    is_default: boolean;
    created_at: string;
    updated_at: string;
  }

export interface TimetableConfig {
    course_codes: string[];
    overrides?: Record<string, unknown>;
  } 