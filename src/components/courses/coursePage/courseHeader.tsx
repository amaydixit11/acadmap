"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Course } from "@/types/courses";
import { cn } from "@/utils/cn"; // Assuming `cn` is a utility to join class names

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
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200",
          scrolled
            ? "bg-white/80 backdrop-blur-lg shadow-sm dark:bg-black/80 dark:text-white"
            : "bg-transparent dark:bg-black/0"
        )}
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
                      className={cn(
                        "px-1.5 py-0.5 text-base font-medium whitespace-nowrap",
                        "dark:text-gray-200 dark:bg-gray-700" // Dark mode styles for Badge
                      )}
                    >
                      {course.code}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>Course Code</TooltipContent>
                </Tooltip>
              </div>

              <ChevronRight className="h-3 w-3 text-muted-foreground flex-shrink-0 dark:text-gray-400" />
              
              <h2 className="font-semibold text-base text-gray-800 truncate dark:text-white">
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
