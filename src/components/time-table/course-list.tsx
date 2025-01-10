import React from 'react';
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
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { TimeTableParsedCourse } from "@/types/time-table";
import { Search, X, Filter, ChevronDown, ChevronUp } from "lucide-react";

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
  const [filterType, setFilterType] = useState<FilterType>("venue");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  React.useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    
    return () => window.removeEventListener('resize', checkMobileView);
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
            (lectureVenue !== "NA" && lectureVenue.toLowerCase().includes(term)) ||
            (tutorialVenue !== "NA" && tutorialVenue.toLowerCase().includes(term)) ||
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
            (lectureSlot !== "NA" && lectureSlot.toLowerCase().includes(term)) ||
            (tutorialSlot !== "NA" && tutorialSlot.toLowerCase().includes(term)) ||
            (labSlot !== "NA" && labSlot.toLowerCase().includes(term))
          );
        default:
          return true;
      }
    })
    .sort((a, b) => {
      const cleanCode = (code: string): string => code.split('/')[0];
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
        course => !selectedCourses.some(selected => selected.code === course.code)
      );
      coursesToAdd.forEach(course => onCourseSelect(course));
    } else {
      sortedAndFilteredCourses.forEach(course => {
        if (selectedCourses.some(selected => selected.code === course.code)) {
          onCourseSelect(course);
        }
      });
    }
  };

  const allFilteredSelected = sortedAndFilteredCourses.length > 0 && 
    sortedAndFilteredCourses.every(course => 
      selectedCourses.some(selected => selected.code === course.code)
    );

  const clearSearch = () => {
    setSearchTerm("");
  };

  const toggleCourseExpand = (courseCode: string) => {
    setExpandedCourse(expandedCourse === courseCode ? null : courseCode);
  };

  const MobileView = () => (
    <div className="space-y-4">
      {sortedAndFilteredCourses.map((course) => (
        <Card key={course.code} className="w-full">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedCourses.some((c) => c.code === course.code)}
                  onCheckedChange={() => onCourseSelect(course)}
                />
                <div>
                  <div className="font-medium">{course.code}</div>
                  <div className="text-sm text-muted-foreground">{course.title}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleCourseExpand(course.code)}
              >
                {expandedCourse === course.code ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            {expandedCourse === course.code && (
              <div className="mt-4 space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">L-T-P:</div>
                  <div>{course.ltp}</div>
                  <div className="text-muted-foreground">Credits:</div>
                  <div>{course.credits.toString()}</div>
                </div>
                
                {course.lectureSlot !== "NA" && (
                  <div>
                    <div className="text-muted-foreground">Lecture:</div>
                    <div>{`${course.lectureSlot} (${course.lectureVenue})`}</div>
                  </div>
                )}
                
                {course.tutorialSlot !== "NA" && (
                  <div>
                    <div className="text-muted-foreground">Tutorial:</div>
                    <div>{`${course.tutorialSlot} (${course.tutorialVenue})`}</div>
                  </div>
                )}
                
                {course.labSlot !== "NA" && (
                  <div>
                    <div className="text-muted-foreground">Lab:</div>
                    <div>{`${course.labSlot} (${course.labVenue})`}</div>
                  </div>
                )}
                
                <div>
                  <div className="text-muted-foreground">Instructor:</div>
                  <div>{course.instructor.split(',').map((instructor, index) => (
                    <div key={index}>{instructor.trim()}</div>
                  ))}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const DesktopView = () => (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={allFilteredSelected}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="min-w-[85px]">Code</TableHead>
            <TableHead className="min-w-[85px]">Name</TableHead>
            <TableHead className="min-w-[85px]">L-T-P</TableHead>
            <TableHead className="min-w-[85px]">Credits</TableHead>
            <TableHead className="min-w-[85px]">Lecture</TableHead>
            <TableHead className="min-w-[85px]">Tutorial</TableHead>
            <TableHead className="min-w-[85px]">Lab</TableHead>
            <TableHead className="min-w-[85px]">Instructor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAndFilteredCourses.map((course) => (
            <TableRow key={course.code}>
              <TableCell>
                <Checkbox
                  checked={selectedCourses.some((c) => c.code === course.code)}
                  onCheckedChange={() => onCourseSelect(course)}
                />
              </TableCell>
              <TableCell className="font-medium">{course.code}</TableCell>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.ltp}</TableCell>
              <TableCell>{course.credits.toString()}</TableCell>
              <TableCell>
                {course.lectureSlot === "NA" ? "-" : `${course.lectureSlot} (${course.lectureVenue})`}
              </TableCell>
              <TableCell>
                {course.tutorialSlot === "NA" ? "-" : `${course.tutorialSlot} (${course.tutorialVenue})`}
              </TableCell>
              <TableCell>
                {course.labSlot === "NA" ? "-" : `${course.labSlot} (${course.labVenue})`}
              </TableCell>
              <TableCell>
                {course.instructor.split(',').map((instructor, index) => (
                  <div key={index}>{instructor.trim()}</div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={`Search by ${filterType}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-8"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex gap-2 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={filterType}
            onValueChange={(value: FilterType) => setFilterType(value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="venue">Venue</SelectItem>
              <SelectItem value="code">Course Code</SelectItem>
              <SelectItem value="instructor">Instructor</SelectItem>
              <SelectItem value="slot">Time Slot</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {sortedAndFilteredCourses.length} courses
          </span>
          {searchTerm && (
            <Button variant="outline" size="sm" onClick={clearSearch}>
              Clear filter
            </Button>
          )}
        </div>
      </div>

      {isMobileView ? <MobileView /> : <DesktopView />}
    </div>
  );
}