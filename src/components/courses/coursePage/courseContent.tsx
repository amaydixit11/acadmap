"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText, Calendar, Library } from "lucide-react";
import { Course} from "@/models/courses";
import { User } from "@supabase/supabase-js";
import { CourseSyllabus } from "./courseSyllabus";
import { CourseSchedule } from "./courseSchedule";
import { ResourceSection } from "./resourceSection";

interface CourseContentProps {
  course: Course;
  user?: User | null;
}

export function CourseContent({ course, user }: CourseContentProps) {
  const [activeTab, setActiveTab] = useState("syllabus");

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
    <div className="lg:col-span-2 space-y-8">
      <Card className="shadow-lg border-gray-100">
        <Tabs defaultValue="syllabus" className="w-full">
          <CardHeader className="pb-0">
            <TabsList className="w-full bg-gray-50/50 p-1">
              {tabItems.map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm py-3"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </CardHeader>

          <CardContent className="p-6">
            {tabItems.map(({ value, component }) => (
              <TabsContent key={value} value={value} className="mt-0">
                {component}
              </TabsContent>
            ))}
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}