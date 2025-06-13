import React from "react";

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
import { AlertCircle, MapPin, BookOpen } from "lucide-react";
import { getCoursesForSlot } from "@/lib/time-table";
import {
  TimeTableParsedCourse,
  TimeTableSlotInfo,
  timeTableSlots,
} from "@/types/time-table";

interface TimetableProps {
  selectedCourses: TimeTableParsedCourse[];
  isCompact?: boolean;
}

const colors = {
  blue: {
    bg: "bg-blue-50/90",
    hover: "hover:bg-blue-100",
    text: "text-blue-800",
    border: "border-l-blue-500",
  },
  emerald: {
    bg: "bg-emerald-50/90",
    hover: "hover:bg-emerald-100",
    text: "text-emerald-800",
    border: "border-l-emerald-500",
  },
  purple: {
    bg: "bg-purple-50/90",
    hover: "hover:bg-purple-100",
    text: "text-purple-800",
    border: "border-l-purple-500",
  },
  amber: {
    bg: "bg-amber-50/90",
    hover: "hover:bg-amber-100",
    text: "text-amber-800",
    border: "border-l-amber-500",
  },
  pink: {
    bg: "bg-pink-50/90",
    hover: "hover:bg-pink-100",
    text: "text-pink-800",
    border: "border-l-pink-500",
  },
  cyan: {
    bg: "bg-cyan-50/90",
    hover: "hover:bg-cyan-100",
    text: "text-cyan-800",
    border: "border-l-cyan-500",
  },
  red: {
    bg: "bg-red-50/90",
    hover: "hover:bg-red-100",
    text: "text-red-800",
    border: "border-l-red-500",
  },
  indigo: {
    bg: "bg-indigo-50/90",
    hover: "hover:bg-indigo-100",
    text: "text-indigo-800",
    border: "border-l-indigo-500",
  },
  orange: {
    bg: "bg-orange-50/90",
    hover: "hover:bg-orange-100",
    text: "text-orange-800",
    border: "border-l-orange-500",
  },
  teal: {
    bg: "bg-teal-50/90",
    hover: "hover:bg-teal-100",
    text: "text-teal-800",
    border: "border-l-teal-500",
  },
};

function hashCode(str: string) {
  return str
    .split("")
    .reduce((h, c) => (Math.imul(31, h) + c.charCodeAt(0)) | 0, 0);
}

const CourseCard = ({
  course,
  colorScheme,
  isCompact,
}: {
  course: TimeTableSlotInfo;
  colorScheme: typeof colors.blue;
  isCompact?: boolean;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger className="w-full">
        <div
          className={`${isCompact ? "p-1" : "p-2"} h-full transition-all duration-200 group
            ${colorScheme.bg} ${colorScheme.hover} ${colorScheme.text} 
            rounded-md border-l-2 ${colorScheme.border}
            hover:scale-[1.01] hover:shadow-sm text-s`}
        >
          {isCompact ? (
            <div className="font-semibold text-center">{course.courseCode}</div>
          ) : (
            <>
              <div className="font-semibold mb-1 truncate">
                <BookOpen className="w-3 h-3 inline mr-1 opacity-75" />
                {course.courseCode}
              </div>
              <div className="text-s opacity-90 truncate">
                <MapPin className="w-3 h-3 inline mr-1 opacity-75" />
                {course.venue}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <AlertCircle className="w-2 h-2 opacity-75 flex-shrink-0" />
                <span className="text-s font-medium uppercase tracking-wide opacity-75 truncate">
                  {course.type}
                </span>
              </div>
            </>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="p-3 max-w-xs">
        <div className="space-y-2">
          <div className="font-semibold">{course.courseCode}</div>
          <div className="text-sm">{course.venue}</div>
          <div className="text-sm capitalize">{course.type}</div>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export function Timetable({
  selectedCourses,
  isCompact = false,
}: TimetableProps) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = Array.from(
    new Set(timeTableSlots.map((slot) => slot.time))
  ).sort();

  type ColorKey = keyof typeof colors;

  // Ensure the keys are an array for predictable order
  const colorKeys: ColorKey[] = Object.keys(colors) as ColorKey[];

  const getCourseColor = (courseCode: string) => {
    // Ensure `hashCode` function is defined correctly
    const colorIndex = Math.abs(hashCode(courseCode)) % colorKeys.length;
    return colors[colorKeys[colorIndex]]; // TypeScript will know the keys are valid here
  };

  return (
    <div className="w-full rounded-xl border shadow-lg bg-white">
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-24 font-bold bg-gray-100/95 backdrop-blur-sm text-gray-800 text-center">
              Time/Day
            </TableHead>
            {times.map((time) => (
              <TableHead
                key={time}
                className="text-center font-semibold bg-gray-100/95 backdrop-blur-sm text-gray-800 px-1"
              >
                <div className="text-xs sm:text-sm">{time}</div>
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
                    className={`p-2 relative ${isCompact ? "min-h-[60px]" : "min-h-[120px]"}`}
                  >
                    <div className="space-y-2">
                      {courses.map((course, idx) => (
                        <CourseCard
                          key={`${course.courseCode}-${idx}`}
                          course={course}
                          colorScheme={getCourseColor(course.courseCode)}
                          isCompact={isCompact}
                        />
                      ))}
                      {courses.length === 0 && (
                        <div
                          className={`${isCompact ? "h-[60px]" : "h-[120px]"} rounded-lg border-2 border-dashed border-gray-200`}
                        />
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
