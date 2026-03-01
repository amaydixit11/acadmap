'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

const sizeMap = {
  sm: 'w-3 h-3',
  md: 'w-5 h-5',
  lg: 'w-7 h-7',
};

export function StarRating({
  rating,
  max = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  className,
}: StarRatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  const sizeClass = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRatingChange?.(star)}
          className={cn(
            "transition-transform",
            interactive && "hover:scale-110 cursor-pointer",
            !interactive && "cursor-default"
          )}
        >
          <Star
            className={cn(
              sizeClass,
              "transition-colors",
              star <= rating
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-300 dark:fill-gray-700 dark:text-gray-600"
            )}
          />
        </button>
      ))}
    </div>
  );
}

interface RatingDisplayProps {
  average: number;
  count: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export function RatingDisplay({ average, count, size = 'md', showCount = true }: RatingDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <StarRating rating={Math.round(average)} size={size} />
      <span className="font-semibold text-gray-900 dark:text-white">
        {average.toFixed(1)}
      </span>
      {showCount && (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({count} {count === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
}
