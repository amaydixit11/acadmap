import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

interface CourseReviewModalProps {
  onClose: () => void;
  onSubmit: (rating: number, review: string) => void;
}

export function CourseReviewModal({ onClose, onSubmit }: CourseReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [session, setSession] = useState<any>(null);
  const supabase = createClient();
  useEffect(() => {
    // Get the current session on mount
    const currentSession = supabase.auth.getSession();
    setSession(currentSession);

    // Listen to auth state changes (in case the session updates)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => setSession(session)
    );

    return () => {
      // Clean up the auth listener
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Function to handle the sign-in action
  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google', // or 'github', 'twitter', etc. based on your configuration
    });

    if (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const handleSubmit = () => {
    if (rating > 0 && review.trim()) {
      onSubmit(rating, review);
      onClose();
    }
  };

  if (!session) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 text-center">
          <p>Please sign in to write a review</p>
          <Button onClick={handleSignIn} className="mt-4">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl max-w-md w-full p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Star className="mr-2 text-yellow-500" /> Write Your Review
        </h3>
        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl transition-colors ${
                  star <= rating ? 'text-yellow-500' : 'text-gray-300'
                }`}
              >
                <Star />
              </button>
            ))}
          </div>
          <textarea
            className="w-full p-4 border rounded-xl min-h-[120px]"
            placeholder="Share your course experience..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={rating === 0 || !review.trim()}
              className="flex-1"
            >
              Submit Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
