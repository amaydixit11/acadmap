'use client';

import { useState, useEffect, useCallback } from 'react';
import { Badge } from '@/types/gamification';
import { getUserBadges, checkAndAwardBadges } from '@/lib/gamification';
import { createClient } from '@/utils/supabase/client';

export function useBadges(userId: string | null) {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBadges = useCallback(async () => {
    if (!userId) {
      setBadges([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userBadges = await getUserBadges(userId);
      setBadges(userBadges);
    } catch (err) {
      console.error('Error fetching badges:', err);
      setError('Failed to load badges');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Check and award new badges
  const checkBadges = useCallback(async () => {
    if (!userId) return [];
    
    try {
      const newBadges = await checkAndAwardBadges(userId);
      if (newBadges.length > 0) {
        // Refresh badges list
        await fetchBadges();
      }
      return newBadges;
    } catch (err) {
      console.error('Error checking badges:', err);
      return [];
    }
  }, [userId, fetchBadges]);

  useEffect(() => {
    fetchBadges();
  }, [fetchBadges]);

  return {
    badges,
    isLoading,
    error,
    refetch: fetchBadges,
    checkBadges,
  };
}

// Hook to get current user's badges
export function useCurrentUserBadges() {
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id || null);
    });
  }, []);
  
  return useBadges(userId);
}
