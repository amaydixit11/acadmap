'use client';

import { useState, useEffect, useCallback } from 'react';
import { ResourceComment } from '@/types/community';
import { createClient } from '@/utils/supabase/client';

export function useResourceComments(resourceId: string) {
  const [comments, setComments] = useState<ResourceComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    if (!resourceId) return;
    
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error: fetchError } = await supabase
        .from('resource_comments')
        .select(`
          id,
          resource_id,
          user_id,
          parent_id,
          content,
          created_at,
          updated_at,
          profiles (
            name,
            avatar_url
          )
        `)
        .eq('resource_id', resourceId)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;

      // Transform flat list into threaded structure
      const flatComments: ResourceComment[] = (data || []).map((c: any) => ({
        id: c.id,
        resource_id: c.resource_id,
        user_id: c.user_id,
        parent_id: c.parent_id,
        content: c.content,
        created_at: c.created_at,
        updated_at: c.updated_at,
        user_name: c.profiles?.name,
        user_avatar: c.profiles?.avatar_url,
        replies: [],
      }));

      // Build tree structure
      const commentMap = new Map<string, ResourceComment>();
      const rootComments: ResourceComment[] = [];

      flatComments.forEach(comment => {
        commentMap.set(comment.id, comment);
      });

      flatComments.forEach(comment => {
        if (comment.parent_id) {
          const parent = commentMap.get(comment.parent_id);
          if (parent) {
            parent.replies = parent.replies || [];
            parent.replies.push(comment);
          }
        } else {
          rootComments.push(comment);
        }
      });

      setComments(rootComments);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  }, [resourceId]);

  const addComment = useCallback(async (content: string, parentId?: string): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in to comment');
        return false;
      }

      const { error: insertError } = await supabase
        .from('resource_comments')
        .insert({
          resource_id: resourceId,
          user_id: user.id,
          parent_id: parentId || null,
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
  }, [resourceId, fetchComments]);

  const deleteComment = useCallback(async (commentId: string): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { error: deleteError } = await supabase
        .from('resource_comments')
        .delete()
        .eq('id', commentId);

      if (deleteError) throw deleteError;

      await fetchComments();
      return true;
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Failed to delete comment');
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
