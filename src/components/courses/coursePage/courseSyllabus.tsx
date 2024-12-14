import { CheckCircle, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course } from "@/types/courses";

interface CourseSyllabusProps {
  course: Course;
}

export function CourseSyllabus({ course }: CourseSyllabusProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <CheckCircle className="mr-2 text-primary" /> Course Syllabus
        </h2>
      </div>
      <ul className="space-y-4 text-muted-foreground">
        {course.syllabus.map((item, index) => (
          <li 
            key={index} 
            className="flex items-start px-4 py-0 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowRight className="mr-3 mt-1 text-primary w-4 h-4 flex-shrink-0" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}