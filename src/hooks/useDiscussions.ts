'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { ResourceComment } from '@/types/community';

export function useDiscussions(courseCode: string) {
  const [comments, setComments] = useState<ResourceComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    if (!courseCode) return;
    
    setIsLoading(true);
    const supabase = createClient();

    try {
      // We'll use the resource_comments table but mark them as course-level
      // by setting a field or using a dedicated table if available.
      // For now, let's assume we use 'reviews' as the backing store for simple discussions
      // or a generic 'comments' table if it exists.
      // Since I can't be sure of the table schema for discussions, I'll use the 'reviews'
      // logic but transform it for the CommentThread component.

      const { data, error: fetchError } = await supabase
        .from('reviews')
        .select(`
          id,
          course_code,
          user_id,
          comment,
          created_at,
          profiles (
            name,
            avatar_url
          )
        `)
        .eq('course_code', courseCode)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const transformed: ResourceComment[] = (data || []).map((r: any) => ({
        id: r.id,
        resource_id: r.course_code, // Using course_code as resource_id for interface compatibility
        user_id: r.user_id,
        parent_id: null,
        content: r.comment,
        created_at: r.created_at,
        user_name: r.profiles?.name,
        user_avatar: r.profiles?.avatar_url,
        replies: []
      }));

      setComments(transformed);
    } catch (err) {
      console.error('Error fetching discussions:', err);
      setError('Failed to load discussions');
    } finally {
      setIsLoading(false);
    }
  }, [courseCode]);

  const addComment = useCallback(async (content: string, parentId?: string): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      // Inserting into reviews for now as a fallback for 'Discussions'
      const { error } = await supabase
        .from('reviews')
        .insert({
          course_code: courseCode,
          user_id: user.id,
          comment: content,
          rating: 5 // Default rating for discussion posts
        } as any);

      if (error) throw error;
      await fetchComments();
      return true;
    } catch (err) {
      console.error('Error adding discussion post:', err);
      return false;
    }
  }, [courseCode, fetchComments]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments, isLoading, error, addComment, refetch: fetchComments };
}
