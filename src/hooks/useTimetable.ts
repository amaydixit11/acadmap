import { useState, useEffect, useCallback } from 'react';
import { TimeTableParsedCourse } from '@/types/time-table';
import { parseCSV } from '@/lib/time-table';

export function useTimetable() {
  const [courses, setCourses] = useState<TimeTableParsedCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTimetable = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/file.csv");
      if (!response.ok) {
        throw new Error(`Failed to fetch timetable: ${response.statusText}`);
      }
      const csvText = await response.text();
      const parsedCourses = await parseCSV(csvText);
      setCourses(parsedCourses);
    } catch (err) {
      console.error('Timetable fetch error:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTimetable();
  }, [fetchTimetable]);

  return { courses, isLoading, error, refetch: fetchTimetable };
}
