import { Course } from "@/types/courses";
import { User } from "@supabase/supabase-js";
import { NoResources } from "./NoResources";
import { useResourceFilters } from "@/hooks/useResourcesFilters";
import { useResources } from "@/hooks/useResources";
import { ResourceFilters } from "./ResourcesFilters";
import ResourceCard from "./resourceCard";
import UploadResourcesButton from "./UploadResourcesButton";
import { uploadResource } from "@/lib/resources";
import { Loader2, Filter, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";

const RESOURCE_TYPES = [
  { value: "all", label: "All" },
  { value: "lecture", label: "Lectures" },
  { value: "assignment", label: "Assignments" },
  { value: "tutorial", label: "Tutorials" },
  { value: "pyq", label: "Past Year Questions" },
  { value: "lab", label: "Labs" },
  { value: "unclassified", label: "Unclassified" }
];

interface ResourceSectionProps {
  course: Course;
  user?: User | null;
}

export function ResourceSection({ course, user }: ResourceSectionProps) {
  const { isAuthenticated } = useAuth();
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
    return (
      <div className="w-full p-4 text-center bg-red-50 text-red-600 rounded-lg">
        Error loading resources: {error.message}
      </div>
    );
  }

  const MobileFilters = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 m-2">
          <Filter className="w-4 h-4" />
          Apply Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Resources</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <ResourceFilters
            filters={filters}
            onTypeChange={setResourceType}
            onYearChange={setYear}
            onSortChange={setSortOrder}
            availableYears={availableYears}
            resourceTypes={RESOURCE_TYPES}
            // className="w-full"
          />
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col space-y-4">
      {isAuthenticated && (
            <UploadResourcesButton
              onClick={() => uploadResource({
                resourceType: filters.selectedResourceType, 
                courseCode: course.code, 
                year: filters.selectedYear ?? new Date().getFullYear().toString(),
              })}
              text={`Upload Resources`}
            />
          )}
        {/* Mobile Filters - Visible on small screens */}
        <div className="block md:hidden">
          <MobileFilters />
        </div>

        {/* Desktop Filters - Visible on medium screens and above */}
        <div className="hidden md:flex flex-col sm:flex-row justify-between gap-4 items-center">
          <ResourceFilters
            filters={filters}
            onTypeChange={setResourceType}
            onYearChange={setYear}
            onSortChange={setSortOrder}
            availableYears={availableYears}
            resourceTypes={RESOURCE_TYPES}
            // className="flex-grow"
          />

          {/* {isAuthenticated && (
            <UploadResourcesButton
              onClick={() => uploadResource({
                resourceType: filters.selectedResourceType, 
                courseCode: course.code, 
                year: filters.selectedYear ?? new Date().getFullYear().toString(),
              })}
              text={`Upload Resources`}
              className="flex items-center gap-2"
            />
          )} */}
        </div>
      </div>

      {isLoading ? (
        <div className="w-full flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {filteredAndSortedResources.length > 0 ? (
            filteredAndSortedResources.map((resource, index) => (
              <ResourceCard 
                key={index} 
                resource={resource} 
                // className="w-full transition-all hover:shadow-lg" 
              />
            ))
          ) : (
            <div className="col-span-full">
              <NoResources
                courseCode={course.code}
                user={user}
                selectedResourceType={filters.selectedResourceType}
                resourceTypes={RESOURCE_TYPES}
                year={filters.selectedYear ?? new Date().getFullYear().toString()}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}