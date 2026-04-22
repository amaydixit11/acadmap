'use client';

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
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    hover: "hover:bg-blue-100 dark:hover:bg-blue-900/40",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    hover: "hover:bg-emerald-100 dark:hover:bg-emerald-900/40",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/20",
    hover: "hover:bg-purple-100 dark:hover:bg-purple-900/40",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    hover: "hover:bg-amber-100 dark:hover:bg-amber-900/40",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
  },
  pink: {
    bg: "bg-pink-50 dark:bg-pink-950/20",
    hover: "hover:bg-pink-100 dark:hover:bg-pink-900/40",
    text: "text-pink-700 dark:text-pink-300",
    border: "border-pink-200 dark:border-pink-800",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-cyan-950/20",
    hover: "hover:bg-cyan-100 dark:hover:bg-cyan-900/40",
    text: "text-cyan-700 dark:text-cyan-300",
    border: "border-cyan-200 dark:border-cyan-800",
  },
  red: {
    bg: "bg-red-50 dark:bg-red-950/20",
    hover: "hover:bg-red-100 dark:hover:bg-red-900/40",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-200 dark:border-red-800",
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    hover: "hover:bg-indigo-100 dark:hover:bg-indigo-900/40",
    text: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-200 dark:border-indigo-800",
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
  I: "blue",
  J: "emerald",
  K: "purple",
  L: "amber",
  M: "pink",
  N: "cyan",
  O: "red",
  P: "indigo",
  Q: "blue",
  R: "emerald",
  S: "purple",
  T: "amber",
  U: "pink",
  V: "cyan",
  W: "red",
  X: "indigo",
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
        isCompact ? "p-1 sm:p-1.5" : "p-4 sm:p-5",
        "h-full transition-all duration-300 group relative",
        colorScheme.bg,
        colorScheme.hover,
        colorScheme.text,
        "rounded-xl border",
        colorScheme.border,
        "hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/5",
        isDraggable && "cursor-grab active:cursor-grabbing",
        isMoved && "ring-2 ring-amber-400 dark:ring-amber-500 ring-offset-2"
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
        <div className="absolute top-1 right-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
              "bg-rose-500 hover:bg-rose-600",
              "text-white shadow-sm",
              "transition-colors duration-150"
            )}
            title="Remove tile"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </div>
      )}
      
      {isCompact ? (
        <div className="space-y-1 flex flex-col justify-center h-full">
          <div className="font-black text-center text-[10px] uppercase tracking-tighter line-clamp-1">
            {course.courseCode}
          </div>
          <div className="text-[8px] font-bold text-center leading-none opacity-80 uppercase tracking-tighter truncate">
            {course.courseName}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full gap-1.5">
          <div className="font-black text-xs uppercase tracking-tighter">
            {course.courseCode}
          </div>
          <div className="text-[8px] font-black uppercase text-slate-400 tracking-tight flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5" />
            {course.venue}
          </div>
          <div className="mt-auto flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-current opacity-50" />
            <span className="text-[8px] font-black uppercase tracking-tight opacity-60 truncate">
              {course.type}
            </span>
          </div>
        </div>
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
            o => o.courseCode === course.courseCode && 
                 o.type === course.type &&
                 o.originalDay === day &&
                 o.originalTime === time
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

    // Find if there's an existing override that put this course HERE (at fromDay/fromTime)
    const existingIndex = slotOverrides.findIndex(
      (o) => o.courseCode === course.courseCode && 
             o.type === course.type &&
             o.newDay === fromDay &&
             o.newTime === fromTime
    );

    // Get the original position
    let originalDay = fromDay;
    let originalTime = fromTime;
    
    if (existingIndex !== -1) {
      // If we are moving a tile that was ALREADY moved, preserve its original source
      originalDay = slotOverrides[existingIndex].originalDay;
      originalTime = slotOverrides[existingIndex].originalTime;
    }

    // Check if we're moving back to original position
    if (originalDay === targetDay && originalTime === targetTime) {
      // Remove the override (moving back to original)
      if (existingIndex !== -1) {
        setSlotOverrides((prev) => prev.filter((_, i) => i !== existingIndex));
      }
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
        (o) => o.courseCode === course.courseCode && 
               o.type === course.type &&
               o.originalDay === day &&
               o.originalTime === time
      );
      // If this specific slot has an override, it's moved away, so hide it
      if (override) return false;
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
          <Table className="w-full min-w-[800px] sm:min-w-full table-fixed">
            <TableHeader>
              <TableRow
                className={cn("border-b", "border-gray-200 dark:border-gray-700")}
              >
                <TableHead
                  className={cn(
                    "w-12 sm:w-16 font-black transition-colors duration-300 sticky left-0 z-20",
                    "bg-slate-50/95 dark:bg-slate-900/95",
                    "backdrop-blur-sm",
                    "text-slate-400 uppercase tracking-tighter",
                    "text-[8px]"
                  )}
                >
                  <div className="text-center">Time</div>
                </TableHead>
                {times.map((time) => (
                  <TableHead
                    key={time}
                    className={cn(
                      "text-center font-black px-0.5 transition-colors duration-300",
                      "bg-slate-50/95 dark:bg-slate-900/95",
                      "backdrop-blur-sm",
                      "text-slate-400 uppercase tracking-tighter",
                      "text-[8px] w-[calc((100%-4rem)/8)]"
                    )}
                  >
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis">
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
                    "transition-colors duration-200 border-b group/row dense-row",
                    "hover:bg-slate-50/50 dark:hover:bg-slate-900/30",
                    "border-slate-100 dark:border-slate-800"
                  )}
                >
                  <TableCell
                    className={cn(
                      "sticky left-0 z-10 font-black transition-colors duration-300",
                      "bg-slate-50/95 dark:bg-slate-900/95 text-center",
                      "backdrop-blur-sm",
                      "text-slate-600 dark:text-slate-400 uppercase tracking-tighter",
                      "text-[8px] px-0.5 sm:px-1 border-r border-slate-100 dark:border-slate-800",
                      "w-12 sm:w-16"
                    )}
                  >
                    <div className="text-center">
                      <span>{day.slice(0, 3)}</span>
                    </div>
                  </TableCell>
                  {times.map((time) => {
                    const courses = getCoursesWithOverrides(day, time);
                    const isDropTarget = dragOverCell?.day === day && dragOverCell?.time === time;
                    return (
                      <TableCell
                        key={`${day}-${time}`}
                        className={cn(
                          "p-0.5 relative transition-colors duration-200 border-r border-slate-50 dark:border-slate-800/50",
                          isCompact
                            ? "h-[50px] sm:h-[60px]"
                            : "h-[70px] sm:h-[90px]",
                          isDropTarget && "bg-indigo-50/50 dark:bg-indigo-900/20"
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
                                  : "h-[70px] sm:h-[100px]",
                                "rounded-2xl border-2 border-dashed transition-all duration-300",
                                isDropTarget
                                  ? "border-indigo-400 dark:border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10 scale-[0.98]"
                                  : "border-slate-100 dark:border-slate-800 opacity-20"
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
