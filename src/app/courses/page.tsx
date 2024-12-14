"use client";

import { useState } from "react";
import { CourseFilters } from "@/components/courses/CourseFilters";
import { CourseList } from "@/components/courses/CourseList";
import { Search, Filter, BookOpen } from "lucide-react";
import { Department } from "@/types/courses";
import CoursePageHeader from "@/components/courses/CoursePageHeader";
import { useFilters } from "@/hooks/useFilters";


export default function CoursesPage() {
  const {filters, changeFilters} = useFilters();


  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid gap-8">
        <CoursePageHeader />
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <CourseFilters onFilterChange={changeFilters} />
          <main className="space-y-6">
            <CourseList parentFilters={filters}/>
          </main>
        </div>
      </div>
    </div>
  );
}