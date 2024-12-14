import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { BookOpen, Calendar, User } from "lucide-react"
import { Course } from "@/types/courses"


interface CourseCardProps {
    course: Course;
  }
  

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link
    key={course.id}
    href={`/courses/${course.id}`}
    className="block"
    aria-label={`View course details for ${course.title}`}
  >
    <Card className="h-full hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-primary/50 border-2 border-transparent">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="uppercase tracking-wider">
            {course.code}
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-600">
            {course.credits} Credits
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
          {course.title}
        </CardTitle>
        <CardDescription className="text-gray-500 mt-1">
          {course.department}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2 pb-4">
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {course.description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2 text-gray-400" />
            <span className="truncate">
              {course.instructor || "Instructor TBA"}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>{course.semester}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen className="w-4 h-4 mr-2" />
            <span>View Details</span>
          </div>
          <Badge variant="outline" className="text-primary border-primary/30">
            More Info
          </Badge>
        </div>
      </CardFooter>
    </Card>
  </Link>
  )
}

export default CourseCard
