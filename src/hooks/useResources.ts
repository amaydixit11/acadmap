import { useState, useEffect } from 'react';
import { ResourceModel } from '@/types/courses';
import { fetchResourceModels } from '@/lib/resources';

export function useResources(courseCode: string, resourceType: string) {
  const [resources, setResources] = useState<ResourceModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchResources() {
      setIsLoading(true);
      try {
        const { resources } = await fetchResourceModels({
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