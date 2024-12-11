import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Filter, SortDesc, SortAsc, Calendar } from "lucide-react";
import { Course, CourseResource } from "@/models/courses";
import { User } from "@supabase/supabase-js";
import { ResourceCard } from "./resourceCard";
import { fetchCourseResources } from "@/lib/resources";

// Resource Section Types and Interfaces
interface ResourceSectionProps {
  course: Course;
  user?: User | null;
}

type Action =
  | { type: "setResourceType"; payload: string }
  | { type: "setYear"; payload: string | null }
  | { type: "setSortOrder"; payload: "asc" | "desc" }
  | { type: "setResources"; payload: CourseResource[] };

interface State {
  selectedResourceType: string;
  selectedYear: string | null;
  sortOrder: "asc" | "desc";
  resources: CourseResource[];
}

const initialState: State = {
  selectedResourceType: "all",
  selectedYear: null,
  sortOrder: "desc",
  resources: []
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setResourceType":
      return { ...state, selectedResourceType: action.payload, selectedYear: null };
    case "setYear":
      return { ...state, selectedYear: action.payload };
    case "setSortOrder":
      return { ...state, sortOrder: action.payload };
    case "setResources":
      return { ...state, resources: action.payload };
    default:
      return state;
  }
}

export function ResourceSection({course, user}: ResourceSectionProps) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fetchedResources, setFetchedResources] = useState([] as CourseResource[]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        console.log("course.code, : ", course.code )
        console.log("state.selectedResourceType: ", state.selectedResourceType)
        const { resources } = await fetchCourseResources({
          courseCode: course.code, 
          resourceCategory: state.selectedResourceType
        });
        setFetchedResources(resources)
        console.log(resources)
      } catch (error) {
        console.error('Failed to fetch resources:', error);
      }
    };

    fetchResources();
  }, [course.code, state.selectedResourceType]);

  const resourceTypes = [
    { value: "all", label: "All" },
    { value: "lectures", label: "Lectures" },
    { value: "assignments", label: "Assignments" },
    { value: "tutorials", label: "Tutorials" },
    { value: "pyq", label: "Past Year Questions" },
    { value: "unclassified", label: "Unclassified" }
  ];

  const filteredResources = fetchedResources
    .filter(r => 
      (state.selectedResourceType === 'all' ? r : r.category === state.selectedResourceType) && 
      (!state.selectedYear || r.year === Number(state.selectedYear))
    )
    .sort((a, b) => {
      if (state.sortOrder === "desc") {
        return (b.year || 0) - (a.year || 0);
      }
      return (a.year || 0) - (b.year || 0);
    });

  const availableYears = [...new Set(
    fetchedResources
      .filter(r => r.category === state.selectedResourceType)
      .map(r => r.year)
      .filter(Boolean)
  )].sort((a, b) => state.sortOrder === "desc" ? b - a : a - b);

  const handleUpload = () => {
    const params = new URLSearchParams();
    params.append("courseCode", course.code);
    params.append("type", state.selectedResourceType);
    if (state.selectedYear) params.append("year", state.selectedYear);
    
    router.push(`/upload?${params.toString()}`);
  };

  const NoResourcesMessage = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl">
      <Filter className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
      <p className="text-muted-foreground mb-4 text-center">
        No resources found for the selected filters
      </p>
      {user ? (
        <Button onClick={handleUpload} variant="outline" className="animate-pulse hover:animate-none">
          <Plus className="mr-2 h-4 w-4" />
          Upload {resourceTypes.find(t => t.value === state.selectedResourceType)?.label}
        </Button>
      ) : (
        <p className="text-muted-foreground text-sm">Sign In To Upload</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
        <div className="flex flex-wrap gap-4 w-full">
          <Select 
            value={state.selectedResourceType}
            onValueChange={(value) => dispatch({ type: "setResourceType", payload: value })}
          >
            <SelectTrigger className="w-[200px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Resource Type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {resourceTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            onValueChange={(value) => dispatch({ type: "setYear", payload: value === "all" ? null : value })}
            value={state.selectedYear || "all"}
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Year" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {availableYears.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={state.sortOrder}
            onValueChange={(value: "asc" | "desc") => dispatch({ type: "setSortOrder", payload: value })}
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                {state.sortOrder === "desc" ? (
                  <SortDesc className="mr-2 h-4 w-4 text-muted-foreground" />
                ) : (
                  <SortAsc className="mr-2 h-4 w-4 text-muted-foreground" />
                )}
                <SelectValue placeholder="Sort Order" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest First</SelectItem>
              <SelectItem value="asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {user && (
          <Button onClick={handleUpload} className="shrink-0 group">
            <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
            Upload Resource
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <ResourceCard
              key={resource.id} 
              resource={resource} 
              // user={user} 
            />
          ))
        ) : (
          <NoResourcesMessage />
        )}
      </div>
    </div>
  );
}