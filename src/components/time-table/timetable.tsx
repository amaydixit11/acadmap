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
import { AlertCircle, MapPin, BookOpen, AlertTriangle } from "lucide-react";
import { getCoursesForSlot } from "@/lib/time-table";
import {
  TimeTableParsedCourse,
  TimeTableSlotInfo,
  timeTableSlots,
} from "@/types/time-table";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TimetableProps {
  selectedCourses: TimeTableParsedCourse[];
  isCompact?: boolean;
  viewSlots?: boolean;
}

// const colors = {
//   blue: {
//     bg: "bg-blue-50/90 dark:bg-blue-900/30",
//     hover: "hover:bg-blue-100 dark:hover:bg-blue-800/40",
//     text: "text-blue-800 dark:text-blue-200",
//     border: "border-l-blue-500 dark:border-l-blue-400",
//   },
//   emerald: {
//     bg: "bg-emerald-50/90 dark:bg-emerald-900/30",
//     hover: "hover:bg-emerald-100 dark:hover:bg-emerald-800/40",
//     text: "text-emerald-800 dark:text-emerald-200",
//     border: "border-l-emerald-500 dark:border-l-emerald-400",
//   },
//   purple: {
//     bg: "bg-purple-50/90 dark:bg-purple-900/30",
//     hover: "hover:bg-purple-100 dark:hover:bg-purple-800/40",
//     text: "text-purple-800 dark:text-purple-200",
//     border: "border-l-purple-500 dark:border-l-purple-400",
//   },
//   amber: {
//     bg: "bg-amber-50/90 dark:bg-amber-900/30",
//     hover: "hover:bg-amber-100 dark:hover:bg-amber-800/40",
//     text: "text-amber-800 dark:text-amber-200",
//     border: "border-l-amber-500 dark:border-l-amber-400",
//   },
//   pink: {
//     bg: "bg-pink-50/90 dark:bg-pink-900/30",
//     hover: "hover:bg-pink-100 dark:hover:bg-pink-800/40",
//     text: "text-pink-800 dark:text-pink-200",
//     border: "border-l-pink-500 dark:border-l-pink-400",
//   },
//   cyan: {
//     bg: "bg-cyan-50/90 dark:bg-cyan-900/30",
//     hover: "hover:bg-cyan-100 dark:hover:bg-cyan-800/40",
//     text: "text-cyan-800 dark:text-cyan-200",
//     border: "border-l-cyan-500 dark:border-l-cyan-400",
//   },
//   red: {
//     bg: "bg-red-50/90 dark:bg-red-900/30",
//     hover: "hover:bg-red-100 dark:hover:bg-red-800/40",
//     text: "text-red-800 dark:text-red-200",
//     border: "border-l-red-500 dark:border-l-red-400",
//   },
//   indigo: {
//     bg: "bg-indigo-50/90 dark:bg-indigo-900/30",
//     hover: "hover:bg-indigo-100 dark:hover:bg-indigo-800/40",
//     text: "text-indigo-800 dark:text-indigo-200",
//     border: "border-l-indigo-500 dark:border-l-indigo-400",
//   },
//   orange: {
//     bg: "bg-orange-50/90 dark:bg-orange-900/30",
//     hover: "hover:bg-orange-100 dark:hover:bg-orange-800/40",
//     text: "text-orange-800 dark:text-orange-200",
//     border: "border-l-orange-500 dark:border-l-orange-400",
//   },
//   teal: {
//     bg: "bg-teal-50/90 dark:bg-teal-900/30",
//     hover: "hover:bg-teal-100 dark:hover:bg-teal-800/40",
//     text: "text-teal-800 dark:text-teal-200",
//     border: "border-l-teal-500 dark:border-l-teal-400",
//   },
// };

const colors = {
  // A - Blue
  blue: {
    bg: "bg-blue-50/90 dark:bg-blue-900/30",
    hover: "hover:bg-blue-100 dark:hover:bg-blue-800/40",
    text: "text-blue-800 dark:text-blue-200",
    border: "border-l-blue-500 dark:border-l-blue-400",
  },
  // B - Emerald
  emerald: {
    bg: "bg-emerald-50/90 dark:bg-emerald-900/30",
    hover: "hover:bg-emerald-100 dark:hover:bg-emerald-800/40",
    text: "text-emerald-800 dark:text-emerald-200",
    border: "border-l-emerald-500 dark:border-l-emerald-400",
  },
  // C - Purple
  purple: {
    bg: "bg-purple-50/90 dark:bg-purple-900/30",
    hover: "hover:bg-purple-100 dark:hover:bg-purple-800/40",
    text: "text-purple-800 dark:text-purple-200",
    border: "border-l-purple-500 dark:border-l-purple-400",
  },
  // D - Amber
  amber: {
    bg: "bg-amber-50/90 dark:bg-amber-900/30",
    hover: "hover:bg-amber-100 dark:hover:bg-amber-800/40",
    text: "text-amber-800 dark:text-amber-200",
    border: "border-l-amber-500 dark:border-l-amber-400",
  },
  // E - Pink
  pink: {
    bg: "bg-pink-50/90 dark:bg-pink-900/30",
    hover: "hover:bg-pink-100 dark:hover:bg-pink-800/40",
    text: "text-pink-800 dark:text-pink-200",
    border: "border-l-pink-500 dark:border-l-pink-400",
  },
  // F - Cyan
  cyan: {
    bg: "bg-cyan-50/90 dark:bg-cyan-900/30",
    hover: "hover:bg-cyan-100 dark:hover:bg-cyan-800/40",
    text: "text-cyan-800 dark:text-cyan-200",
    border: "border-l-cyan-500 dark:border-l-cyan-400",
  },
  // G - Red
  red: {
    bg: "bg-red-50/90 dark:bg-red-900/30",
    hover: "hover:bg-red-100 dark:hover:bg-red-800/40",
    text: "text-red-800 dark:text-red-200",
    border: "border-l-red-500 dark:border-l-red-400",
  },
  // H - Indigo
  indigo: {
    bg: "bg-indigo-50/90 dark:bg-indigo-900/30",
    hover: "hover:bg-indigo-100 dark:hover:bg-indigo-800/40",
    text: "text-indigo-800 dark:text-indigo-200",
    border: "border-l-indigo-500 dark:border-l-indigo-400",
  },
  // I - Orange
  orange: {
    bg: "bg-orange-50/90 dark:bg-orange-900/30",
    hover: "hover:bg-orange-100 dark:hover:bg-orange-800/40",
    text: "text-orange-800 dark:text-orange-200",
    border: "border-l-orange-500 dark:border-l-orange-400",
  },
  // J - Teal
  teal: {
    bg: "bg-teal-50/90 dark:bg-teal-900/30",
    hover: "hover:bg-teal-100 dark:hover:bg-teal-800/40",
    text: "text-teal-800 dark:text-teal-200",
    border: "border-l-teal-500 dark:border-l-teal-400",
  },
  // K - Lime
  lime: {
    bg: "bg-lime-50/90 dark:bg-lime-900/30",
    hover: "hover:bg-lime-100 dark:hover:bg-lime-800/40",
    text: "text-lime-800 dark:text-lime-200",
    border: "border-l-lime-500 dark:border-l-lime-400",
  },
  // L - Fuchsia
  fuchsia: {
    bg: "bg-fuchsia-50/90 dark:bg-fuchsia-900/30",
    hover: "hover:bg-fuchsia-100 dark:hover:bg-fuchsia-800/40",
    text: "text-fuchsia-800 dark:text-fuchsia-200",
    border: "border-l-fuchsia-500 dark:border-l-fuchsia-400",
  },
  // M - Sky
  sky: {
    bg: "bg-sky-50/90 dark:bg-sky-900/30",
    hover: "hover:bg-sky-100 dark:hover:bg-sky-800/40",
    text: "text-sky-800 dark:text-sky-200",
    border: "border-l-sky-500 dark:border-l-sky-400",
  },
  // N - Rose
  rose: {
    bg: "bg-rose-50/90 dark:bg-rose-900/30",
    hover: "hover:bg-rose-100 dark:hover:bg-rose-800/40",
    text: "text-rose-800 dark:text-rose-200",
    border: "border-l-rose-500 dark:border-l-rose-400",
  },
  // O - Violet
  violet: {
    bg: "bg-violet-50/90 dark:bg-violet-900/30",
    hover: "hover:bg-violet-100 dark:hover:bg-violet-800/40",
    text: "text-violet-800 dark:text-violet-200",
    border: "border-l-violet-500 dark:border-l-violet-400",
  },
  // P - Yellow
  yellow: {
    bg: "bg-yellow-50/90 dark:bg-yellow-900/30",
    hover: "hover:bg-yellow-100 dark:hover:bg-yellow-800/40",
    text: "text-yellow-800 dark:text-yellow-200",
    border: "border-l-yellow-500 dark:border-l-yellow-400",
  },
  // Q - Slate
  slate: {
    bg: "bg-slate-50/90 dark:bg-slate-900/30",
    hover: "hover:bg-slate-100 dark:hover:bg-slate-800/40",
    text: "text-slate-800 dark:text-slate-200",
    border: "border-l-slate-500 dark:border-l-slate-400",
  },
  // R - Green
  green: {
    bg: "bg-green-50/90 dark:bg-green-900/30",
    hover: "hover:bg-green-100 dark:hover:bg-green-800/40",
    text: "text-green-800 dark:text-green-200",
    border: "border-l-green-500 dark:border-l-green-400",
  },
  // S - Stone
  stone: {
    bg: "bg-stone-50/90 dark:bg-stone-900/30",
    hover: "hover:bg-stone-100 dark:hover:bg-stone-800/40",
    text: "text-stone-800 dark:text-stone-200",
    border: "border-l-stone-500 dark:border-l-stone-400",
  },
  // T - Zinc
  zinc: {
    bg: "bg-zinc-50/90 dark:bg-zinc-900/30",
    hover: "hover:bg-zinc-100 dark:hover:bg-zinc-800/40",
    text: "text-zinc-800 dark:text-zinc-200",
    border: "border-l-zinc-500 dark:border-l-zinc-400",
  },
  // U - Neutral
  neutral: {
    bg: "bg-neutral-50/90 dark:bg-neutral-900/30",
    hover: "hover:bg-neutral-100 dark:hover:bg-neutral-800/40",
    text: "text-neutral-800 dark:text-neutral-200",
    border: "border-l-neutral-500 dark:border-l-neutral-400",
  },
  // V - Gray
  gray: {
    bg: "bg-gray-50/90 dark:bg-gray-900/30",
    hover: "hover:bg-gray-100 dark:hover:bg-gray-800/40",
    text: "text-gray-800 dark:text-gray-200",
    border: "border-l-gray-500 dark:border-l-gray-400",
  },
  // W - Warmgray (using stone as alternative)
  warmgray: {
    bg: "bg-stone-100/90 dark:bg-stone-800/30",
    hover: "hover:bg-stone-200 dark:hover:bg-stone-700/40",
    text: "text-stone-900 dark:text-stone-100",
    border: "border-l-stone-600 dark:border-l-stone-300",
  },
  // X - Coolgray (using slate as alternative)
  coolgray: {
    bg: "bg-slate-100/90 dark:bg-slate-800/30",
    hover: "hover:bg-slate-200 dark:hover:bg-slate-700/40",
    text: "text-slate-900 dark:text-slate-100",
    border: "border-l-slate-600 dark:border-l-slate-300",
  },
};

const slotColorMap: Record<string, keyof typeof colors> = {
  A: "blue",
  B: "emerald",
  C: "purple",
  D: "amber",
  E: "pink",
  F: "cyan",
  G: "red",
  H: "indigo",
  I: "orange",
  J: "teal",
  K: "lime",
  L: "fuchsia",
  M: "sky",
  N: "rose",
  O: "violet",
  P: "yellow",
  Q: "slate",
  R: "green",
  S: "stone",
  T: "zinc",
  U: "neutral",
  V: "gray",
  W: "warmgray",
  X: "coolgray",
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
  onClick,
}: {
  course: TimeTableSlotInfo;
  colorScheme: typeof colors.blue;
  isCompact?: boolean;
  onClick?: () => void;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger className="w-full">
        <Link href={`/courses/${course.courseCode.toLowerCase().split("/")[0]}`}>
          <div
            className={cn(
              isCompact ? "p-1" : "p-2 sm:p-3",
              "h-full transition-all duration-200 group",
              colorScheme.bg,
              colorScheme.hover,
              colorScheme.text,
              "rounded-md border-l-2",
              colorScheme.border,
              "hover:scale-[1.01] hover:shadow-sm dark:hover:shadow-black/20"
            )}
            onClick={onClick}
          >
            {isCompact ? (
              <div className="space-y-1">
                <div
                  className={`font-semibold text-center text-xs sm:text-sm ${colorScheme.text}`}
                >
                  {course.courseCode}
                </div>
                <div
                  className={`text-xs font-medium text-center leading-tight ${colorScheme.text}`}
                >
                  {course.courseName}
                </div>
              </div>
            ) : (
              <>
                <div className="font-semibold mb-1 truncate text-xs sm:text-sm">
                  <BookOpen className="w-3 h-3 inline mr-1 opacity-75" />
                  {course.courseCode}
                </div>
                <div className="text-xs sm:text-sm opacity-90 truncate">
                  <MapPin className="w-3 h-3 inline mr-1 opacity-75" />
                  {course.venue}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <AlertCircle className="w-2 h-2 opacity-75 flex-shrink-0" />
                  <span className="text-xs font-medium uppercase tracking-wide opacity-75 truncate">
                    {course.type}
                  </span>
                </div>
              </>
            )}
          </div>
        </Link>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className={cn(
          "p-3 max-w-xs z-50",
          "bg-white dark:bg-black",
          "border border-gray-200 dark:border-gray-700",
          "shadow-md dark:shadow-black/50"
        )}
      >
        <div className="space-y-2">
          <div
            className={cn(
              "font-semibold text-sm",
              "text-gray-900 dark:text-white"
            )}
          >
            {course.courseCode}
          </div>
          <div className={cn("text-sm", "text-gray-700 dark:text-gray-300")}>
            {course.courseName}
          </div>
          <div className={cn("text-sm", "text-gray-700 dark:text-gray-300")}>
            {course.venue}
          </div>
          <div
            className={cn(
              "text-sm capitalize",
              "text-gray-600 dark:text-gray-400"
            )}
          >
            {course.type}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export function Timetable({
  selectedCourses,
  isCompact = false,
  viewSlots = false,
}: TimetableProps) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = Array.from(
    new Set(timeTableSlots.map((slot) => slot.time))
  ).sort();

  type ColorKey = keyof typeof colors;

  // Ensure the keys are an array for predictable order
  const colorKeys: ColorKey[] = Object.keys(colors) as ColorKey[];

  // const getSlotColor = (courseCode: string) => {
  //   // Ensure `hashCode` function is defined correctly
  //   const colorIndex = Math.abs(hashCode(courseCode)) % colorKeys.length;
  //   return colors[colorKeys[colorIndex]]; // TypeScript will know the keys are valid here
  // };

  const getSlotColor = (course: TimeTableSlotInfo) => {
    const slotLetter = course.slotLetter as keyof typeof slotColorMap;
    const colorKey = slotColorMap[slotLetter] || "blue";
    return colors[colorKey as keyof typeof colors];
  };

  return (
    <div
      className={cn(
        "w-full rounded-xl border shadow-lg transition-all duration-300",
        "bg-white dark:bg-black",
        "border-gray-200 dark:border-gray-700",
        "shadow-gray-200/50 dark:shadow-black/50",
        "overflow-hidden" // Prevent content overflow
      )}
    >
      {/* Mobile-optimized scrollable container */}
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[600px] sm:min-w-full">
          <TableHeader>
            <TableRow
              className={cn("border-b", "border-gray-200 dark:border-gray-700")}
            >
              <TableHead
                className={cn(
                  "w-16 sm:w-24 font-bold text-center transition-colors duration-300 sticky left-0 z-20",
                  "bg-gray-100/95 dark:bg-gray-900/95",
                  "backdrop-blur-sm",
                  "text-gray-800 dark:text-white",
                  "text-xs sm:text-sm"
                )}
              >
                <div className="px-1">Time</div>
              </TableHead>
              {times.map((time) => (
                <TableHead
                  key={time}
                  className={cn(
                    "text-center font-semibold px-1 sm:px-2 transition-colors duration-300 min-w-[80px] sm:min-w-[120px]",
                    "bg-gray-100/95 dark:bg-gray-900/95",
                    "backdrop-blur-sm",
                    "text-gray-800 dark:text-white"
                  )}
                >
                  <div className="text-xs sm:text-sm whitespace-nowrap">
                    {time}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {days.map((day) => (
              <TableRow
                key={day}
                className={cn(
                  "transition-colors duration-200 border-b",
                  "hover:bg-gray-50/50 dark:hover:bg-gray-900/30",
                  "border-gray-200/50 dark:border-gray-700/50"
                )}
              >
                <TableCell
                  className={cn(
                    "sticky left-0 z-10 font-medium transition-colors duration-300",
                    "bg-gray-50/95 dark:bg-gray-900/95",
                    "backdrop-blur-sm",
                    "text-gray-700 dark:text-gray-200",
                    "text-xs sm:text-sm px-1 sm:px-4"
                  )}
                >
                  <div className="text-center sm:text-left">
                    <span className="sm:hidden">{day.slice(0, 3)}</span>
                    <span className="hidden sm:inline">{day}</span>
                  </div>
                </TableCell>
                {times.map((time) => {
                  const courses = getCoursesForSlot(day, time, selectedCourses);
                  return (
                    <TableCell
                      key={`${day}-${time}`}
                      className={cn(
                        "p-1 sm:p-2 relative",
                        isCompact
                          ? "min-h-[50px] sm:min-h-[60px]"
                          : "min-h-[80px] sm:min-h-[120px]"
                      )}
                    >
                      <div className="space-y-1 sm:space-y-2">
                        <div className="">
                          {viewSlots &&
                            timeTableSlots.map((cell) => {
                              if (cell.day === day && cell.time === time) {
                                return (
                                  <span
                                    // key={cell.slots}
                                    className={cn(
                                      "sm:text-xs font-mono font-medium px-1 py-0.5 rounded",
                                      "bg-gray-200/70 dark:bg-gray-800/70"
                                    )}
                                  >
                                    Slot {cell.slots}
                                  </span>
                                );
                              }
                            })}
                        </div>
                        {courses.map((course, idx) => (
                          <CourseCard
                            key={`${course.courseCode}-${idx}`}
                            course={course}
                            colorScheme={getSlotColor(course)}
                            isCompact={isCompact}
                            // replace the navigate with next navigater whatever it is
                            // onClick={() => navigate(`/courses/${course.courseCode.toLowerCase()}`)}
                          />
                        ))}
                        {courses.length === 0 && (
                          <div
                            className={cn(
                              isCompact
                                ? "h-[50px] sm:h-[60px]"
                                : "h-[80px] sm:h-[120px]",
                              "rounded-lg border-2 border-dashed transition-colors duration-300",
                              "border-gray-200 dark:border-gray-700"
                            )}
                          />
                        )}
                        {courses.length > 1 && (
                          <div className="absolute top-1 right-1">
                            <AlertTriangle className="w-3 h-3 text-amber-500" />
                          </div>
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
    </div>
  );
}

export default Timetable;
