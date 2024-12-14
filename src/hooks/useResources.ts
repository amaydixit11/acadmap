import { useState, useEffect } from 'react';
import { CourseResource } from '@/types/courses';
import { fetchCourseResources } from '@/lib/resources';

export function useResources(courseCode: string, resourceType: string) {
  const [resources, setResources] = useState<CourseResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchResources() {
      setIsLoading(true);
      try {
        const { resources } = await fetchCourseResources({
          courseCode,
          resourceCategory: resourceType
        });
        setResources(resources);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch resources'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchResources();
  }, [courseCode, resourceType]);

  return { resources, isLoading, error };
}