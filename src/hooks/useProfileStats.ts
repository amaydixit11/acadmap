"use client";

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { ProfileStats } from '@/models/profile';

interface UseProfileStatsReturn {
  stats: ProfileStats;
  isLoading: boolean;
  refreshStats: () => Promise<void>;
}

export function useProfileStats(userId: string | undefined): UseProfileStatsReturn {
  const [stats, setStats] = useState<ProfileStats>({
    uploads_count: 0,
    upvotes_received: 0,
    bookmarks_count: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const refreshStats = useCallback(async () => {
    if (!userId) {
      setStats({ uploads_count: 0, upvotes_received: 0, bookmarks_count: 0 });
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      // Get uploads count (resources uploaded by this user)
      const { count: uploadsCount, error: uploadsError } = await supabase
        .from('resources')
        .select('*', { count: 'exact', head: true })
        .eq('uploadedBy', userId);

      // Get upvotes received (upvotes on resources this user uploaded)
      // First get resource IDs for this user
      const { data: userResources } = await supabase
        .from('resources')
        .select('resourceId')
        .eq('uploadedBy', userId);

      let upvotesReceived = 0;
      if (userResources && userResources.length > 0) {
        const resourceIds = userResources.map(r => r.resourceId);
        const { count: upvotesCount } = await supabase
          .from('resource_upvotes')
          .select('*', { count: 'exact', head: true })
          .in('resource_id', resourceIds);
        
        upvotesReceived = upvotesCount || 0;
      }

      // Get bookmarks count for this user
      const { count: bookmarksCount, error: bookmarksError } = await supabase
        .from('bookmarks')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      setStats({
        uploads_count: uploadsCount || 0,
        upvotes_received: upvotesReceived,
        bookmarks_count: bookmarksCount || 0,
      });
    } catch (error) {
      console.error('Error fetching profile stats:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  return { stats, isLoading, refreshStats };
}
