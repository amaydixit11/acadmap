import { fetchCourses } from "@/lib/courses";
import { Course } from "@/types/courses";
import { transformCourse } from "@/utils/transform";
import { useEffect, useState, useCallback } from "react";

interface CoursesState {
  courses: Course[];
  isLoading: boolean;
  error: Error | null;
}

export const useCourses = () => {
  const [state, setState] = useState<CoursesState>({
    courses: [],
    isLoading: true,
    error: null,
  });

  // Memoized fetch function with error handling
  const fetchCoursesData = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const data = await fetchCourses();
      const transformedCourses = data
        .map(transformCourse)
        .sort((a, b) => 
          a.id.slice(3).localeCompare(b.id.slice(3), undefined, { numeric: true })
        );

      setState({
        courses: transformedCourses,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        courses: [],
        isLoading: false,
        error: error instanceof Error ? error : new Error('An unknown error occurred'),
      });
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchCoursesData();
  }, [fetchCoursesData]);

  // Expose method to manually refetch courses
  const refetch = useCallback(() => {
    fetchCoursesData();
  }, [fetchCoursesData]);

  return {
    ...state,
    refetch,
  };
};