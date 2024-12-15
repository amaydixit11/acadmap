import Link from "next/link"
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  BookOpen, 
  Clock, 
  FileText, 
  BookmarkCheck, 
  FolderOpen,
  Users,
  Tag
} from "lucide-react"
import { Department, Course } from "@/types/courses"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // Determine credit color and intensity
  const getCreditVariant = (credits: number) => {
    if (credits <= 2) return "bg-green-100 text-green-700 border-green-200";
    if (credits < 4) return "bg-blue-100 text-blue-700 border-blue-200";
    return "bg-orange-100 text-orange-700 border-orange-200";
  };

  // Determine department color
  const getDepartmentColor = (department: string) => {
    const departmentColors: { [key: string]: string } = {
      [Department.CSE]: 'bg-blue-50 text-blue-700 border-blue-200',
      [Department.DSAI]: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      [Department.ECE]: 'bg-teal-50 text-teal-700 border-teal-200',
      [Department.EE]: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      [Department.EVT]: 'bg-lime-50 text-lime-700 border-lime-200',
      [Department.ME]: 'bg-amber-50 text-amber-700 border-amber-200',
      [Department.MT]: 'bg-orange-50 text-orange-700 border-orange-200',
      [Department.MSME]: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      [Department.PHY]: 'bg-purple-50 text-purple-700 border-purple-200',
      [Department.MAT]: 'bg-rose-50 text-rose-700 border-rose-200',
      [Department.CHE]: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
      [Department.BSBM]: 'bg-green-50 text-green-700 border-green-200',
      [Department.LA]: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return departmentColors[department] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <TooltipProvider>
      <Link 
        href={`/courses/${course.id}`} 
        className="group block transform transition-all duration-300 hover:scale-[1.02]"
        aria-label={`View details for ${course.title}`}
      >
        <Card className={cn(
          "h-full overflow-hidden border-2 border-transparent",
          "hover:border-primary/30 hover:shadow-xl",
          "transition-all duration-300",
          "flex flex-col"
        )}>
          <CardHeader className="pb-3 space-y-2">
            <div className="flex justify-between items-start">
              <Badge 
                variant="secondary" 
                className="uppercase tracking-wider font-semibold"
              >
                {course.code}
              </Badge>
              
              <Tooltip>
                <TooltipTrigger>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      getCreditVariant(course.credits),
                      "font-bold shadow-sm"
                    )}
                  >
                    {course.credits} Credits
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  Course Credit Intensity
                </TooltipContent>
              </Tooltip>
            </div>

            <CardTitle className={cn(
              "text-xl font-bold text-gray-900",
              "line-clamp-2",
              "group-hover:text-primary/80",
              "transition-colors"
            )}>
              {course.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm text-gray-600 pb-4 flex-grow">
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-gray-400" />
              <Tooltip>
                <TooltipTrigger>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      getDepartmentColor(course.department),
                      "font-medium"
                    )}
                  >
                    {/* {Department[course.department as keyof typeof Department]} */}
                    {course.department}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  Academic Department
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center">
              <BookmarkCheck className="w-4 h-4 mr-2 text-gray-400" />
              <span className="font-medium text-gray-700">Prerequisites:</span>
              <span className="ml-2 truncate">
                {course.prerequisites || 'None'}
              </span>
            </div>

            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-400" />
              <span className="font-medium text-gray-700">L-T-P:</span>
              <span className="ml-2 truncate">
                {`${course.schedule.lectures}-${course.schedule.tutorials}-${course.schedule.labs}` || 'TBA'}
              </span>
            </div>
          </CardContent>

          <CardFooter className="bg-gray-50/50 border-t py-3">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center text-sm text-gray-500 
                group-hover:text-primary 
                transition-colors">
                <BookOpen className="w-4 h-4 mr-2" />
                <span className="font-medium">Explore Course</span>
              </div>
              <Badge 
                variant="outline" 
                className={cn(
                  "text-primary border-primary/30",
                  "group-hover:bg-primary/10",
                  "transition-all"
                )}
              >
                View Details
              </Badge>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </TooltipProvider>
  )
}

export default CourseCard