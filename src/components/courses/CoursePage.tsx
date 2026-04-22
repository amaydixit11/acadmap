"use client"
import { notFound } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Course } from "@/types/courses";
import { cn } from "@/lib/utils";

import { CourseContent } from "@/components/courses/coursePage/courseContent";
import { CourseSidebar } from "@/components/courses/coursePage/courseSidebar";
import CourseHeader from "./coursePage/courseHeader";
import { CourseReviewsSection } from "@/components/reviews/CourseReviewsSection";
import { CourseStudyGroups } from "@/components/courses/CourseStudyGroups";
import { 
  ChevronRight, 
  Home, 
  BookOpen, 
  Star, 
  Users, 
  Clock,
  Verified,
  Calendar,
  Plus,
  UserPlus
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CoursePageProps {
  course: Course;
  user?: User | null;
}

import { useCourseStats } from "@/hooks/useCourseStats";

export default function CoursePage({ course, user }: CoursePageProps) {
  const { studentCount } = useCourseStats(course.code);
  
  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] dark:bg-[#0b0c10]">
      {/* Sticky Scroll Header */}
      <CourseHeader course={course} />
      
      {/* Hero Header */}
      <div className="bg-white dark:bg-[#0b0c10] pt-12 pb-8">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="space-y-4">
              <nav className="flex items-center gap-2 text-sm font-bold">
                <Badge variant="secondary" className="rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold px-2 py-0.5 text-[10px] uppercase tracking-tighter">
                  {course.code}
                </Badge>
                <span className="text-slate-400 dark:text-slate-500 font-medium">{course.department}</span>
              </nav>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                {course.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-bold tracking-tight">
                    {studentCount > 0 ? `${studentCount} Students` : "Be the first student"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-bold tracking-tight">
                    {new Date().getMonth() >= 6 ? "Autumn" : "Spring"} Semester {new Date().getFullYear()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-xl border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold h-12 px-6">
                <Plus className="w-4 h-4 mr-2" /> Add to Timetable
              </Button>
              <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 px-6 shadow-lg shadow-indigo-500/20">
                <UserPlus className="w-4 h-4 mr-2" /> Follow Course
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Course Content */}
          <div className="lg:col-span-8 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CourseContent course={course} user={user} />
            </motion.div>
            
            <div className="space-y-12">
               <CourseReviewsSection courseCode={course.id} />
               <CourseStudyGroups courseCode={course.id} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
             <div className="sticky top-24">
                <CourseSidebar course={course} />
             </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
