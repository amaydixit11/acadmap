import React from 'react'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Course } from '@/types/courses';

interface CourseSelectionProps{
    courses: Course[];
    value: string;
    onValueChange: (value: string) => void;
}

const CourseSelection = ({courses, value, onValueChange}: CourseSelectionProps) => {
  return (
    <div className="space-y-2">
        <Label htmlFor="course">Course</Label>
        <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
            <SelectValue placeholder="Select course" />
        </SelectTrigger>
        <SelectContent>
            {courses.map(course => (
            <SelectItem key={course.id} value={course.id}>
                {course.code} - {course.title}
            </SelectItem>
            ))}
        </SelectContent>
        </Select>
    </div>
  )
}

export default CourseSelection
