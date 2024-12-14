import { Calendar, BookOpen, Activity, Users } from "lucide-react";
import { Course } from "@/types/courses";

interface CourseScheduleProps {
  course: Course;
}

export function CourseSchedule({ course }: CourseScheduleProps) {
  const scheduleItems = [
    { 
      label: "Lectures", 
      icon: BookOpen, 
      hours: course.schedule.lectures, 
      color: "text-primary" 
    },
    { 
      label: "Labs", 
      icon: Activity, 
      hours: course.schedule.labs, 
      color: "text-green-600" 
    },
    { 
      label: "Tutorials", 
      icon: Users, 
      hours: course.schedule.tutorials, 
      color: "text-blue-600" 
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center">
        <Calendar className="mr-2 text-primary" /> Weekly Schedule
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {scheduleItems.map(({ label, icon: Icon, hours, color }) => (
          <div 
            key={label} 
            className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <Icon className={`w-8 h-8 mb-4 ${color}`} />
            <h3 className="text-lg font-semibold mb-2">{label}</h3>
            <p className="text-3xl font-bold text-gray-800">
              {hours}
              <span className="text-base font-normal text-muted-foreground ml-1">
                hrs/week
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}