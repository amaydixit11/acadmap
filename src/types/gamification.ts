
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  category: 'contribution' | 'engagement' | 'achievement';
  received_at?: string; // If user has it
}

export interface UserBadge {
  user_id: string;
  badge_id: string;
  awarded_at: string;
}

export type BadgeCategory = Badge['category'];
