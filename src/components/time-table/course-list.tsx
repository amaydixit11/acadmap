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
  // const sortedCourses = [...courses].sort((a, b) =>
    
  //   a.courseCode.localeCompare(b.courseCode)
  // );
  // const sortedCourses = [...courses].sort((a, b) => {
  //   const courseCodeA = a.courseCode.slice(3, 5);
  //   const courseCodeB = b.courseCode.slice(3, 5);
  
  //   if (courseCodeA > courseCodeB) return 1; // Sort a after b
  //   else if (courseCodeA < courseCodeB) return -1; // Sort b after a
  //   return a.courseCode.localeCompare(b.courseCode); // If equal, compare the full courseCode
  // });
  const sortedCourses = [...courses].sort((a, b) => {
    // Preprocess to ignore everything after '/' in course codes
    const cleanCode = (code) => code.split('/')[0];
  
    const cleanA = cleanCode(a.courseCode);
    const cleanB = cleanCode(b.courseCode);
  
    const regexAAADDD = /^[A-Z]{3}\d{3}$/;
    const regexAADDD = /^[A-Z]{2}\d{3}$/;
  
    const isATypeAAADDD = regexAAADDD.test(cleanA);
    const isBTypeAAADDD = regexAAADDD.test(cleanB);
  
    // Step 1: Prioritize AAADDD courses
    if (isATypeAAADDD && !isBTypeAAADDD) return -1; // a is AAADDD, b is AADDD
    if (!isATypeAAADDD && isBTypeAAADDD) return 1;  // a is AADDD, b is AAADDD
  
    // Step 2: Sort within the same type
    const numA = Math.floor(parseInt(cleanA.match(/\d{3}$/)[0], 10)/100);
    const numB = Math.floor(parseInt(cleanB.match(/\d{3}$/)[0], 10)/100);
  
    if (numA !== numB) return numA - numB; // Sort by the numeric part
  
    // Step 3: Sort alphabetically by the letter part
    const lettersA = cleanA.match(/^[A-Z]+/)[0]; // Extract letters (AAA or AA)
    const lettersB = cleanB.match(/^[A-Z]+/)[0];
  
    return lettersA.localeCompare(lettersB); // Sort alphabetically
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
            <TableRow key={course.courseCode}>
              <TableCell>
                <Checkbox
                  checked={selectedCourses.some(
                    (c) => c.courseCode === course.courseCode
                  )}
                  onCheckedChange={() => onCourseSelect(course)}
                />
              </TableCell>
              <TableCell>{course.courseCode}</TableCell>
              <TableCell>{course.courseName}</TableCell>
              <TableCell>{course.ltp}</TableCell>
              <TableCell>{course.credits}</TableCell>
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