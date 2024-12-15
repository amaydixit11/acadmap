"use client";

import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Filters } from "@/types/filters";

type FilterAction =
  | { type: "SET_FILTERS"; payload: Filters }
  | { type: "RESET_FILTERS" }
  | { type: "UPDATE_FILTER"; key: keyof Filters; value: any };

const initialFilters: Filters = {
  departments: [],
  levels: [],
  searchQuery: "",
};

const FilterContext = createContext<{ filters: Filters; dispatch: React.Dispatch<FilterAction> } | undefined>(undefined);

const filterReducer = (state: Filters, action: FilterAction): Filters => {
  switch (action.type) {
    case "SET_FILTERS":
      return { ...state, ...action.payload };
    case "RESET_FILTERS":
      return initialFilters;
    case "UPDATE_FILTER":
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, dispatch] = useReducer(filterReducer, initialFilters);
  return (
    <FilterContext.Provider value={{ filters, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error("useFilters must be used within a FilterProvider");
  return context;
};
