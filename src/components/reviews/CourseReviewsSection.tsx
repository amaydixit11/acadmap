'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useReviews } from '@/hooks/useReviews';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';
import { RatingDisplay } from './StarRating';
import { MessageSquare, PenLine } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CourseReviewsSectionProps {
  courseCode: string;
  className?: string;
}

export function CourseReviewsSection({ courseCode, className }: CourseReviewsSectionProps) {
  const { reviews, stats, isLoading, submitReview } = useReviews(courseCode);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (rating: number, comment: string) => {
    setIsSubmitting(true);
    const success = await submitReview(rating, comment);
    setIsSubmitting(false);
    if (success) {
      setShowForm(false);
    }
    return success;
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Reviews
        </CardTitle>
        {stats && (
          <RatingDisplay 
            average={stats.average_rating} 
            count={stats.total_reviews}
            size="md"
          />
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {!showForm ? (
          <Button
            variant="outline"
            onClick={() => setShowForm(true)}
            className="w-full"
          >
            <PenLine className="w-4 h-4 mr-2" />
            Write a Review
          </Button>
        ) : (
          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <PenLine className="w-4 h-4" />
              Write Your Review
            </h4>
            <ReviewForm onSubmit={handleSubmit} isLoading={isSubmitting} />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowForm(false)}
              className="mt-2"
            >
              Cancel
            </Button>
          </div>
        )}
        
        <ReviewList reviews={reviews} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
