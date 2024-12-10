import { useReducer } from "react";
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
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Lock, 
  Video, 
  FileArchive, 
  Link as LinkIcon,
  ExternalLink 
} from 'lucide-react';
import { CourseResource } from "@/models/courses";
import { User } from "@supabase/supabase-js";

// Resource Section Types and Interfaces
interface ResourceSectionProps {
  resources: {
    lectures?: CourseResource[];
    assignments?: CourseResource[];
    tutorials?: CourseResource[];
    pyq?: CourseResource[];
  };
  user?: User | null;
  courseCode?: string;
}

type Action =
  | { type: "setResourceType"; payload: string }
  | { type: "setYear"; payload: string | null }
  | { type: "setSortOrder"; payload: "asc" | "desc" };

interface State {
  selectedResourceType: string;
  selectedYear: string | null;
  sortOrder: "asc" | "desc";
}

const initialState: State = {
  selectedResourceType: "lectures",
  selectedYear: null,
  sortOrder: "desc"
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setResourceType":
      return { ...state, selectedResourceType: action.payload };
    case "setYear":
      return { ...state, selectedYear: action.payload };
    case "setSortOrder":
      return { ...state, sortOrder: action.payload };
    default:
      return state;
  }
}

// Resource Card Component
interface ResourceCardProps {
  resource: CourseResource;
  user?: User | null;
}

function ResourceCard({ resource, user }: ResourceCardProps) {
  const router = useRouter();

  const getResourceIcon = () => {
    const iconMap = {
      'pdf': FileText,
      'video': Video,
      'archive': FileArchive,
      'link': LinkIcon,
      'other': FileText
    };
    return iconMap[resource.type as keyof typeof iconMap] || FileText;
  };

  const ResourceIcon = getResourceIcon();
  const canAccessResource = user !== null;

  const handleDownload = () => {
    if (!canAccessResource) {
      router.push('/login');
      return;
    }

    if (resource.type === 'link') {
      window.open(resource.url, '_blank');
    } else {
      window.open(resource.url, '_blank');
    }
  };

  return (
    <div className="bg-white border rounded-xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ResourceIcon className="text-primary w-6 h-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">
              {resource.title}
            </h3>
          </div>
          <Badge variant="outline" className="bg-gray-100">
            {resource.year}
          </Badge>
        </div>

        {resource.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
            {resource.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="text-xs text-muted-foreground flex items-center space-x-2">
          <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
          {resource.uploadedBy && (
            <Badge variant="secondary" className="text-xs">
              {resource.uploadedBy}
            </Badge>
          )}
        </div>
        <Button 
          size="sm" 
          variant={canAccessResource ? "default" : "outline"}
          onClick={handleDownload}
          className="group/btn"
        >
          {canAccessResource ? (
            <>
              {resource.type === 'link' ? (
                <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:animate-pulse" />
              ) : (
                <Download className="mr-2 h-4 w-4 group-hover/btn:animate-bounce" />
              )}
              {resource.type === 'link' ? "Visit" : "Download"}
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Login to Access
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export function ResourceSection({ resources, user, courseCode }: ResourceSectionProps) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  const resourceTypes = [
    { value: "lectures", label: "Lectures" },
    { value: "assignments", label: "Assignments" },
    { value: "tutorials", label: "Tutorials" },
    { value: "pyq", label: "Past Year Questions" }
  ];

  const { 
    lectures = [], 
    assignments = [], 
    tutorials = [], 
    pyq = [] 
  } = resources || {};

  const currentResources = {
    lectures,
    assignments,
    tutorials,
    pyq
  }[state.selectedResourceType] || [];

  const availableYears = [...new Set(currentResources.flatMap(r => r.year))]
    .filter(Boolean)
    .sort((a, b) => state.sortOrder === "desc" ? b - a : a - b);

  const filteredResources = currentResources
    .filter(r => !state.selectedYear || r.year === (Number(state.selectedYear) || null))
    .sort((a, b) => {
      if (state.sortOrder === "desc") {
        return (b.year || 0) - (a.year || 0);
      }
      return (a.year || 0) - (b.year || 0);
    });

  const handleUpload = () => {
    const params = new URLSearchParams();
    if (courseCode) params.append("courseCode", courseCode);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              user={user} 
            />
          ))
        ) : (
          <NoResourcesMessage />
        )}
      </div>
    </div>
  );
}