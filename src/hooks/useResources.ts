import { useState, useEffect, useMemo } from 'react';
import { ResourceModel } from '@/types/courses';
import { fetchResourceModels, getUploaderNames } from '@/lib/resources';

export interface ResourceFiltersInput {
  year?: number;
  category?: string;
  type?: string;
}

export function useResources(
  courseCode?: string, 
  resourceType?: string,
  filters?: ResourceFiltersInput
) {
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

  // Apply client-side filters
  const filteredResources = useMemo(() => {
    let result = resources;

    if (filters?.year) {
      result = result.filter(r => r.year === filters.year);
    }

    if (filters?.category) {
      result = result.filter(r => 
        r.category?.toLowerCase() === filters.category?.toLowerCase()
      );
    }

    if (filters?.type) {
      const ext = filters.type.toLowerCase();
      result = result.filter(r => {
        const fileName = r.title?.toLowerCase() || '';
        if (ext === 'pdf') return fileName.endsWith('.pdf');
        if (ext === 'doc') return fileName.endsWith('.doc') || fileName.endsWith('.docx');
        if (ext === 'ppt') return fileName.endsWith('.ppt') || fileName.endsWith('.pptx');
        if (ext === 'image') return /\.(jpg|jpeg|png|gif|webp)$/.test(fileName);
        return true;
      });
    }

    return result;
  }, [resources, filters?.year, filters?.category, filters?.type]);

  const uniqueContributors = useMemo(
    () => new Set(filteredResources.map(resource => resource.uploadedBy)),
    [filteredResources]
  );

  // Get unique years and categories for filter dropdowns
  const availableYears = useMemo(() => 
    [...new Set(resources.map(r => r.year).filter(Boolean))].sort((a, b) => (b || 0) - (a || 0)),
    [resources]
  );

  const availableCategories = useMemo(() => 
    [...new Set(resources.map(r => r.category).filter(Boolean))],
    [resources]
  );

  return { 
    resources: filteredResources, 
    allResources: resources,
    isLoading, 
    error, 
    uniqueContributors,
    availableYears,
    availableCategories,
  };
}
