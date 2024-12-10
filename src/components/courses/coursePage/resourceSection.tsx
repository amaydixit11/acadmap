import { useReducer } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ResourceCard } from "./resourceCard";
import { CourseResource } from "@/models/courses";
import { User } from "@supabase/supabase-js";

interface ResourceSectionProps {
  resources: {
    lectures: CourseResource[];
    assignments: CourseResource[];
    tutorials: CourseResource[];
    pyq: CourseResource[];
  };
  user?: User | null;
}

// Define action types for the reducer
type Action =
  | { type: "setResourceType"; payload: string }
  | { type: "setYear"; payload: string | null };

interface State {
  selectedResourceType: string;
  selectedYear: string | null;
}

const initialState: State = {
  selectedResourceType: "lectures",
  selectedYear: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setResourceType":
      return { ...state, selectedResourceType: action.payload };
    case "setYear":
      return { ...state, selectedYear: action.payload };
    default:
      return state;
  }
}

export function ResourceSection({ resources, user }: ResourceSectionProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const resourceTypes = [
    { value: "lectures", label: "Lectures" },
    { value: "assignments", label: "Assignments" },
    { value: "tutorials", label: "Tutorials" },
    { value: "pyq", label: "Past Year Questions" }
  ];

  const { lectures = [], assignments = [], tutorials = [], pyq = [] } = resources || { lectures: [], assignments: [], tutorials: [], pyq: [] };


  const currentResources = {
    lectures,
    assignments,
    tutorials,
    pyq
  }[state.selectedResourceType];

  const validCurrentResources = currentResources ?? [];

  const availableYears = [...new Set(validCurrentResources.flatMap(r => r.year))].filter(Boolean).sort((a, b) => b - a);

  // Ensure the selectedYear is a number or null before comparison
  const filteredResources = validCurrentResources.filter(r => 
    !state.selectedYear || r.year === (Number(state.selectedYear) || null)
  );
  

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Select 
          value={state.selectedResourceType}
          onValueChange={(value) => dispatch({ type: "setResourceType", payload: value })}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Resource Type" />
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
            <SelectValue placeholder="Filter by Year" />
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

      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredResources.map(resource => (
          <ResourceCard 
            key={resource.id} 
            resource={resource} 
            user={user} 
          />
        ))}
      </div>
    </div>
  );
}
