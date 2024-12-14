import { Course } from "@/types/courses";
import { User } from "@supabase/supabase-js";
import { NoResources } from "./NoResources";
import { useResourceFilters } from "@/hooks/useResourcesFilters";
import { useResources } from "@/hooks/useResources";
import { ResourceFilters } from "./ResourcesFilters";
import ResourceCard from "./resourceCard";
import UploadResourcesButton from "./UploadResourcesButton";
import { uploadResource } from "@/lib/resources";

const RESOURCE_TYPES = [
  { value: "all", label: "All" },
  { value: "lectures", label: "Lectures" },
  { value: "assignments", label: "Assignments" },
  { value: "tutorials", label: "Tutorials" },
  { value: "pyq", label: "Past Year Questions" },
  { value: "unclassified", label: "Unclassified" }
];

interface ResourceSectionProps {
  course: Course;
  user?: User | null;
}

export function ResourceSection({ course, user }: ResourceSectionProps) {
  
  const { filters, setResourceType, setYear, setSortOrder } = useResourceFilters();
  const { resources, isLoading, error } = useResources(course.code, filters.selectedResourceType);

  const filteredAndSortedResources = resources
    .filter(r => 
      (filters.selectedResourceType === 'all' ? r : r.category === filters.selectedResourceType) && 
      (!filters.selectedYear || r.year === Number(filters.selectedYear))
    )
    .sort((a, b) => {
      const order = filters.sortOrder === "desc" ? -1 : 1;
      return order * ((a.year || 0) - (b.year || 0));
    });

  const availableYears = [...new Set(
    resources
      .filter(r => r.category === filters.selectedResourceType)
      .map(r => r.year)
      .filter(Boolean)
  )].sort((a, b) => filters.sortOrder === "desc" ? b - a : a - b);

  if (error) {
    return <div>Error loading resources: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading resources...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
        <ResourceFilters
          filters={filters}
          onTypeChange={setResourceType}
          onYearChange={setYear}
          onSortChange={setSortOrder}
          availableYears={availableYears}
          resourceTypes={RESOURCE_TYPES}
        />

        {user && (
            <UploadResourcesButton
              onClick={() => uploadResource({
                resourceType: filters.selectedResourceType, 
                courseCode: course.code, 
                year: filters.selectedYear ?? new Date().getFullYear().toString(),
              })}
              text={`Upload Resources`}
            />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredAndSortedResources.length > 0 ? (
          filteredAndSortedResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
          <NoResources
            courseCode={course.code}
            user={user}
            selectedResourceType={filters.selectedResourceType}
            resourceTypes={RESOURCE_TYPES}
            year={filters.selectedYear ?? new Date().getFullYear().toString()}
          />
        )}
      </div>
    </div>
  );
}