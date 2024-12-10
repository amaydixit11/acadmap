"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchCourses } from "@/lib/courses";
import { Skeleton } from "@/components/ui/skeleton"; 
import { Course, Department } from "@/models/courses";
import { transformCourse } from "@/utils/transform";
import { BookOpen, User, Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Filters {
  departments: (keyof typeof Department)[];
  levels: string[];
  searchQuery: string;
}

export function CourseList({ parentFilters }: { parentFilters: Filters }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filters, setFilters] = useState<Filters>(parentFilters);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCourses();
        const transformedCourses = data.map((course) => transformCourse(course));
        const sortedCourses = transformedCourses.sort((a, b) =>
          a.id.localeCompare(b.id, undefined, { numeric: true })
        );
        setCourses(sortedCourses);
        setFilteredCourses(sortedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleFilterChange(parentFilters);
  }, [courses, parentFilters]);

  const handleFilterChange = (newFilters: Filters) => {
    let result = courses;


    if (newFilters.levels.length > 0) { 
      result = result.filter((course) => newFilters.levels.includes(`${course.code.slice(3, 4)}00 Level`));      
    }

    if (newFilters.departments.length > 0) {
      const newDepartments = newFilters.departments.map(
        (i) => Department[i as keyof typeof Department]
      ) as Department[];
      result = result.filter((course) => newDepartments.includes(course.department as Department));
    }
    
    if (newFilters.searchQuery) {
      const query = newFilters.searchQuery.toLowerCase();
      result = result.filter((course) =>
        (course.title?.toLowerCase() ?? "").includes(query) ||
        (course.description?.toLowerCase() ?? "").includes(query) ||
        (course.code?.toLowerCase() ?? "").includes(query) ||
        (course.department?.toLowerCase() ?? "").includes(query)
      );
    }

    setFilteredCourses(result);
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
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
          className="pl-10"
          value={filters.searchQuery}
          onChange={(e) => {
            const newSearchQuery = e.target.value;
            setFilters({ ...filters, searchQuery: newSearchQuery }); 
            handleFilterChange({ ...filters, searchQuery: newSearchQuery }); 
          }}
        />

      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="w-full">
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            ))
          : filteredCourses.length > 0
          ? filteredCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="block"
                aria-label={`View course details for ${course.title}`}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-primary/50 border-2 border-transparent">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="uppercase tracking-wider">
                        {course.code}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-600">
                        {course.credits} Credits
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-gray-500 mt-1">
                      {course.department}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2 pb-4">
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="truncate">
                          {course.instructor || "Instructor TBA"}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{course.semester}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center text-sm text-gray-500">
                        <BookOpen className="w-4 h-4 mr-2" />
                        <span>View Details</span>
                      </div>
                      <Badge variant="outline" className="text-primary border-primary/30">
                        More Info
                      </Badge>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))
          : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-500">No courses match your filters.</p>
              <p className="text-sm text-gray-400 mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
      </div>
    </div>
  );
}