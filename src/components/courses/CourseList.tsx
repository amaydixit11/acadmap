"use client";

import { useMemo } from "react";
import { Filters } from "@/types/filters";
import { useFilters } from "@/hooks/useFilters";
import { useCourses } from "@/hooks/useCourses";
import { CourseSearch } from "./CourseSearch";
import { filterCoursesUtil } from "@/utils/filterCoursesUtil";
import { CourseCatalog } from "./CourseCatalog";

export function CourseList({ parentFilters }: { parentFilters: Filters }) {
  const {courses} = useCourses();
  const { filters, changeFilters } = useFilters(parentFilters);

  const filteredCourses = useMemo(() => 
    filterCoursesUtil(courses, filters), 
    [courses, filters]
  );

  const handleSearchChange = (query: string) => {
    changeFilters({ searchQuery: query });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Available Courses 
        {filteredCourses.length > 0 && (
          <span className="text-base ml-2 text-muted-foreground">
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