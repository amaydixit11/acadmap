"use client";

import { useState } from "react";
import { CourseFilters } from "@/components/courses/CourseFilters";
import { CourseList } from "@/components/courses/CourseList";
import { Search, Filter, BookOpen } from "lucide-react";
import { Department } from "@/types/courses";
import CoursePageHeader from "@/components/courses/CoursePageHeader";
import { useFilters } from "@/context/FiltersContext";


export default function CoursesPage() {
  const {filters, dispatch} = useFilters();


  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid gap-8">
        <CoursePageHeader />
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          {/* <CourseFilters filters={filters} onFilterChange={changeFilters} onReset={resetFilters}/> */}
          <CourseFilters />
          <main className="space-y-6">
            <CourseList />
            {/* <CourseList parentFilters={filters} onFilterChange={changeFilters}/> */}
          </main>
        </div>
      </div>
    </div>
  );
}