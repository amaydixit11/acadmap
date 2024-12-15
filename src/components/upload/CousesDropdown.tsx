import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useUploadCourses } from '@/hooks/useUploadCourses';

interface CourseDropdownProps{
    defaultCourseCode: string;
}

export const CoursesDropdown = ({defaultCourseCode}: CourseDropdownProps) => {
    const {
        courses,
        selectedCourse,
        setSelectedCourse,
        coursesError
      } = useUploadCourses(defaultCourseCode);
  return (
    <div className="space-y-2">
        <Label htmlFor="course">Course</Label>
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
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