"use client"

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText, Calendar, Library } from "lucide-react";
import { Course} from "@/types/courses";
import { User } from "@supabase/supabase-js";
import { CourseSyllabus } from "./courseSyllabus";
import { CourseSchedule } from "./courseSchedule";
import { ResourceSection } from "./resources/resourceSection";

interface CourseContentProps {
  course: Course;
  user?: User | null;
}

export function CourseContent({ course, user }: CourseContentProps) {
  const tabItems = [
    { 
      value: "syllabus", 
      icon: FileText, 
      label: "Syllabus",
      component: <CourseSyllabus course={course} />
    },
    { 
      value: "schedule", 
      icon: Calendar, 
      label: "Schedule",
      component: <CourseSchedule course={course} />
    },
    { 
      value: "resources", 
      icon: Library, 
      label: "Resources",
      component: <ResourceSection course={course} user={user} />
    }
  ];

  return (
    <div className={cn("w-full px-4 sm:px-6 lg:px-8")}>
      <Card 
        className={cn(
          "shadow-lg border-gray-100 w-full",
          "dark:bg-black",
          "dark:border-gray-100"
        )}
      >
        <Tabs defaultValue="syllabus" className="w-full">
          <CardHeader className="pb-0">
            <TabsList 
              className={cn(
                "border-gray-100",
                "grid grid-cols-3 w-full py-1 px-2 gap-2 max-w-full h-14",
                "bg-grey-50/50 dark:bg-black",
                "dark:border-gray-100",
                "mobile:flex mobile:flex-col mobile:w-full mobile:items-stretch mobile:space-y-2",
              )}
            >
              {tabItems.map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className={cn(
                    "flex items-center justify-center py-2",
                    "mobile:w-full mobile:justify-start mobile:px-4 mobile:text-left",
                    "text-gray-700 dark:text-gray-200",
                    "data-[state=active]:bg-white data-[state=active]:shadow-sm",
                    "data-[state=active]:dark:bg-neutral-900",
                    "text-base"
                  )}
                >
                  <Icon 
                    className={cn(
                      "mr-2 h-4 w-4 mobile:mr-3",
                      "text-gray-600 dark:text-gray-300"
                    )} 
                  />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </CardHeader>

          <CardContent 
            className={cn(
              "p-6 mobile:p-4",
              "text-gray-800 dark:text-gray-100",
              "dark:bg-black"
            )}
          >
            {tabItems.map(({ value, component }) => (
              <TabsContent 
                key={value} 
                value={value} 
                className={cn(
                  "mt-0",
                  "mobile:max-w-full mobile:overflow-x-auto mobile:p-2"
                )}
              >
                {component}
              </TabsContent>
            ))}
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}