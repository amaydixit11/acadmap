import { notFound } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Course } from "@/types/courses";
import { cn } from "@/lib/utils";

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
    <div className={cn(
      "min-h-screen",
      // "bg-gradient-to-b from-gray-50 to-white",
      "bg-gray-50",
      // "dark:from-black dark:to-neutral-900", // Dark mode gradient
      // "dark:bg-neutral-900", // Dark mode gradient
      "dark:bg-neutral-950",
      // "transition-colors duration-200" // Smooth transition for theme changes
      "rounded-lg"
    )}>
      <CourseHeader course={course} />
      
      <div className={cn(
        "container mx-auto px-4 pt-8 pb-16",
        "dark:text-gray-100" // Default text color for dark mode
      )}>
        <div className={cn(
          "grid grid-cols-1 gap-2",
          "lg:grid-cols-3 md:grid-cols-2",
          "lg:gap-2 md:gap-2 sm:gap-2"
        )}>
          {/* Course Content */}
          <div className={cn(
            "lg:col-span-2 md:col-span-1 w-full",
          )}>
            <CourseContent course={course} user={user} />
          </div>
          <div className="">
            <CourseSidebar course={course} />
          </div>
        </div>
      </div>
    </div>
  );
}