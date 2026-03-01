import { createClient } from '@/utils/supabase/client';
import { Badge, UserBadge } from '@/types/gamification';

// Default badges that should exist in the system
export const DEFAULT_BADGES: Omit<Badge, 'received_at'>[] = [
  {
    id: 'first_login',
    name: 'New Explorer',
    description: 'Signed in to AcadMap for the first time',
    icon_name: 'Compass',
    category: 'achievement',
  },
  {
    id: 'first_upload',
    name: 'Contributor',
    description: 'Uploaded your first resource',
    icon_name: 'Upload',
    category: 'contribution',
  },
  {
    id: 'pro_contributor',
    name: 'Scholar',
    description: 'Uploaded 10+ resources',
    icon_name: 'BookOpen',
    category: 'contribution',
  },
  {
    id: 'helper',
    name: 'Helpful Hand',
    description: 'Received 50+ upvotes on your resources',
    icon_name: 'Heart',
    category: 'engagement',
  },
  {
    id: 'collector',
    name: 'Librarian',
    description: 'Bookmarked 20+ resources',
    icon_name: 'Bookmark',
    category: 'engagement',
  },
  {
    id: 'rising_star',
    name: 'Rising Star',
    description: 'Received 10+ upvotes on a single resource',
    icon_name: 'Star',
    category: 'achievement',
  },
  {
    id: 'early_adopter',
    name: 'Early Adopter',
    description: 'One of the first 100 users to join AcadMap',
    icon_name: 'Zap',
    category: 'achievement',
  },
  {
    id: 'top_contributor',
    name: 'Top Contributor',
    description: 'Ranked in the top 10 contributors',
    icon_name: 'Crown',
    category: 'contribution',
  },
];

/**
 * Get all badges for a user
 */
export async function getUserBadges(userId: string): Promise<Badge[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('user_badges')
    .select(`
      badge_id,
      awarded_at,
      badges (
        id,
        name,
        description,
        icon_name,
        category
      )
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user badges:', error);
    return [];
  }

  // Transform the data to match our Badge type
  return (data || []).map((item: any) => ({
    ...item.badges,
    received_at: item.awarded_at,
  }));
}

/**
 * Award a badge to a user (if they don't already have it)
 */
export async function awardBadge(userId: string, badgeId: string): Promise<boolean> {
  const supabase = createClient();
  
  // Check if user already has this badge
  const { data: existing } = await supabase
    .from('user_badges')
    .select('id')
    .eq('user_id', userId)
    .eq('badge_id', badgeId)
    .single();
  
  if (existing) {
    return false; // Already has badge
  }
  
  // Award the badge
  const { error } = await supabase
    .from('user_badges')
    .insert({ user_id: userId, badge_id: badgeId } as any);
  
  if (error) {
    console.error('Error awarding badge:', error);
    return false;
  }
  
  return true;
}

/**
 * Check and award badges based on user stats
 * Call this after relevant actions (upload, upvote, etc.)
 */
export async function checkAndAwardBadges(userId: string): Promise<string[]> {
  const supabase = createClient();
  const awardedBadges: string[] = [];
  
  // Get user stats
  const { data: profile } = await supabase
    .from('profiles')
    .select('created_at')
    .eq('id', userId)
    .single();
    
  // Check for first_login badge (always award on first check)
  if (await awardBadge(userId, 'first_login')) {
    awardedBadges.push('first_login');
  }
  
  // Get upload count (would need resource_uploads table or similar)
  // For now, we'll use a simplified approach
  
  // Get bookmark count
  const { count: bookmarkCount } = await supabase
    .from('bookmarks')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);
  
  if (bookmarkCount && bookmarkCount >= 20) {
    if (await awardBadge(userId, 'collector')) {
      awardedBadges.push('collector');
    }
  }
  
  // Get upvotes received (simplified - would need aggregation)
  const { count: upvoteCount } = await supabase
    .from('resource_upvotes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);
    
  if (upvoteCount && upvoteCount >= 50) {
    if (await awardBadge(userId, 'helper')) {
      awardedBadges.push('helper');
    }
  }
  
  return awardedBadges;
}
