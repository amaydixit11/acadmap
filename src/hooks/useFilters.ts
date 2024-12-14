import { Department } from "@/types/courses";
import { Filters } from "@/types/filters";
import { useState } from "react";

export const useFilters = (initialState?: Filters) => {
  const [filters, setFilters] = useState<Filters>(
    initialState || {
      departments: [] as (keyof typeof Department)[],
      levels: [],
      searchQuery: "",
    }
  );

  const changeFilters = (newFilters: Filters | Partial<Filters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...(newFilters as Partial<Filters>),
    }));
  };

  const resetFilters = () => {
    setFilters({
      departments: [] as (keyof typeof Department)[],
      levels: [],
      searchQuery: "",
    });
  };

  return {
    filters,
    changeFilters,
    resetFilters,
  };
};
