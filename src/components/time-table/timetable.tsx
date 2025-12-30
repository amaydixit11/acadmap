import React, { useState, useMemo, useCallback, useRef } from "react";

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
import { AlertCircle, MapPin, BookOpen, AlertTriangle, GripVertical, RotateCcw, X, Download, Calendar } from "lucide-react";
import { getCoursesForSlot } from "@/lib/time-table";
import {
  TimeTableParsedCourse,
  TimeTableSlotInfo,
  timeTableSlots,
} from "@/types/time-table";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Type for tracking local position overrides
interface SlotOverride {
  courseCode: string;
  type: 'lecture' | 'tut' | 'lab';
  originalDay: string;
  originalTime: string;
  newDay: string;
  newTime: string;
}

// Type for tracking hidden/deleted tiles
interface HiddenTile {
  courseCode: string;
  type: 'lecture' | 'tut' | 'lab';
  day: string;
  time: string;
}

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
  isDraggable = false,
  onDragStart,
  onDelete,
  isMoved = false,
  day,
  time,
}: {
  course: TimeTableSlotInfo;
  colorScheme: typeof colors.blue;
  isCompact?: boolean;
  onClick?: () => void;
  isDraggable?: boolean;
  onDragStart?: (e: React.DragEvent, course: TimeTableSlotInfo, day: string, time: string) => void;
  onDelete?: (course: TimeTableSlotInfo, day: string, time: string) => void;
  isMoved?: boolean;
  day?: string;
  time?: string;
}) => {
  const cardContent = (
    <div
      className={cn(
        isCompact ? "p-1" : "p-2 sm:p-3",
        "h-full transition-all duration-200 group relative",
        colorScheme.bg,
        colorScheme.hover,
        colorScheme.text,
        "rounded-md border-l-2",
        colorScheme.border,
        "hover:scale-[1.01] hover:shadow-sm dark:hover:shadow-black/20",
        isDraggable && "cursor-grab active:cursor-grabbing",
        isMoved && "ring-2 ring-amber-400 dark:ring-amber-500 ring-offset-1"
      )}
      draggable={isDraggable}
      onDragStart={(e) => {
        if (isDraggable && onDragStart && day && time) {
          onDragStart(e, course, day, time);
        }
      }}
      onClick={onClick}
    >
      {/* Drag handle and delete button */}
      {isDraggable && (
        <div className="absolute top-1 right-1 flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (onDelete && day && time) {
                onDelete(course, day, time);
              }
            }}
            className={cn(
              "w-4 h-4 rounded-full flex items-center justify-center",
              "bg-red-500/80 hover:bg-red-600",
              "text-white",
              "transition-colors duration-150"
            )}
            title="Remove tile (temporary)"
          >
            <X className="w-2.5 h-2.5" />
          </button>
          <GripVertical className="w-3 h-3" />
        </div>
      )}
      {/* Moved indicator */}
      {isMoved && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 dark:bg-amber-500 rounded-full flex items-center justify-center">
          <span className="text-[8px] text-white font-bold">!</span>
        </div>
      )}
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
  );

  // If draggable, don't wrap in Link to allow drag events
  if (isDraggable) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-full" asChild>
            {cardContent}
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
              {isMoved && (
                <div className={cn("text-xs", "text-amber-600 dark:text-amber-400 font-medium")}>
                  ⚠️ Temporarily moved (resets on refresh)
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <Link href={`/courses/${course.courseCode.toLowerCase().split("/")[0]}`}>
            {cardContent}
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
};

export function Timetable({
  selectedCourses,
  isCompact = false,
  viewSlots = false,
}: TimetableProps) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = Array.from(
    new Set(timeTableSlots.map((slot) => slot.time))
  ).sort();

  // Ref for screenshot capture
  const timetableRef = useRef<HTMLDivElement>(null);

  // State for local position overrides (temporary, resets on refresh)
  const [slotOverrides, setSlotOverrides] = useState<SlotOverride[]>([]);
  const [hiddenTiles, setHiddenTiles] = useState<HiddenTile[]>([]);
  const [dragOverCell, setDragOverCell] = useState<{ day: string; time: string } | null>(null);
  const [isDragMode, setIsDragMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  // Track what's being dragged
  const [draggedItem, setDraggedItem] = useState<{
    course: TimeTableSlotInfo;
    fromDay: string;
    fromTime: string;
  } | null>(null);

  type ColorKey = keyof typeof colors;

  const colorKeys: ColorKey[] = Object.keys(colors) as ColorKey[];

  const getSlotColor = (course: TimeTableSlotInfo) => {
    const slotLetter = course.slotLetter as keyof typeof slotColorMap;
    const colorKey = slotColorMap[slotLetter] || "blue";
    return colors[colorKey as keyof typeof colors];
  };

  // Screenshot download using canvas
  const handleDownloadScreenshot = useCallback(async () => {
    if (!timetableRef.current) return;
    
    setIsExporting(true);
    try {
      // Dynamic import html2canvas
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(timetableRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `timetable-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
      // Fallback: alert user
      alert('Screenshot failed. Please try using your browser\'s screenshot feature.');
    } finally {
      setIsExporting(false);
    }
  }, []);

  // Get current semester dates (approximate - user can adjust)
  const getSemesterDates = () => {
    const now = new Date();
    const year = now.getFullYear();
    // Assume current semester starts today and runs for 16 weeks
    const startDate = new Date(year, now.getMonth(), now.getDate());
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 16 * 7); // 16 weeks
    return { startDate, endDate };
  };

  // Generate ICS content
  const generateICSContent = useCallback(() => {
    const { startDate, endDate } = getSemesterDates();
    const dayMap: Record<string, number> = {
      'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5
    };

    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Acadmap//Timetable//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Course Timetable
X-WR-TIMEZONE:Asia/Kolkata
`;

    // Collect all visible courses with their positions
    const allCourses: { course: TimeTableSlotInfo; day: string; time: string }[] = [];
    
    days.forEach(day => {
      times.forEach(time => {
        const courses = getCoursesForSlot(day, time, selectedCourses);
        
        // Apply overrides and hidden tiles (same logic as getCoursesWithOverrides)
        courses.forEach(course => {
          // Check if hidden
          const isHidden = hiddenTiles.some(
            h => h.courseCode === course.courseCode && h.type === course.type && h.day === day && h.time === time
          );
          if (isHidden) return;
          
          // Check if moved away
          const override = slotOverrides.find(
            o => o.courseCode === course.courseCode && o.type === course.type
          );
          if (override && override.originalDay === day && override.originalTime === time) {
            return; // This course was moved away
          }
          
          allCourses.push({ course, day, time });
        });
        
        // Add moved courses
        slotOverrides.forEach(override => {
          if (override.newDay === day && override.newTime === time) {
            const isHidden = hiddenTiles.some(
              h => h.courseCode === override.courseCode && h.type === override.type && h.day === day && h.time === time
            );
            if (isHidden) return;
            
            const originalCourse = getCoursesForSlot(
              override.originalDay,
              override.originalTime,
              selectedCourses
            ).find(c => c.courseCode === override.courseCode && c.type === override.type);
            
            if (originalCourse) {
              allCourses.push({ course: originalCourse, day, time });
            }
          }
        });
      });
    });

    // Create events for each course
    allCourses.forEach(({ course, day, time }) => {
      const dayNumber = dayMap[day];
      const [startTime, endTime] = time.split('-');
      
      // Find first occurrence of this day after startDate
      const firstOccurrence = new Date(startDate);
      const daysUntilTarget = (dayNumber - firstOccurrence.getDay() + 7) % 7;
      firstOccurrence.setDate(firstOccurrence.getDate() + daysUntilTarget);
      
      // Parse times (format: "08:30")
      const [startHour, startMin] = startTime.split(':').map(Number);
      const [endHour, endMin] = endTime.split(':').map(Number);
      
      const eventStart = new Date(firstOccurrence);
      eventStart.setHours(startHour, startMin, 0, 0);
      
      const eventEnd = new Date(firstOccurrence);
      eventEnd.setHours(endHour, endMin, 0, 0);
      
      const formatDate = (d: Date) => {
        return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };
      
      const uid = `${course.courseCode}-${course.type}-${day}-${time}@acadmap`.replace(/\s+/g, '');
      
      icsContent += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(eventStart)}
DTEND:${formatDate(eventEnd)}
RRULE:FREQ=WEEKLY;UNTIL=${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${course.courseCode} (${course.type.toUpperCase()})
DESCRIPTION:${course.courseName || course.courseCode}
LOCATION:${course.venue || 'TBA'}
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Class in 15 minutes: ${course.courseCode}
END:VALARM
END:VEVENT
`;
    });

    icsContent += 'END:VCALENDAR';
    return icsContent;
  }, [selectedCourses, slotOverrides, hiddenTiles, days, times]);

  // Export to ICS
  const handleExportICS = useCallback(() => {
    const icsContent = generateICSContent();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `timetable-${new Date().toISOString().split('T')[0]}.ics`;
    link.click();
    URL.revokeObjectURL(link.href);
  }, [generateICSContent]);

  // Handle drag start
  const handleDragStart = useCallback((
    e: React.DragEvent,
    course: TimeTableSlotInfo,
    day: string,
    time: string
  ) => {
    setDraggedItem({ course, fromDay: day, fromTime: time });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", JSON.stringify({ courseCode: course.courseCode, type: course.type }));
  }, []);

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent, day: string, time: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverCell({ day, time });
  }, []);

  // Handle drag leave
  const handleDragLeave = useCallback(() => {
    setDragOverCell(null);
  }, []);

  // Handle drop
  const handleDrop = useCallback((e: React.DragEvent, targetDay: string, targetTime: string) => {
    e.preventDefault();
    setDragOverCell(null);

    if (!draggedItem) return;

    const { course, fromDay, fromTime } = draggedItem;

    // Don't do anything if dropping in the same cell
    if (fromDay === targetDay && fromTime === targetTime) {
      setDraggedItem(null);
      return;
    }

    // Find if there's an existing override for this course+type
    const existingIndex = slotOverrides.findIndex(
      (o) => o.courseCode === course.courseCode && o.type === course.type
    );

    // Get the original position (either from existing override or from the drag source)
    let originalDay = fromDay;
    let originalTime = fromTime;
    
    if (existingIndex !== -1) {
      // If we had an override, get the real original position
      originalDay = slotOverrides[existingIndex].originalDay;
      originalTime = slotOverrides[existingIndex].originalTime;
    }

    // Check if we're moving back to original position
    if (originalDay === targetDay && originalTime === targetTime) {
      // Remove the override (moving back to original)
      setSlotOverrides((prev) => prev.filter((_, i) => i !== existingIndex));
    } else {
      // Add or update the override
      const newOverride: SlotOverride = {
        courseCode: course.courseCode,
        type: course.type,
        originalDay,
        originalTime,
        newDay: targetDay,
        newTime: targetTime,
      };

      if (existingIndex !== -1) {
        setSlotOverrides((prev) => {
          const updated = [...prev];
          updated[existingIndex] = newOverride;
          return updated;
        });
      } else {
        setSlotOverrides((prev) => [...prev, newOverride]);
      }
    }

    setDraggedItem(null);
  }, [draggedItem, slotOverrides]);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDragOverCell(null);
  }, []);

  // Reset all overrides and hidden tiles
  const handleReset = useCallback(() => {
    setSlotOverrides([]);
    setHiddenTiles([]);
  }, []);

  // Handle delete/hide tile
  const handleDelete = useCallback((course: TimeTableSlotInfo, day: string, time: string) => {
    // Check if this tile is already in the hidden list
    const isAlreadyHidden = hiddenTiles.some(
      (h) => h.courseCode === course.courseCode && h.type === course.type && h.day === day && h.time === time
    );
    
    if (!isAlreadyHidden) {
      setHiddenTiles((prev) => [...prev, {
        courseCode: course.courseCode,
        type: course.type,
        day,
        time,
      }]);
    }
  }, [hiddenTiles]);

  // Get courses for a slot, applying overrides and hidden tiles
  const getCoursesWithOverrides = useCallback((day: string, time: string): (TimeTableSlotInfo & { isMoved?: boolean })[] => {
    const originalCourses = getCoursesForSlot(day, time, selectedCourses);
    
    // Filter out courses that have been moved away from this cell or are hidden
    const filteredCourses = originalCourses.filter((course) => {
      // Check if hidden
      const isHidden = hiddenTiles.some(
        (h) => h.courseCode === course.courseCode && h.type === course.type && h.day === day && h.time === time
      );
      if (isHidden) return false;
      
      // Check if moved away
      const override = slotOverrides.find(
        (o) => o.courseCode === course.courseCode && o.type === course.type
      );
      // If there's an override, check if this is the original position
      if (override) {
        return !(override.originalDay === day && override.originalTime === time);
      }
      return true;
    });

    // Add courses that have been moved TO this cell (also check if not hidden)
    const movedCourses: (TimeTableSlotInfo & { isMoved?: boolean })[] = [];
    slotOverrides.forEach((override) => {
      if (override.newDay === day && override.newTime === time) {
        // Check if this moved course is hidden at this location
        const isHidden = hiddenTiles.some(
          (h) => h.courseCode === override.courseCode && h.type === override.type && h.day === day && h.time === time
        );
        if (isHidden) return;
        
        // Find the original course info
        const originalCourse = getCoursesForSlot(
          override.originalDay,
          override.originalTime,
          selectedCourses
        ).find((c) => c.courseCode === override.courseCode && c.type === override.type);
        
        if (originalCourse) {
          movedCourses.push({ ...originalCourse, isMoved: true });
        }
      }
    });

    return [...filteredCourses, ...movedCourses];
  }, [selectedCourses, slotOverrides, hiddenTiles]);

  return (
    <div className="space-y-4">
      {/* Drag mode toggle and reset button */}
      <div
        className={cn(
          "flex items-center justify-between gap-4 p-3 rounded-lg",
          "bg-white/50 dark:bg-gray-800/50",
          "backdrop-blur-sm",
          "border border-gray-200/50 dark:border-gray-700/50",
          "shadow-sm dark:shadow-gray-900/20"
        )}
      >
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="drag-mode"
            checked={isDragMode}
            onChange={(e) => setIsDragMode(e.target.checked)}
            className={cn(
              "w-4 h-4 rounded",
              "text-blue-600 dark:text-blue-400",
              "bg-gray-100 dark:bg-gray-700",
              "border-gray-300 dark:border-gray-600",
              "focus:ring-blue-500 dark:focus:ring-blue-400",
              "focus:ring-2 transition-colors duration-200"
            )}
          />
          <label
            htmlFor="drag-mode"
            className={cn(
              "text-sm font-medium cursor-pointer select-none",
              "text-gray-700 dark:text-gray-300",
              "hover:text-gray-900 dark:hover:text-gray-100",
              "transition-colors duration-200"
            )}
          >
            Edit Mode
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              (Drag tiles to explore)
            </span>
          </label>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Export buttons */}
          <button
            onClick={handleDownloadScreenshot}
            disabled={isExporting}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium",
              "bg-green-100 dark:bg-green-900/30",
              "text-green-700 dark:text-green-300",
              "hover:bg-green-200 dark:hover:bg-green-800/40",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-colors duration-200"
            )}
            title="Download as PNG image"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{isExporting ? 'Saving...' : 'Screenshot'}</span>
          </button>
          
          <button
            onClick={handleExportICS}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium",
              "bg-purple-100 dark:bg-purple-900/30",
              "text-purple-700 dark:text-purple-300",
              "hover:bg-purple-200 dark:hover:bg-purple-800/40",
              "transition-colors duration-200"
            )}
            title="Export to calendar (.ics) with reminders"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Calendar</span>
          </button>

          {(slotOverrides.length > 0 || hiddenTiles.length > 0) && (
            <button
              onClick={handleReset}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium",
                "bg-amber-100 dark:bg-amber-900/30",
                "text-amber-700 dark:text-amber-300",
                "hover:bg-amber-200 dark:hover:bg-amber-800/40",
                "transition-colors duration-200"
              )}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset ({slotOverrides.length + hiddenTiles.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Info banner when in drag mode */}
      {isDragMode && (
        <div
          className={cn(
            "flex items-center gap-2 p-3 rounded-lg text-sm",
            "bg-blue-50 dark:bg-blue-900/20",
            "text-blue-700 dark:text-blue-300",
            "border border-blue-200/50 dark:border-blue-700/50"
          )}
        >
          <GripVertical className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>Edit Mode Active:</strong> Drag course tiles to different slots to explore alternatives. 
            Changes are temporary and will reset when you refresh the page.
          </span>
        </div>
      )}

      <div
        ref={timetableRef}
        className={cn(
          "w-full rounded-xl border shadow-lg transition-all duration-300",
          "bg-white dark:bg-black",
          "border-gray-200 dark:border-gray-700",
          "shadow-gray-200/50 dark:shadow-black/50",
          "overflow-hidden"
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
                    const courses = getCoursesWithOverrides(day, time);
                    const isDropTarget = dragOverCell?.day === day && dragOverCell?.time === time;
                    return (
                      <TableCell
                        key={`${day}-${time}`}
                        className={cn(
                          "p-1 sm:p-2 relative transition-colors duration-200",
                          isCompact
                            ? "min-h-[50px] sm:min-h-[60px]"
                            : "min-h-[80px] sm:min-h-[120px]",
                          isDropTarget && "bg-blue-100/50 dark:bg-blue-900/30"
                        )}
                        onDragOver={(e) => isDragMode && handleDragOver(e, day, time)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => isDragMode && handleDrop(e, day, time)}
                      >
                        <div className="space-y-1 sm:space-y-2">
                          <div className="">
                            {viewSlots &&
                              timeTableSlots.map((cell, cellIdx) => {
                                if (cell.day === day && cell.time === time) {
                                  return (
                                    <span
                                      key={cellIdx}
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
                              key={`${course.courseCode}-${course.type}-${idx}`}
                              course={course}
                              colorScheme={getSlotColor(course)}
                              isCompact={isCompact}
                              isDraggable={isDragMode}
                              onDragStart={handleDragStart}
                              onDelete={handleDelete}
                              isMoved={course.isMoved}
                              day={day}
                              time={time}
                            />
                          ))}
                          {courses.length === 0 && (
                            <div
                              className={cn(
                                isCompact
                                  ? "h-[50px] sm:h-[60px]"
                                  : "h-[80px] sm:h-[120px]",
                                "rounded-lg border-2 border-dashed transition-colors duration-300",
                                isDropTarget
                                  ? "border-blue-400 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                                  : "border-gray-200 dark:border-gray-700"
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
    </div>
  );
}

export default Timetable;
