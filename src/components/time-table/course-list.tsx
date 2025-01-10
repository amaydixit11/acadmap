"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TimeTableParsedCourse } from "@/types/time-table";

interface TimeTableCourseListProps {
  courses: TimeTableParsedCourse[];
  selectedCourses: TimeTableParsedCourse[];
  onCourseSelect: (course: TimeTableParsedCourse) => void;
}

export function TimeTableCourseList({
  courses,
  selectedCourses,
  onCourseSelect,
}: TimeTableCourseListProps) {

  const sortedCourses = [...courses].sort((a: TimeTableParsedCourse, b: TimeTableParsedCourse) => {
    
    const cleanCode = (code: string): string => code.split('/')[0];
  
    const cleanA: string = cleanCode(a.code);
    const cleanB: string = cleanCode(b.code);
  
    const regexAAADDD = /^[A-Z]{3}\d{3}$/; 
    const regexAADDD = /^[A-Z]{2}\d{3}$/;  
  
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
  
  
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
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
          {sortedCourses.map((course) => (
            <TableRow key={course.code}>
              <TableCell>
                <Checkbox
                  checked={selectedCourses.some(
                    (c) => c.code === course.code
                  )}
                  onCheckedChange={() => onCourseSelect(course)}
                />
              </TableCell>
              <TableCell>{course.code}</TableCell>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.ltp}</TableCell>
              <TableCell>{course.credits.toString()}</TableCell>
              <TableCell>
                {/* {course.lectureSlot !== 'NA' && ( */}
                  {/* <> */}
                    {course.lectureSlot === "NA" ? "-" : `${course.lectureSlot} (${course.lectureVenue})`}
                  {/* </> */}
                {/* )} */}
              </TableCell>
              <TableCell>
                {/* {course.tutorialSlot !== 'NA' && ( */}
                  {/* <> */}
                    {course.tutorialSlot === "NA" ? "-" : `${course.tutorialSlot} (${course.tutorialVenue})`}
                  {/* </> */}
                {/* )} */}
              </TableCell>
              <TableCell>
                {/* {course.labSlot !== 'NA' && ( */}
                  {/* <> */}
                    {course.labSlot === "NA" ? "-" : `${course.labSlot} (${course.labVenue})`}
                  {/* </> */}
                {/* )} */}
              </TableCell>
              <TableCell>
                {course.instructor.split(',').map((instructor, index) => (
                  <div key={index}>{instructor}</div>
                ))}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}