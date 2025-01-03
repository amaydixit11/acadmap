"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeTableCourse } from "@/types/time-table";
import { parseCSV } from "@/lib/time-table";
import { TimeTableCourseList } from "@/components/time-table/course-list";
import Timetable from "@/components/time-table/timetable";
// import '/file.csv'

export default function Home() {
  const [courses, setCourses] = useState<TimeTableCourse[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<TimeTableCourse[]>([]);

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

  const handleCourseSelect = (course: TimeTableCourse) => {
    setSelectedCourses((prev) => {
      const isSelected = prev.some((c) => c.courseCode === course.courseCode);
      if (isSelected) {
        return prev.filter((c) => c.courseCode !== course.courseCode);
      }
      return [...prev, course];
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-4xl font-bold">Course Timetable Generator</h1>

        {courses.length > 0 && (
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="courses">TimeTableCourse Selection</TabsTrigger>
              <TabsTrigger value="timetable">Generated Timetable</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="mt-6">
              <TimeTableCourseList
                courses={courses}
                selectedCourses={selectedCourses}
                onCourseSelect={handleCourseSelect}
              />
            </TabsContent>
            <TabsContent value="timetable" className="mt-6">
              <Timetable selectedCourses={selectedCourses} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
