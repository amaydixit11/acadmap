"use client";

import { useMemo } from "react";
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
    <div className="space-y-12">
      <CourseSearch
        searchQuery={filters.searchQuery} 
        onSearchChange={handleSearchChange} 
      />
      <CourseCatalog courses={filteredCourses}/>
    </div>
  );
}