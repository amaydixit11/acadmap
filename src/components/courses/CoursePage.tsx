import { notFound } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Course } from "@/types/courses";

import { CourseContent } from "@/components/courses/coursePage/courseContent";
import { CourseSidebar } from "@/components/courses/coursePage/courseSidebar";
import CourseHeader from "./coursePage/courseHeader";

interface CoursePageProps {
  course: Course;
  user?: User | null;
}

export default function CoursePage({ course, user }: CoursePageProps) {
  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <CourseHeader course={course} />
      
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="grid grid-cols-1 gap-8 
          lg:grid-cols-3 
          md:grid-cols-2 
          lg:gap-8 
          md:gap-6 
          sm:gap-4"
        >
          {/* Course Content - Full width on mobile, takes 2 columns on md, full 3 columns on lg */}
          <div className="lg:col-span-2 md:col-span-1 w-full">
            <CourseContent course={course} user={user} />
          </div>
          
          {/* Sidebar - Full width on mobile, takes 1 column on md and lg */}
          <div className="w-full md:col-span-1 lg:col-span-1">
            <CourseSidebar course={course} />
          </div>
        </div>
      </div>
    </div>
  );
}