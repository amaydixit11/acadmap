"use client"

import { useState } from "react";
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
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg border-gray-100 w-full">
        <Tabs defaultValue="syllabus" className="w-full">
          <CardHeader className="pb-0">
            <TabsList className="grid grid-cols-3 w-full bg-gray-50/50 p-1 gap-2 
              max-w-full 
              mobile:flex mobile:flex-col mobile:w-full 
              mobile:items-stretch 
              mobile:space-y-2">
              {tabItems.map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex items-center justify-center 
                    data-[state=active]:bg-white data-[state=active]:shadow-sm 
                    py-3 
                    mobile:w-full 
                    mobile:justify-start 
                    mobile:px-4 
                    mobile:text-left"
                >
                  <Icon className="mr-2 h-4 w-4 mobile:mr-3" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </CardHeader>

          <CardContent className="p-6 mobile:p-4">
            {tabItems.map(({ value, component }) => (
              <TabsContent 
                key={value} 
                value={value} 
                className="mt-0 
                  mobile:max-w-full 
                  mobile:overflow-x-auto 
                  mobile:p-2"
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