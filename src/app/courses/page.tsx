"use client";

import { useState } from "react";
import { CourseFilters } from "@/components/courses/course-filters";
import { CourseList } from "@/components/courses/course-list";
import { Search, Filter, BookOpen } from "lucide-react";
import { Department } from "@/models/courses";


export default function CoursesPage() {
  const [filters, setFilters] = useState({
    departments: [] as (keyof typeof Department)[],
    levels: [] as string[],
    searchQuery: ""
  });

  const handleFilterChange = (newFilters: {
    departments: (keyof typeof Department)[],
    levels: string[],
    searchQuery: string
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid gap-8">
        {/* Header Section */}
        <header className="text-center space-y-4 bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl">
          <div className="flex justify-center items-center gap-4">
            <BookOpen className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-extrabold text-gray-800">Course Catalog</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a diverse range of courses tailored to fuel your academic journey. 
            Find the perfect classes to match your interests and academic goals.
          </p>
        </header>

        {/* Search and Filters Container */}
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          {/* Filters Sidebar */}
          <aside className="w-full">
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Filters
                </h2>
              </div>
              <CourseFilters onFilterChange={handleFilterChange} />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="space-y-6">
            <CourseList parentFilters={filters}/>
          </main>
        </div>
      </div>
    </div>
  );
}