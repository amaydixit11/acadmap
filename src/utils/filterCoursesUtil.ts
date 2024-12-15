import { Course } from "@/types/courses";
import { Filters } from "@/types/filters";
import { Department } from "@/types/courses";

export const filterCoursesUtil = (
  courses: Course[], 
  filters: Filters
): Course[] => {
  let result = courses;

  // Level Filtering
  if (filters.levels.length > 0) { 
    result = result.filter((course) => 
      filters.levels.includes(`${course.code.slice(3, 4)}00 Level`)
    );      
  }

  // Department Filtering
  if (filters.departments.length > 0) {
    const newDepartments = filters.departments.map(
      (i) => Department[i as keyof typeof Department]
    ) as Department[];
    result = result.filter((course) => 
      newDepartments.includes(course.department as Department)
    );
  }
  
  // Search Query Filtering
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    result = result.filter((course) =>
      (course.title?.toLowerCase() ?? "").includes(query) ||
      // (course.description?.toLowerCase() ?? "").includes(query) ||
      (course.code?.toLowerCase() ?? "").includes(query) ||
      (course.department?.toLowerCase() ?? "").includes(query)
    );
  }

  return result;
};