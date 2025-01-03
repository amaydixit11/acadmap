import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircle, MapPin, BookOpen } from 'lucide-react';
import { getCoursesForSlot } from '@/lib/time-table';
import { TimeTableParsedCourse, timeTableSlots } from '@/types/time-table';

interface TimetableProps {
  selectedCourses: TimeTableParsedCourse[];
}

const colors = {
  blue: {bg: 'bg-blue-50/90', hover: 'hover:bg-blue-100', text: 'text-blue-800', border: 'border-l-blue-500'},
  emerald: {bg: 'bg-emerald-50/90', hover: 'hover:bg-emerald-100', text: 'text-emerald-800', border: 'border-l-emerald-500'},
  purple: {bg: 'bg-purple-50/90', hover: 'hover:bg-purple-100', text: 'text-purple-800', border: 'border-l-purple-500'},
  amber: {bg: 'bg-amber-50/90', hover: 'hover:bg-amber-100', text: 'text-amber-800', border: 'border-l-amber-500'},
  pink: {bg: 'bg-pink-50/90', hover: 'hover:bg-pink-100', text: 'text-pink-800', border: 'border-l-pink-500'},
  cyan: {bg: 'bg-cyan-50/90', hover: 'hover:bg-cyan-100', text: 'text-cyan-800', border: 'border-l-cyan-500'},
  red: {bg: 'bg-red-50/90', hover: 'hover:bg-red-100', text: 'text-red-800', border: 'border-l-red-500'},
  indigo: {bg: 'bg-indigo-50/90', hover: 'hover:bg-indigo-100', text: 'text-indigo-800', border: 'border-l-indigo-500'},
  orange: {bg: 'bg-orange-50/90', hover: 'hover:bg-orange-100', text: 'text-orange-800', border: 'border-l-orange-500'},
  teal: {bg: 'bg-teal-50/90', hover: 'hover:bg-teal-100', text: 'text-teal-800', border: 'border-l-teal-500'},
};

function hashCode(str: string) {
  return str.split('').reduce((h, c) => Math.imul(31, h) + c.charCodeAt(0) | 0, 0);
}

const CourseCard = ({ course, colorScheme }: { course: TimeTableParsedCourse; colorScheme: typeof colors.blue }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger className="w-full">
        <div 
          className={`p-3 h-full transition-all duration-200 group
            ${colorScheme.bg} ${colorScheme.hover} ${colorScheme.text} 
            rounded-lg border-l-4 ${colorScheme.border}
            hover:scale-[1.02] hover:shadow-md`}
        >
          <div className="flex items-center gap-2 font-semibold mb-2">
            <BookOpen className="w-4 h-4 opacity-75" />
            {course.courseCode}
          </div>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <MapPin className="w-4 h-4 opacity-75" />
            {course.venue}
          </div>
          <div className="flex items-center gap-1 mt-2">
            <AlertCircle className="w-3 h-3 opacity-75" />
            <span className="text-xs font-medium uppercase tracking-wide opacity-75">
              {course.type}
            </span>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" className="p-3 max-w-xs">
        <div className="space-y-2">
          <div className="font-semibold">{course.instructor}</div>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export function Timetable({ selectedCourses }: TimetableProps) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = Array.from(new Set(timeTableSlots.map(slot => slot.time))).sort();

  const getCourseColor = (courseCode: string) => {
    const colorKeys = Object.keys(colors);
    return colors[colorKeys[Math.abs(hashCode(courseCode)) % colorKeys.length]];
  };

  return (
    <div className="rounded-xl border shadow-lg overflow-x-auto bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 z-20 w-[100px] font-bold bg-gray-100/95 backdrop-blur-sm text-gray-800">
              Time/Day
            </TableHead>
            {times.map((time) => (
              <TableHead 
                key={time} 
                className="text-center whitespace-nowrap min-w-[150px] font-semibold bg-gray-100/95 backdrop-blur-sm text-gray-800"
              >
                {time}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {days.map((day) => (
            <TableRow key={day} className="hover:bg-gray-50/50">
              <TableCell className="sticky left-0 z-10 font-medium text-gray-700 bg-gray-50/95 backdrop-blur-sm">
                {day}
              </TableCell>
              {times.map((time) => {
                const courses = getCoursesForSlot(day, time, selectedCourses);
                return (
                  <TableCell 
                    key={`${day}-${time}`} 
                    className="p-2 relative min-h-[120px]"
                  >
                    <div className="space-y-2">
                      {courses.map((course, idx) => (
                        <CourseCard
                          key={`${course.courseCode}-${idx}`}
                          course={course}
                          colorScheme={getCourseColor(course.courseCode)}
                        />
                      ))}
                      {courses.length === 0 && (
                        <div className="h-[120px] rounded-lg border-2 border-dashed border-gray-200" />
                      )}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Timetable;