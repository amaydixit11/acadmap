"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchCourses } from "@/lib/courses";
import { Skeleton } from "@/components/ui/skeleton"; 
import { Course, CourseSupabase } from "@/models/courses";
import { transformCourse } from "@/utils/transform";
import { BookOpen, User, Calendar } from "lucide-react";

export function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCourses();
        const transformedCourses = data.map((course) => transformCourse(course));
        const sortedCourses = transformedCourses.sort((a, b) => a.id.localeCompare(b.id));
        setCourses(sortedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Available Courses</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="w-full">
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          ))
        ) : (
          courses.length > 0 ? (
            courses.map((course) => (
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
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-500">No courses are currently available.</p>
              <p className="text-sm text-gray-400 mt-2">Please check back later.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}