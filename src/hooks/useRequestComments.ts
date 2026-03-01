'use client';

import { useState, useEffect, useCallback } from 'react';
import { RequestComment } from '@/types/community';
import { createClient } from '@/utils/supabase/client';

export function useRequestComments(requestId: string) {
  const [comments, setComments] = useState<RequestComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    if (!requestId) return;
    
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error: fetchError } = await supabase
        .from('request_comments')
        .select('*')
        .eq('request_id', requestId)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;

      // Fetch profiles separately
      const userIds = [...new Set((data || []).map((c: any) => c.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .in('id', userIds);
      
      const profileMap = new Map((profiles || []).map((p: any) => [p.id, p]));

      const transformedComments: RequestComment[] = (data || []).map((c: any) => {
        const profile = profileMap.get(c.user_id);
        return {
          id: c.id,
          request_id: c.request_id,
          user_id: c.user_id,
          content: c.content,
          created_at: c.created_at,
          user_name: profile?.name || 'Anonymous',
          user_avatar: profile?.avatar_url,
        };
      });

      setComments(transformedComments);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  }, [requestId]);

  const addComment = useCallback(async (content: string): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in');
        return false;
      }

      const { error: insertError } = await supabase
        .from('request_comments')
        .insert({
          request_id: requestId,
          user_id: user.id,
          content,
        } as any);

      if (insertError) throw insertError;

      await fetchComments();
      return true;
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment');
      return false;
    }
  }, [requestId, fetchComments]);

  const deleteComment = useCallback(async (commentId: string): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { error: deleteError } = await supabase
        .from('request_comments')
        .delete()
        .eq('id', commentId);

      if (deleteError) throw deleteError;

      await fetchComments();
      return true;
    } catch (err) {
      console.error('Error deleting comment:', err);
      return false;
    }
  }, [fetchComments]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return {
    comments,
    isLoading,
    error,
    addComment,
    deleteComment,
    refetch: fetchComments,
  };
}
