import { notFound } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Course } from "@/types/courses";
import { CourseHeader } from "@/components/courses/coursePage/courseHeader";
import { CourseContent } from "@/components/courses/coursePage/courseContent";
import { CourseSidebar } from "@/components/courses/coursePage/courseSidebar";

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
        <div className="grid gap-8 lg:grid-cols-3">
          <CourseContent course={course} user={user} />
          <CourseSidebar course={course} />
        </div>
      </div>
    </div>
  );
}