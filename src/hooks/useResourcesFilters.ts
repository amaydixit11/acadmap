import { useReducer } from 'react';

type ResourceFilterAction =
  | { type: "setResourceType"; payload: string }
  | { type: "setYear"; payload: string | null }
  | { type: "setSortOrder"; payload: "asc" | "desc" };

export interface ResourceFilterState {
  selectedResourceType: string;
  selectedYear: string | null;
  sortOrder: "asc" | "desc";
}

const initialResourceFilterState: ResourceFilterState = {
  selectedResourceType: "all",
  selectedYear: null,
  sortOrder: "desc"
};

function filterReducer(state: ResourceFilterState, action: ResourceFilterAction): ResourceFilterState {
  switch (action.type) {
    case "setResourceType":
      return { ...state, selectedResourceType: action.payload, selectedYear: null };
    case "setYear":
      return { ...state, selectedYear: action.payload };
    case "setSortOrder":
      return { ...state, sortOrder: action.payload };
    default:
      return state;
  }
}

export function useResourceFilters() {
  const [filters, dispatch] = useReducer(filterReducer, initialResourceFilterState);
  
  return {
    filters,
    setResourceType: (type: string) => dispatch({ type: "setResourceType", payload: type }),
    setYear: (year: string | null) => dispatch({ type: "setYear", payload: year }),
    setSortOrder: (order: "asc" | "desc") => dispatch({ type: "setSortOrder", payload: order })
  };
}
