import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { TimeTableParsedCourse } from "@/types/time-table";
import { Search, X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeTableCourseListProps {
  courses: TimeTableParsedCourse[];
  selectedCourses: TimeTableParsedCourse[];
  onCourseSelect: (course: TimeTableParsedCourse) => void;
}

type FilterType = "venue" | "code" | "instructor" | "slot";

export function TimeTableCourseList({
  courses,
  selectedCourses,
  onCourseSelect,
}: TimeTableCourseListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("code");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  React.useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);

    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const sortedAndFilteredCourses = [...courses]
    .filter((course) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();

      switch (filterType) {
        case "venue":
          const lectureVenue = course.lectureVenue || "NA";
          const tutorialVenue = course.tutorialVenue || "NA";
          const labVenue = course.labVenue || "NA";
          return (
            (lectureVenue !== "NA" &&
              lectureVenue.toLowerCase().includes(term)) ||
            (tutorialVenue !== "NA" &&
              tutorialVenue.toLowerCase().includes(term)) ||
            (labVenue !== "NA" && labVenue.toLowerCase().includes(term))
          );
        case "code":
          return course.code.toLowerCase().includes(term);
        case "instructor":
          return course.instructor.toLowerCase().includes(term);
        case "slot":
          const lectureSlot = course.lectureSlot || "NA";
          const tutorialSlot = course.tutorialSlot || "NA";
          const labSlot = course.labSlot || "NA";
          return (
            (lectureSlot !== "NA" &&
              lectureSlot.toLowerCase().includes(term)) ||
            (tutorialSlot !== "NA" &&
              tutorialSlot.toLowerCase().includes(term)) ||
            (labSlot !== "NA" && labSlot.toLowerCase().includes(term))
          );
        default:
          return true;
      }
    })
    .sort((a, b) => {
      const cleanCode = (code: string): string => code.split("/")[0];
      const cleanA = cleanCode(a.code);
      const cleanB = cleanCode(b.code);

      const regexAAADDD = /^[A-Z]{3}\d{3}$/;
      const isATypeAAADDD = regexAAADDD.test(cleanA);
      const isBTypeAAADDD = regexAAADDD.test(cleanB);

      if (isATypeAAADDD && !isBTypeAAADDD) return -1;
      if (!isATypeAAADDD && isBTypeAAADDD) return 1;

      const numA = parseInt(cleanA.match(/\d{3}$/)?.[0] || "0", 10);
      const numB = parseInt(cleanB.match(/\d{3}$/)?.[0] || "0", 10);

      if (numA !== numB) return numA - numB;

      const lettersA = cleanA.match(/^[A-Z]+/)?.[0] || "";
      const lettersB = cleanB.match(/^[A-Z]+/)?.[0] || "";

      return lettersA.localeCompare(lettersB);
    });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const coursesToAdd = sortedAndFilteredCourses.filter(
        (course) =>
          !selectedCourses.some((selected) => selected.code === course.code)
      );
      coursesToAdd.forEach((course) => onCourseSelect(course));
    } else {
      sortedAndFilteredCourses.forEach((course) => {
        if (selectedCourses.some((selected) => selected.code === course.code)) {
          onCourseSelect(course);
        }
      });
    }
  };

  const allFilteredSelected =
    sortedAndFilteredCourses.length > 0 &&
    sortedAndFilteredCourses.every((course) =>
      selectedCourses.some((selected) => selected.code === course.code)
    );

  const clearSearch = () => {
    setSearchTerm("");
  };

  const toggleCourseExpand = (courseCode: string) => {
    setExpandedCourse(expandedCourse === courseCode ? null : courseCode);
  };

  const MobileView = () => (
    <div className="space-y-3">
      {sortedAndFilteredCourses.map((course) => (
        <Card
          key={course.code}
          className={cn(
            "w-full transition-all duration-200",
            "bg-white/70 dark:bg-gray-900/70",
            "backdrop-blur-sm",
            "border border-gray-200/50 dark:border-gray-700/50",
            "hover:shadow-md dark:hover:shadow-black/50",
            "hover:bg-white/90 dark:hover:bg-gray-900/90",
            selectedCourses.some((c) => c.code === course.code) &&
              "ring-2 ring-blue-500/30 dark:ring-blue-400/40"
          )}
        >
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedCourses.some((c) => c.code === course.code)}
                  onCheckedChange={() => onCourseSelect(course)}
                  className={cn(
                    "data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500",
                    "data-[state=checked]:border-blue-600 dark:data-[state=checked]:border-blue-500",
                    "border-gray-300 dark:border-gray-600"
                  )}
                />
                <div>
                  <div
                    className={cn(
                      "font-semibold text-sm",
                      "text-gray-900 dark:text-gray-100"
                    )}
                  >
                    {course.code}
                  </div>
                  <div
                    className={cn(
                      "text-xs",
                      "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {course.title}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleCourseExpand(course.code)}
                className={cn(
                  "h-8 w-8 p-0",
                  "hover:bg-gray-100 dark:hover:bg-gray-800/30",
                  "text-gray-600 dark:text-gray-400",
                  "hover:text-gray-900 dark:hover:text-gray-100"
                )}
              >
                {expandedCourse === course.code ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            {expandedCourse === course.code && (
              <div
                className={cn(
                  "mt-3 space-y-2 text-sm",
                  "p-3 rounded-lg",
                  "bg-gray-50/50 dark:bg-gray-800/20",
                  "border border-gray-200/30 dark:border-gray-700/30"
                )}
              >
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div
                    className={cn(
                      "text-gray-600 dark:text-gray-400",
                      "font-medium"
                    )}
                  >
                    L-T-P:
                  </div>
                  <div className="text-gray-900 dark:text-gray-100">
                    {course.ltp}
                  </div>
                  <div
                    className={cn(
                      "text-gray-600 dark:text-gray-400",
                      "font-medium"
                    )}
                  >
                    Credits:
                  </div>
                  <div className="text-gray-900 dark:text-gray-100">
                    {course.credits.toString()}
                  </div>
                </div>

                {course.lectureSlot !== "NA" && (
                  <div className="space-y-1">
                    <div
                      className={cn(
                        "text-blue-600 dark:text-blue-400",
                        "font-medium text-xs"
                      )}
                    >
                      Lecture:
                    </div>
                    <div
                      className={cn(
                        "text-blue-900 dark:text-blue-100",
                        "px-2 py-1 rounded",
                        "bg-blue-100 dark:bg-blue-800/40",
                        "text-xs"
                      )}
                    >
                      {`${course.lectureSlot} (${course.lectureVenue})`}
                    </div>
                  </div>
                )}

                {course.tutorialSlot !== "NA" && (
                  <div className="space-y-1">
                    <div
                      className={cn(
                        "text-emerald-600 dark:text-emerald-400",
                        "font-medium text-xs"
                      )}
                    >
                      Tutorial:
                    </div>
                    <div
                      className={cn(
                        "text-emerald-900 dark:text-emerald-100",
                        "px-2 py-1 rounded",
                        "bg-emerald-100 dark:bg-emerald-800/40",
                        "text-xs"
                      )}
                    >
                      {`${course.tutorialSlot} (${course.tutorialVenue})`}
                    </div>
                  </div>
                )}

                {course.labSlot !== "NA" && (
                  <div className="space-y-1">
                    <div
                      className={cn(
                        "text-purple-600 dark:text-purple-400",
                        "font-medium text-xs"
                      )}
                    >
                      Lab:
                    </div>
                    <div
                      className={cn(
                        "text-purple-900 dark:text-purple-100",
                        "px-2 py-1 rounded",
                        "bg-purple-100 dark:bg-purple-800/40",
                        "text-xs"
                      )}
                    >
                      {`${course.labSlot} (${course.labVenue})`}
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <div
                    className={cn(
                      "text-gray-600 dark:text-gray-400",
                      "font-medium text-xs"
                    )}
                  >
                    Instructor:
                  </div>
                  <div className="space-y-1">
                    {(course?.instructor ?? "")
                      .split(",")
                      .filter(Boolean)
                      .map((instructor, index) => (
                        <div
                          key={index}
                          className={cn(
                            "text-white dark:text-gray-100",
                            "px-2 py-1 rounded",
                            "bg-gray-600 dark:bg-gray-700/60",
                            "text-xs"
                          )}
                        >
                          {instructor.trim()}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const DesktopView = () => (
    <div
      className={cn(
        "rounded-lg border overflow-hidden",
        "bg-white/70 dark:bg-gray-900/70",
        "backdrop-blur-sm",
        "border-gray-200/50 dark:border-gray-700/50",
        "shadow-sm dark:shadow-black/50"
      )}
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow
              className={cn(
                "bg-gray-50/50 dark:bg-gray-800/30",
                "hover:bg-gray-100/50 dark:hover:bg-gray-800/40",
                "border-b border-gray-200/50 dark:border-gray-700/50"
              )}
            >
              <TableHead className="w-[40px] py-2">
                <Checkbox
                  checked={allFilteredSelected}
                  onCheckedChange={handleSelectAll}
                  className={cn(
                    "data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500",
                    "data-[state=checked]:border-blue-600 dark:data-[state=checked]:border-blue-500",
                    "border-gray-300 dark:border-gray-600"
                  )}
                />
              </TableHead>
              <TableHead
                className={cn(
                  "min-w-[70px] font-semibold py-2 text-xs",
                  "text-gray-900 dark:text-gray-100"
                )}
              >
                Code
              </TableHead>
              <TableHead
                className={cn(
                  "min-w-[120px] font-semibold py-2 text-xs",
                  "text-gray-900 dark:text-gray-100"
                )}
              >
                Name
              </TableHead>
              <TableHead
                className={cn(
                  "min-w-[70px] font-semibold py-2 text-xs",
                  "text-gray-900 dark:text-gray-100"
                )}
              >
                L-T-P
              </TableHead>
              <TableHead
                className={cn(
                  "min-w-[50px] font-semibold py-2 text-xs",
                  "text-gray-900 dark:text-gray-100"
                )}
              >
                Credits
              </TableHead>
              <TableHead
                className={cn(
                  "min-w-[80px] font-semibold py-2 text-xs",
                  "text-gray-900 dark:text-gray-100"
                )}
              >
                Lecture (Room)
              </TableHead>
              <TableHead
                className={cn(
                  "min-w-[80px] font-semibold py-2 text-xs",
                  "text-gray-900 dark:text-gray-100"
                )}
              >
                Tutorial (Room)
              </TableHead>
              <TableHead
                className={cn(
                  "min-w-[80px] font-semibold py-2 text-xs",
                  "text-gray-900 dark:text-gray-100"
                )}
              >
                Lab (Room)
              </TableHead>
              <TableHead
                className={cn(
                  "min-w-[100px] font-semibold py-2 text-xs",
                  "text-gray-900 dark:text-gray-100"
                )}
              >
                Instructor
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredCourses.map((course) => (
              <TableRow
                key={course.code}
                className={cn(
                  "transition-colors duration-200",
                  "hover:bg-gray-50/30 dark:hover:bg-gray-800/20",
                  "border-b border-gray-200/30 dark:border-gray-700/30",
                  selectedCourses.some((c) => c.code === course.code) &&
                    "bg-gray-100/50 dark:bg-gray-800/30"
                )}
              >
                <TableCell className="py-2">
                  <Checkbox
                    checked={selectedCourses.some(
                      (c) => c.code === course.code
                    )}
                    onCheckedChange={() => onCourseSelect(course)}
                    className={cn(
                      "data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500",
                      "data-[state=checked]:border-blue-600 dark:data-[state=checked]:border-blue-500",
                      "border-gray-300 dark:border-gray-600"
                    )}
                  />
                </TableCell>
                <TableCell
                  className={cn(
                    "font-semibold py-2 text-sm",
                    "text-gray-900 dark:text-gray-100"
                  )}
                >
                  {course.code}
                </TableCell>
                <TableCell className="text-gray-800 dark:text-gray-200 py-2 text-sm">
                  {course.title}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300 py-2 text-sm">
                  {course.ltp}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300 py-2 text-sm">
                  {course.credits.toString()}
                </TableCell>
                <TableCell className="py-2">
                  {course.lectureSlot === "NA" ? (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      -
                    </span>
                  ) : (
                    <div
                      className={cn(
                        "px-2 py-1 rounded text-xs",
                        "bg-orange-100 dark:bg-orange-800/40",
                        "text-orange-800 dark:text-orange-200",
                        "border border-orange-200 dark:border-orange-600"
                      )}
                    >
                      {`${course.lectureSlot} (${course.lectureVenue})`}
                    </div>
                  )}
                </TableCell>
                <TableCell className="py-2">
                  {course.tutorialSlot === "NA" ? (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      -
                    </span>
                  ) : (
                    <div
                      className={cn(
                        "px-2 py-1 rounded text-xs",
                        "bg-emerald-100 dark:bg-emerald-800/40",
                        "text-emerald-800 dark:text-emerald-200",
                        "border border-emerald-200 dark:border-emerald-600"
                      )}
                    >
                      {`${course.tutorialSlot} (${course.tutorialVenue})`}
                    </div>
                  )}
                </TableCell>
                <TableCell className="py-2">
                  {course.labSlot === "NA" ? (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      -
                    </span>
                  ) : (
                    <div
                      className={cn(
                        "px-2 py-1 rounded text-xs",
                        "bg-purple-100 dark:bg-purple-800/40",
                        "text-purple-800 dark:text-purple-200",
                        "border border-purple-200 dark:border-purple-600"
                      )}
                    >
                      {`${course.labSlot} (${course.labVenue})`}
                    </div>
                  )}
                </TableCell>
                <TableCell className="py-2">
                  <div className="space-y-1">
                    {(course?.instructor ?? "")
                      .split(",")
                      .filter(Boolean)
                      .map((instructor, index) => (
                        <div
                          key={index}
                          className={cn(
                            "text-xs",
                            "px-2 py-1 rounded",
                            "bg-blue-100 dark:bg-blue-800/40",
                            "text-blue-800 dark:text-blue-200",
                            "border border-blue-200 dark:border-blue-600"
                          )}
                        >
                          {instructor.trim()}
                        </div>
                      ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div
        className={cn(
          "flex flex-col gap-3 sm:flex-row sm:items-center",
          "p-3 rounded-lg",
          "bg-white/50 dark:bg-gray-900/50",
          "backdrop-blur-sm",
          "border border-gray-200/50 dark:border-gray-700/50",
          "shadow-sm dark:shadow-black/50"
        )}
      >
        <div className="relative flex-1 max-w-sm">
          <Search
            className={cn(
              "absolute left-3 top-2.5 h-4 w-4",
              "text-gray-500 dark:text-gray-400"
            )}
          />
          <Input
            type="text"
            placeholder={`Search by ${filterType}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn(
              "pl-10 pr-10 h-9",
              "bg-white/70 dark:bg-gray-900/70",
              "border-gray-300 dark:border-gray-600",
              "text-gray-900 dark:text-gray-100",
              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
              "focus:ring-blue-500 dark:focus:ring-blue-400",
              "focus:border-blue-500 dark:focus:border-blue-400"
            )}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className={cn(
                "absolute right-3 top-2.5",
                "text-gray-500 dark:text-gray-400",
                "hover:text-gray-700 dark:hover:text-gray-200",
                "transition-colors duration-200"
              )}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-3 items-center">
          <Filter
            className={cn("h-4 w-4", "text-gray-500 dark:text-gray-400")}
          />
          <Select
            value={filterType}
            onValueChange={(value: FilterType) => setFilterType(value)}
          >
            <SelectTrigger
              className={cn(
                "w-[130px] h-9",
                "bg-white/70 dark:bg-gray-900/70",
                "border-gray-300 dark:border-gray-600",
                "text-gray-900 dark:text-gray-100"
              )}
            >
              <SelectValue placeholder="Filter type" />
            </SelectTrigger>
            <SelectContent
              className={cn(
                "bg-white dark:bg-gray-900",
                "border-gray-200 dark:border-gray-700",
                "shadow-lg dark:shadow-black/50"
              )}
            >
              <SelectItem
                value="venue"
                className={cn(
                  "text-gray-900 dark:text-gray-100",
                  "hover:bg-gray-100 dark:hover:bg-gray-800/30"
                )}
              >
                Venue
              </SelectItem>
              <SelectItem
                value="code"
                className={cn(
                  "text-gray-900 dark:text-gray-100",
                  "hover:bg-gray-100 dark:hover:bg-gray-800/30"
                )}
              >
                Course Code
              </SelectItem>
              <SelectItem
                value="instructor"
                className={cn(
                  "text-gray-900 dark:text-gray-100",
                  "hover:bg-gray-100 dark:hover:bg-gray-800/30"
                )}
              >
                Instructor
              </SelectItem>
              <SelectItem
                value="slot"
                className={cn(
                  "text-gray-900 dark:text-gray-100",
                  "hover:bg-gray-100 dark:hover:bg-gray-800/30"
                )}
              >
                Time Slot
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={cn(
              "text-sm font-medium",
              "text-gray-600 dark:text-gray-400"
            )}
          >
            {sortedAndFilteredCourses.length} courses
          </span>
          {searchTerm && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearSearch}
              className={cn(
                "h-8 text-xs",
                "border-gray-300 dark:border-gray-600",
                "text-gray-700 dark:text-gray-300",
                "hover:bg-gray-100 dark:hover:bg-gray-800/30",
                "hover:text-gray-900 dark:hover:text-gray-100"
              )}
            >
              Clear filter
            </Button>
          )}
        </div>
      </div>

      {/* Course List */}
      {isMobileView ? <MobileView /> : <DesktopView />}
    </div>
  );
}
