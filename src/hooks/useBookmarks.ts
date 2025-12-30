"use client";

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { ResourceModel } from '@/models/resources';

interface Bookmark {
  id: string;
  resource_id: string;
  created_at: string;
}

interface UseBookmarksReturn {
  bookmarks: Bookmark[];
  bookmarkedIds: Set<string>;
  isLoading: boolean;
  isBookmarked: (resourceId: string) => boolean;
  toggleBookmark: (resourceId: string) => Promise<void>;
  refreshBookmarks: () => Promise<void>;
}

export function useBookmarks(): UseBookmarksReturn {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const refreshBookmarks = useCallback(async () => {
    if (!user?.id) {
      setBookmarks([]);
      setBookmarkedIds(new Set());
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('id, resource_id, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setBookmarks(data);
        setBookmarkedIds(new Set(data.map(b => b.resource_id)));
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    refreshBookmarks();
  }, [refreshBookmarks]);

  const isBookmarked = useCallback((resourceId: string) => {
    return bookmarkedIds.has(resourceId);
  }, [bookmarkedIds]);

  const toggleBookmark = useCallback(async (resourceId: string) => {
    if (!user?.id || !resourceId || isLoading) return;

    const supabase = createClient();
    const isCurrentlyBookmarked = bookmarkedIds.has(resourceId);

    try {
      if (isCurrentlyBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('resource_id', resourceId)
          .eq('user_id', user.id);

        if (!error) {
          setBookmarkedIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(resourceId);
            return newSet;
          });
          setBookmarks(prev => prev.filter(b => b.resource_id !== resourceId));
        }
      } else {
        // Add bookmark
        const { data, error } = await supabase
          .from('bookmarks')
          .insert({ resource_id: resourceId, user_id: user.id })
          .select('id, resource_id, created_at')
          .single();

        if (!error && data) {
          setBookmarkedIds(prev => new Set(prev).add(resourceId));
          setBookmarks(prev => [data, ...prev]);
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  }, [user?.id, bookmarkedIds, isLoading]);

  return {
    bookmarks,
    bookmarkedIds,
    isLoading,
    isBookmarked,
    toggleBookmark,
    refreshBookmarks,
  };
}

// Single resource bookmark check hook
export function useIsBookmarked(resourceId: string): { isBookmarked: boolean; isLoading: boolean; toggle: () => Promise<void> } {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkBookmark = async () => {
      if (!user?.id || !resourceId) return;
      
      const supabase = createClient();
      const { data, error } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('resource_id', resourceId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (!error) {
        setIsBookmarked(!!data);
      }
    };

    checkBookmark();
  }, [user?.id, resourceId]);

  const toggle = useCallback(async () => {
    console.log('[Bookmark] Attempting toggle:', { resourceId, userId: user?.id, isBookmarked, isLoading });
    
    if (!user?.id || !resourceId || isLoading) {
      console.log('[Bookmark] Toggle blocked:', { hasUser: !!user?.id, hasResourceId: !!resourceId, isLoading });
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      if (isBookmarked) {
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('resource_id', resourceId)
          .eq('user_id', user.id);

        if (!error) setIsBookmarked(false);
      } else {
        const { error } = await supabase
          .from('bookmarks')
          .insert({ resource_id: resourceId, user_id: user.id });

        if (!error) {
          console.log('[Bookmark] Added successfully');
          setIsBookmarked(true);
        } else {
          console.error('[Bookmark] Error adding:', error);
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, resourceId, isBookmarked, isLoading]);

  return { isBookmarked, isLoading, toggle };
}

// Batch check bookmarks for a list of resource IDs
export async function getUserBookmarks(userId: string, resourceIds: string[]): Promise<Set<string>> {
  if (!userId || resourceIds.length === 0) return new Set();
  
  const supabase = createClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .select('resource_id')
    .eq('user_id', userId)
    .in('resource_id', resourceIds);

  if (error) {
    console.error('Error fetching user bookmarks:', error);
    return new Set();
  }

  return new Set(data?.map(item => item.resource_id) || []);
}
