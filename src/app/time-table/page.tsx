"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeTableParsedCourse } from "@/types/time-table";
import { parseCSV } from "@/lib/time-table";
import { TimeTableCourseList } from "@/components/time-table/course-list";
import Timetable from "@/components/time-table/timetable";
import { cn } from "@/lib/utils";
import { detectClashes, SlotClash } from "@/lib/clashes";
import { ClashesTab } from "@/components/time-table/clashesTab";

export default function Home() {
  const [courses, setCourses] = useState<TimeTableParsedCourse[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<
    TimeTableParsedCourse[]
  >([]);
  const [isCompact, setIsCompact] = useState(true);
  const [viewSlots, setViewSlots] = useState(true);
  const [clashes, setClashes] = useState<SlotClash[]>([]);

  useEffect(() => {
    const detectedClashes = detectClashes(selectedCourses);
    setClashes(detectedClashes);
  }, [selectedCourses]);

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
    <main
      className={cn(
        "min-h-screen transition-colors duration-300",
        "bg-gray-50 dark:bg-black"
      )}
    >
      {/* Decorative background elements for dark mode */}
      <div className="absolute inset-0 -z-10">
        <div
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-br from-blue-100/10 to-purple-100/10",
            "dark:from-blue-900/10 dark:to-purple-900/10"
          )}
        />
        <div
          className={cn(
            "absolute top-20 left-20 w-32 h-32",
            "bg-blue-200/20 dark:bg-blue-800/20",
            "rounded-full blur-3xl"
          )}
        />
        <div
          className={cn(
            "absolute bottom-20 right-20 w-40 h-40",
            "bg-purple-200/20 dark:bg-purple-800/20",
            "rounded-full blur-3xl"
          )}
        />
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8 lg:px-8 relative z-10">
        <div className="flex flex-col items-center space-y-6 sm:space-y-8">
          <h1
            className={cn(
              "text-2xl sm:text-3xl lg:text-4xl font-bold text-center",
              "bg-clip-text text-transparent",
              "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800",
              "dark:from-white dark:via-gray-200 dark:to-gray-300",
              "transition-all duration-300"
            )}
          >
            Course Timetable Generator
          </h1>

          {courses.length > 0 ? (
            <div className="w-full max-w-7xl">
              <Tabs defaultValue="courses" className="w-full">
                <div className="mb-6 sm:mb-8 space-y-4">
                  <TabsList
                    className={cn(
                      "grid w-full max-w-md mx-auto grid-cols-3",
                      "bg-white dark:bg-gray-800",
                      "border border-gray-200 dark:border-gray-700",
                      "shadow-sm dark:shadow-gray-900/20"
                    )}
                  >
                    <TabsTrigger
                      value="courses"
                      className={cn(
                        "data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/30",
                        "data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300",
                        "text-gray-700 dark:text-gray-300",
                        "hover:bg-gray-50 dark:hover:bg-gray-700",
                        "transition-all duration-200",
                        "text-xs sm:text-sm"
                      )}
                    >
                      Courses
                    </TabsTrigger>
                    <TabsTrigger
                      value="timetable"
                      className={cn(
                        "data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/30",
                        "data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300",
                        "text-gray-700 dark:text-gray-300",
                        "hover:bg-gray-50 dark:hover:bg-gray-700",
                        "transition-all duration-200",
                        "text-xs sm:text-sm"
                      )}
                    >
                      Timetable
                    </TabsTrigger>
                    <TabsTrigger
                      value="clashes"
                      className={cn(
                        "data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/30",
                        "data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300",
                        "text-gray-700 dark:text-gray-300",
                        "hover:bg-gray-50 dark:hover:bg-gray-700",
                        "transition-all duration-200",
                        "text-xs sm:text-sm",
                        clashes.length > 0 &&
                          "data-[state=active]:text-red-600 dark:data-[state=active]:text-red-400"
                      )}
                    >
                      <span className="flex items-center gap-1">
                        Clashes
                        {clashes.length > 0 && (
                          <span
                            className={cn(
                              "inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold",
                              "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400"
                            )}
                          >
                            {clashes.length}
                          </span>
                        )}
                      </span>
                    </TabsTrigger>
                  </TabsList>

                  <div
                    className={cn(
                      "flex items-center justify-center space-x-2",
                      "p-3 rounded-lg",
                      "bg-white/50 dark:bg-gray-800/50",
                      "backdrop-blur-sm",
                      "border border-gray-200/50 dark:border-gray-700/50",
                      "shadow-sm dark:shadow-gray-900/20"
                    )}
                  >
                    <input
                      type="checkbox"
                      id="compact-mode"
                      checked={isCompact}
                      onChange={(e) => setIsCompact(e.target.checked)}
                      className={cn(
                        "w-4 h-4 rounded",
                        "text-blue-600 dark:text-blue-400",
                        "bg-gray-100 dark:bg-gray-700",
                        "border-gray-300 dark:border-gray-600",
                        "focus:ring-blue-500 dark:focus:ring-blue-400",
                        "focus:ring-2 transition-colors duration-200"
                      )}
                    />
                    <label
                      htmlFor="compact-mode"
                      className={cn(
                        "text-sm font-medium cursor-pointer select-none",
                        "text-gray-700 dark:text-gray-300",
                        "hover:text-gray-900 dark:hover:text-gray-100",
                        "transition-colors duration-200"
                      )}
                    >
                      Compact View
                    </label>
                    <input
                      type="checkbox"
                      id="slots"
                      checked={viewSlots}
                      onChange={(e) => setViewSlots(e.target.checked)}
                      className={cn(
                        "w-4 h-4 rounded",
                        "text-blue-600 dark:text-blue-400",
                        "bg-gray-100 dark:bg-gray-700",
                        "border-gray-300 dark:border-gray-600",
                        "focus:ring-blue-500 dark:focus:ring-blue-400",
                        "focus:ring-2 transition-colors duration-200"
                      )}
                    />
                    <label
                      htmlFor="slots"
                      className={cn(
                        "text-sm font-medium cursor-pointer select-none",
                        "text-gray-700 dark:text-gray-300",
                        "hover:text-gray-900 dark:hover:text-gray-100",
                        "transition-colors duration-200"
                      )}
                    >
                      View Slots
                    </label>
                  </div>
                </div>

                <TabsContent
                  value="courses"
                  className={cn(
                    "mt-2 sm:mt-4 px-2 sm:px-4",
                    "bg-white/30 dark:bg-gray-800/30",
                    "backdrop-blur-sm rounded-lg",
                    "border border-gray-200/50 dark:border-gray-700/50",
                    "shadow-sm dark:shadow-gray-900/20",
                    "transition-all duration-300"
                  )}
                >
                  <TimeTableCourseList
                    courses={courses}
                    selectedCourses={selectedCourses}
                    onCourseSelect={handleCourseSelect}
                  />
                </TabsContent>

                <TabsContent
                  value="timetable"
                  className={cn(
                    "mt-2 sm:mt-4",
                    "bg-white/30 dark:bg-gray-800/30",
                    "backdrop-blur-sm rounded-lg",
                    "border border-gray-200/50 dark:border-gray-700/50",
                    "shadow-sm dark:shadow-gray-900/20",
                    "transition-all duration-300"
                  )}
                >
                  <div className="max-w-full overflow-x-auto p-4">
                    <Timetable
                      selectedCourses={selectedCourses}
                      isCompact={isCompact}
                      viewSlots={viewSlots}
                    />
                  </div>
                </TabsContent>

                <TabsContent
                  value="clashes"
                  className={cn(
                    "mt-2 sm:mt-4",
                    "bg-white/30 dark:bg-gray-800/30",
                    "backdrop-blur-sm rounded-lg",
                    "border border-gray-200/50 dark:border-gray-700/50",
                    "shadow-sm dark:shadow-gray-900/20",
                    "transition-all duration-300"
                  )}
                >
                  <ClashesTab
                    clashes={clashes}
                    selectedCourses={selectedCourses}
                    allCourses={courses}
                  />
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div
              className={cn(
                "w-full max-w-md p-6 text-center",
                "bg-white/50 dark:bg-gray-800/50",
                "backdrop-blur-sm rounded-lg",
                "border border-gray-200/50 dark:border-gray-700/50",
                "shadow-sm dark:shadow-gray-900/20"
              )}
            >
              <div className="animate-pulse space-y-4">
                <div
                  className={cn(
                    "h-4 rounded w-3/4 mx-auto",
                    "bg-gray-200 dark:bg-gray-700"
                  )}
                ></div>
                <div
                  className={cn(
                    "h-4 rounded w-1/2 mx-auto",
                    "bg-gray-200 dark:bg-gray-700"
                  )}
                ></div>
                <div
                  className={cn(
                    "h-4 rounded w-2/3 mx-auto",
                    "bg-gray-200 dark:bg-gray-700"
                  )}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
