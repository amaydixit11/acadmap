export interface CourseReview {
  id: string;
  course_code: string;
  user_id: string;
  rating: number; // 1-5
  comment: string;
  created_at: string;
  // Joined fields
  user_name?: string;
  user_avatar?: string;
}

export interface ReviewStats {
  average_rating: number;
  total_reviews: number;
  rating_distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}
