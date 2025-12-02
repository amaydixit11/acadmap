import { useState, useEffect, useMemo } from 'react';
import { ResourceModel } from '@/types/courses';
import { fetchResourceModels, getUploaderNames } from '@/lib/resources';

export function useResources(courseCode?: string, resourceType?: string) {
  const [resources, setResources] = useState<ResourceModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchResources() {
      setIsLoading(true);
      try {
        const { resources } = await fetchResourceModels({
          courseCode,
          resourceCategory: resourceType,
        });
  
        if (resources.length > 0) {
          const resourceIds = resources.map(r => r.resourceId);
          const uploaderMap = await getUploaderNames(resourceIds);
  
          const resolvedResources = resources.map(resource => ({
            ...resource,
            uploadedBy: uploaderMap.get(resource.resourceId) || 'Anonymous',
          }));
          
          setResources(resolvedResources);
        } else {
          setResources([]);
        }

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    }
  
    fetchResources();
  }, [courseCode, resourceType]);
  

  const uniqueContributors = useMemo(
    () => new Set(resources.map(resource => resource.uploadedBy)),
    [resources]
  );
  console.log(uniqueContributors)

  return { resources, isLoading, error, uniqueContributors};
}