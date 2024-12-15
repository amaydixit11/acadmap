"use client"

import { useState, useEffect } from "react";
import { ChevronRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Course } from "@/types/courses";

interface CourseHeaderProps {
  course: Course;
}

const CourseHeader = ({ course }: CourseHeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <TooltipProvider>
      <div
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? "bg-white/80 backdrop-blur-lg shadow-sm"
            : "bg-white/0"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-4">
            {/* Course Info Section */}
            <div className="flex items-center space-x-2 min-w-0">
              <div className="flex-shrink-0">
                <Tooltip>
                  <TooltipTrigger>
                    <Badge 
                      variant="secondary" 
                      className="px-1.5 py-0.5 text-xs font-medium whitespace-nowrap"
                    >
                      {course.code}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>Course Code</TooltipContent>
                </Tooltip>
              </div>

              <ChevronRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
              
              <h2 className="font-semibold text-sm text-gray-800 truncate">
                {course.title}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CourseHeader;