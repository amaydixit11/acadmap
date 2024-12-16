"use client";

import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { Filters } from "@/types/filters";
import { useCourses } from "@/hooks/useCourses";
import { CourseSearch } from "./CourseSearch";
import { filterCoursesUtil } from "@/utils/filterCoursesUtil";
import { CourseCatalog } from "./CourseCatalog";
import { useFilters } from "@/context/FiltersContext";

export function CourseList() {
  const {courses} = useCourses();
  const {filters, dispatch} = useFilters();

  const filteredCourses = useMemo(() => 
    filterCoursesUtil(courses, filters), 
    [courses, filters]
  );

  const handleSearchChange = (query: string) => {
    dispatch({ type: 'UPDATE_FILTER', key: 'searchQuery', value: query} );
  };

  return (
    <div 
      className={cn(
        "container mx-auto px-4 py-8",
        "dark:bg-black"
      )}
    >
      <h1 
        className={cn(
          "text-3xl font-bold mb-8 text-center text-gray-800",
          "dark:text-white"
        )}
      >
        Available Courses 
        {filteredCourses.length > 0 && (
          <span 
            className={cn(
              "text-base ml-2 text-muted-foreground",
              "dark:text-gray-400"
            )}
          >
            ({filteredCourses.length})
          </span>
        )}
      </h1>
      
      <CourseSearch
        searchQuery={filters.searchQuery} 
        onSearchChange={handleSearchChange} 
      />
      <CourseCatalog courses={filteredCourses}/>
    </div>
  );
}