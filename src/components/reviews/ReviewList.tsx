'use client';

import { CourseReview } from '@/types/reviews';
import { StarRating } from './StarRating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';

interface ReviewListProps {
  reviews: CourseReview[];
  isLoading?: boolean;
  className?: string;
}

export function ReviewList({ reviews, isLoading = false, className }: ReviewListProps) {
  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-lg border bg-gray-50 dark:bg-gray-800/50 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-2">
                <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center py-12 text-center",
        "bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-dashed",
        className
      )}>
        <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-600 dark:text-gray-400 font-medium">No reviews yet</p>
        <p className="text-sm text-gray-500 dark:text-gray-500">Be the first to review this course!</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="p-4 rounded-lg border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start gap-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={review.user_avatar || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {review.user_name?.charAt(0)?.toUpperCase() || '?'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {review.user_name || 'Anonymous'}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              <StarRating rating={review.rating} size="sm" />
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
}
