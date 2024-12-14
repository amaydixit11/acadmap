"use client"

import { useState, useEffect } from "react";
import { Badge, ChevronRight } from "lucide-react";
import { Course } from "@/types/courses";

interface CourseHeaderProps {
  course: Course;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-40 transition-all duration-200 ${
      scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
            {course.code}
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold text-gray-800 line-clamp-1">
            {course.title}
          </h2>
        </div>
      </div>
    </div>
  );
}