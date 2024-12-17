import React from 'react'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Course } from '@/types/courses';
import { useUploadContext } from '@/context/UploadContext';
import { useSearchParams } from 'next/navigation';


const CourseSelection = () => {
    const { 
        courses, 
        selectedCourse, 
        setSelectedCourse,
        coursesError 
      } = useUploadContext();
    
      if (coursesError) {
        return (
          <div className="space-y-2 sm:space-y-3">
            <p className="text-sm text-red-500">{coursesError}</p>
          </div>
        );
      }

  return (
    <div className="space-y-2 sm:space-y-3">
        <Label htmlFor="course" className="text-sm sm:text-base">Course</Label>
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
        <SelectTrigger className="w-full text-sm sm:text-base">
            <SelectValue placeholder="Select course" />
        </SelectTrigger>
        <SelectContent className="w-full max-w-[calc(100vw-1rem)] sm:max-w-md">
            {courses.map(course => (
            <SelectItem key={course.id} value={course.id} className="px-2 py-1 sm:px-3 sm:py-2">
                {course.code} - {course.title}
            </SelectItem>
            ))}
        </SelectContent>
        </Select>
    </div>
  )
}

export default CourseSelection
