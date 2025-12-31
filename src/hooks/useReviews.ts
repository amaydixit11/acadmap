'use client';

import { useState, useEffect, useCallback } from 'react';
import { CourseReview, ReviewStats } from '@/types/reviews';
import { createClient } from '@/utils/supabase/client';

export function useReviews(courseCode: string) {
  const [reviews, setReviews] = useState<CourseReview[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    if (!courseCode) return;
    
    setIsLoading(true);
    setError(null);
    const supabase = createClient();

    try {
      // Fetch reviews with user info
      const { data, error: fetchError } = await supabase
        .from('reviews')
        .select(`
          id,
          course_code,
          user_id,
          rating,
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

      const transformedReviews: CourseReview[] = (data || []).map((r: any) => ({
        id: r.id,
        course_code: r.course_code,
        user_id: r.user_id,
        rating: r.rating,
        comment: r.comment,
        created_at: r.created_at,
        user_name: r.profiles?.name,
        user_avatar: r.profiles?.avatar_url,
      }));

      setReviews(transformedReviews);

      // Calculate stats
      if (transformedReviews.length > 0) {
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        let total = 0;
        
        transformedReviews.forEach((r) => {
          distribution[r.rating as keyof typeof distribution]++;
          total += r.rating;
        });

        setStats({
          average_rating: total / transformedReviews.length,
          total_reviews: transformedReviews.length,
          rating_distribution: distribution,
        });
      } else {
        setStats(null);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  }, [courseCode]);

  const submitReview = useCallback(async (rating: number, comment: string): Promise<boolean> => {
    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in to submit a review');
        return false;
      }

      // Check if user already reviewed this course
      const { data: existing } = await supabase
        .from('reviews')
        .select('id')
        .eq('course_code', courseCode)
        .eq('user_id', user.id)
        .single();

      if (existing) {
        // Update existing review
        const { error: updateError } = await supabase
          .from('reviews')
          .update({ rating, comment, created_at: new Date().toISOString() } as any)
          .eq('id', existing.id);

        if (updateError) throw updateError;
      } else {
        // Create new review
        const { error: insertError } = await supabase
          .from('reviews')
          .insert({
            course_code: courseCode,
            user_id: user.id,
            rating,
            comment,
          } as any);

        if (insertError) throw insertError;
      }

      // Refresh reviews
      await fetchReviews();
      return true;
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review');
      return false;
    }
  }, [courseCode, fetchReviews]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    stats,
    isLoading,
    error,
    refetch: fetchReviews,
    submitReview,
  };
}
