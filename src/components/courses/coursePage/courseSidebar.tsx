"use client"

import { useState, useEffect } from "react";
import { Users, Star, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseRatingBar } from "./courseRatingbar";
import { CourseReviewModal } from "./courseReviewModal";
import { Course } from "@/models/courses";
import { createClient } from "@/utils/supabase/client";

interface CourseSidebarProps {
  course: Course;
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [session, setSession] = useState<any>(null); // Supabase session state
  const supabase = createClient();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session);
    };

    fetchSession();

    // Optional: Subscribe to session changes
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleReviewSubmit = async (rating: number, reviewText: string) => {
    if (!session?.user.id) {
      console.error("User is not logged in.");
      return;
    }

    try {
      // Insert review into Supabase
      const { data, error } = await supabase
        .from("course_reviews") // Assuming your table name is course_reviews
        .insert([
          {
            course_id: course.id,
            user_id: session.user.id,
            rating,
            review: reviewText,
            created_at: new Date(),
          },
        ]);

      if (error) {
        throw error;
      }

      // Optionally update local state or trigger a refresh (e.g., fetching reviews again)
      console.log("Review submitted successfully:", data);
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <Card className="shadow-lg border-gray-100 sticky top-20">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center text-gray-800">
              <Users className="mr-2 text-primary" /> Course Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Prerequisites Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <CheckCircle className="mr-2 text-green-500" /> Prerequisites
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                
                  <li >{course.prerequisites}</li>
                
              </ul>
            </div>

            {/* Course Ratings Section */}
            {course.rating && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Star className="mr-2 text-yellow-500" /> Course Ratings
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Overall Rating", value: course.rating.overall },
                    { label: "Course Difficulty", value: course.rating.difficulty },
                    { label: "Weekly Workload", value: course.rating.workload }
                  ].map(({ label, value }) => (
                    <CourseRatingBar key={label} label={label} value={value} />
                  ))}
                  <div className="pt-4 mt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Student Reviews</span>
                      <Badge variant="secondary">{course.rating.reviews}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <Users className="mr-2 h-5 w-5" /> Join Study Group
              </Button>
              {session && (
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  <Star className="mr-2 h-5 w-5" /> Write a Review
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {isReviewModalOpen && (
        <CourseReviewModal
          onClose={() => setIsReviewModalOpen(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </>
  );
}
