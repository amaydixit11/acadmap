import React from 'react';
import { Calendar, BookOpen, Activity, Users } from "lucide-react";
import { Course } from "@/types/courses";
import { cn } from "@/lib/utils";

interface CourseScheduleProps {
  course: Course;
}

export function CourseSchedule({ course }: CourseScheduleProps) {
  const scheduleItems = [
    { 
      label: "Lectures", 
      icon: BookOpen, 
      hours: course.schedule.lectures, 
      color: "text-primary",
      bgColor: "group-hover:bg-primary/10" 
    },
    { 
      label: "Labs", 
      icon: Activity, 
      hours: course.schedule.labs, 
      color: "text-green-600",
      bgColor: "group-hover:bg-green-600/10" 
    },
    { 
      label: "Tutorials", 
      icon: Users, 
      hours: course.schedule.tutorials, 
      color: "text-blue-600",
      bgColor: "group-hover:bg-blue-600/10" 
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 dark:bg-black dark:text-white">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center mb-6">
        <Calendar className="mr-3 w-6 h-6 sm:w-7 sm:h-7 text-primary dark:text-primary" /> 
        Weekly Course Schedule
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {scheduleItems.map(({ label, icon: Icon, hours, color, bgColor }) => (
          <div 
            key={label} 
            className={cn(
              "group relative bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 dark:bg-gray-900 dark:border-gray-700",
              "transform transition-all duration-300 ease-in-out",
              "hover:-translate-y-2 hover:shadow-lg",
              "flex flex-col items-start",
              "max-md:flex-row max-md:items-center max-md:gap-4",
              bgColor
            )}
          >
            <div className={cn(
              "mb-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800",
              "group-hover:rotate-6 transition-transform duration-300",
              "max-md:mb-0 max-md:p-2",
              color
            )}>
              <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="max-md:flex-grow">
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800 dark:text-gray-300 max-md:mb-0">
                {label}
              </h3>
              <div className="mt-auto w-full">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-baseline">
                  {hours}
                  <span className="text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400 ml-2">
                    hrs/week
                  </span>
                </p>
              </div>
            </div>
            <div className={cn(
              "absolute bottom-0 left-0 right-0 h-1 transition-all duration-300",
              "opacity-0 group-hover:opacity-100",
              "max-md:hidden",
              color
            )}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseSchedule;
