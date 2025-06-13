"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeTableParsedCourse } from "@/types/time-table";
import { parseCSV } from "@/lib/time-table";
import { TimeTableCourseList } from "@/components/time-table/course-list";
import Timetable from "@/components/time-table/timetable";

export default function Home() {
  const [courses, setCourses] = useState<TimeTableParsedCourse[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<
    TimeTableParsedCourse[]
  >([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetch("/file.csv");
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        const csvText = await response.text();
        const parsedCourses = await parseCSV(csvText);
        setCourses(parsedCourses);
      } catch (error) {
        console.error("Error loading and parsing CSV:", error);
      }
    };

    loadCourses();
  }, []);

  const handleCourseSelect = (course: TimeTableParsedCourse) => {
    setSelectedCourses((prev) => {
      const isSelected = prev.some((c) => c.code === course.code);
      if (isSelected) {
        return prev.filter((c) => c.code !== course.code);
      }
      return [...prev, course];
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-8 lg:px-8">
        <div className="flex flex-col items-center space-y-6 sm:space-y-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
            Course Timetable Generator
          </h1>

          {courses.length > 0 ? (
            <div className="w-full max-w-7xl">
              <Tabs defaultValue="courses" className="w-full">
                <div className="mb-6 sm:mb-8">
                  <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2">
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="timetable">Timetable</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent
                  value="courses"
                  className="mt-2 sm:mt-4 px-2 sm:px-4"
                >
                  <TimeTableCourseList
                    courses={courses}
                    selectedCourses={selectedCourses}
                    onCourseSelect={handleCourseSelect}
                  />
                </TabsContent>

                <TabsContent value="timetable" className="mt-2 sm:mt-4">
                  <div className="max-w-screen overflow-x-auto">
                    <Timetable selectedCourses={selectedCourses} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="w-full max-w-md p-4 text-center">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
