import React, { useState } from 'react';
import { CheckCircle } from "lucide-react";
import { Course } from "@/types/courses";

interface CourseSyllabusProps {
  course: Course;
}

export function CourseSyllabus({ course }: CourseSyllabusProps) {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  const toggleCheckbox = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-black">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white flex items-center mb-3 sm:mb-0">
          <CheckCircle className="mr-2 text-primary w-5 h-5 sm:w-6 sm:h-6" /> 
          Course Syllabus
        </h2>
      </div>
      <ul className="space-y-3 sm:space-y-4 text-muted-foreground dark:text-gray-300">
        {course.syllabus.map((item, index) => (
          <li 
            key={index} 
            className="flex items-center px-2 sm:px-4 py-0 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <input 
              type="checkbox"
              checked={checkedItems[index] || false}
              onChange={() => toggleCheckbox(index)}
              className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 text-primary rounded focus:ring-primary"
            />
            <span className={`text-sm sm:text-base leading-relaxed ${checkedItems[index] ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseSyllabus;
