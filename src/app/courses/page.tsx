"use client";

import { CourseFilters } from "@/components/courses/CourseFilters";
import { CourseList } from "@/components/courses/CourseList";
import CoursePageHeader from "@/components/courses/CoursePageHeader";

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid gap-8">
        <CoursePageHeader />
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <CourseFilters />
          <main className="space-y-6">
            <CourseList />
          </main>
        </div>
      </div>
    </div>
  );
}
