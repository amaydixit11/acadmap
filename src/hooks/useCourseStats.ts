import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useCourseStats(courseCode: string) {
  const [stats, setStats] = useState({
    studentCount: 0,
    isLoading: true,
  });

  const supabase = createClient();

  useEffect(() => {
    async function fetchCourseStats() {
      try {
        // Count profiles where courseCode is in selected_courses array
        const { count, error } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .contains('selected_courses', [courseCode]);

        if (error) throw error;

        setStats({
          studentCount: count || 0,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error fetching course stats:', error);
        setStats({ studentCount: 0, isLoading: false });
      }
    }

    if (courseCode) {
      fetchCourseStats();
    }
  }, [courseCode]);

  return stats;
}
