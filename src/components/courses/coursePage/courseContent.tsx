"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, Library, MessageSquare } from "lucide-react";
import { Course } from "@/types/courses";
import { User } from "@supabase/supabase-js";
import { CourseSyllabus } from "./courseSyllabus";
import { CourseSchedule } from "./courseSchedule";
import { ResourceSection } from "./resources/resourceSection";
import { CourseDiscussions } from "./CourseDiscussions";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CourseContentProps {
  course: Course;
  user?: User | null;
}

export function CourseContent({ course, user }: CourseContentProps) {
  const tabItems = [
    { 
      value: "resources", 
      icon: Library, 
      label: "Resources",
      component: <ResourceSection course={course} user={user} />
    },
    { 
      value: "syllabus", 
      icon: FileText, 
      label: "Syllabus",
      component: <CourseSyllabus course={course} />
    },
    { 
      value: "schedule", 
      icon: Calendar, 
      label: "Weekly Schedule",
      component: <CourseSchedule course={course} />
    },
    {
      value: "discussions",
      icon: MessageSquare,
      label: "Discussions",
      component: <CourseDiscussions courseCode={course.code} user={user} />
    }
  ];

  return (
    <div className="w-full">
      <Tabs defaultValue="resources" className="w-full">
        <div className="mb-10 overflow-x-auto pb-2">
          <TabsList className="bg-transparent h-auto p-0 gap-8 justify-start flex border-b border-slate-200 dark:border-slate-800 w-full rounded-none">
            {tabItems.map(({ value, icon: Icon, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-indigo-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 dark:data-[state=active]:border-emerald-400 rounded-none px-0 py-4 text-sm font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 transition-all whitespace-nowrap"
              >
                <Icon className="w-4 h-4" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="min-h-[400px]">
          {tabItems.map(({ value, component }) => (
            <TabsContent 
              key={value} 
              value={value} 
              className="mt-0 focus-visible:outline-none"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-0 overflow-hidden">
                  {component}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}