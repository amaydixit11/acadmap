export interface ResourceRequest {
  id: string;
  title: string;
  description: string;
  course_code?: string;
  user_id: string;
  upvotes: number;
  status: 'open' | 'fulfilled' | 'closed';
  fulfilled_resource_url?: string;
  fulfilled_resource_title?: string;
  fulfilled_at?: string;
  created_at: string;
  user_name?: string;
  user_avatar?: string;
  has_upvoted?: boolean;
}

export interface RequestComment {
  id: string;
  request_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user_name?: string;
  user_avatar?: string;
}

export interface ResourceComment {
  id: string;
  resource_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  created_at: string;
  updated_at?: string;
  user_name?: string;
  user_avatar?: string;
  replies?: ResourceComment[];
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  course_code?: string;
  created_by: string;
  is_public: boolean;
  member_count: number;
  invite_code?: string;
  created_at: string;
}

export interface StudyGroupMember {
  group_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  joined_at: string;
  user_name?: string;
  user_avatar?: string;
}

export interface GroupMessage {
  id: string;
  group_id: string;
  user_id: string;
  content: string;
  is_pinned?: boolean;
  created_at: string;
  user_name?: string;
  user_avatar?: string;
}

export interface GroupResource {
  id: string;
  group_id: string;
  user_id: string;
  title: string;
  url: string;
  description?: string;
  created_at: string;
  user_name?: string;
  user_avatar?: string;
}

export interface StudySession {
  id: string;
  group_id: string;
  user_id: string;
  title: string;
  description?: string;
  scheduled_at: string;
  duration_minutes: number;
  location?: string;
  meeting_link?: string;
  created_at: string;
  user_name?: string;
  user_avatar?: string;
}
