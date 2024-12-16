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
    if (credits <= 2) return "bg-neutral-900 text-green-500 border-neutral-800";
    if (credits < 4) return "bg-neutral-900 text-blue-500 border-neutral-800";
    return "bg-neutral-900 text-orange-500 border-neutral-800";
  };

  // Determine department color
  const getDepartmentColor = (department: string) => {
    const departmentColors: { [key: string]: string } = {
      [Department.CSE]: 'bg-neutral-900 text-blue-500 border-neutral-800',
      [Department.DSAI]: 'bg-neutral-900 text-indigo-500 border-neutral-800',
      [Department.ECE]: 'bg-neutral-900 text-teal-500 border-neutral-800',
      [Department.EE]: 'bg-neutral-900 text-emerald-500 border-neutral-800',
      [Department.EVT]: 'bg-neutral-900 text-lime-500 border-neutral-800',
      [Department.ME]: 'bg-neutral-900 text-amber-500 border-neutral-800',
      [Department.MT]: 'bg-neutral-900 text-orange-500 border-neutral-800',
      [Department.MSME]: 'bg-neutral-900 text-cyan-500 border-neutral-800',
      [Department.PHY]: 'bg-neutral-900 text-purple-500 border-neutral-800',
      [Department.MAT]: 'bg-neutral-900 text-rose-500 border-neutral-800',
      [Department.CHE]: 'bg-neutral-900 text-fuchsia-500 border-neutral-800',
      [Department.BSBM]: 'bg-neutral-900 text-green-500 border-neutral-800',
      [Department.LA]: 'bg-neutral-900 text-gray-500 border-neutral-800'
    };
    return departmentColors[department] || 'bg-neutral-900 text-gray-500 border-neutral-800';
  };

  return (
    <TooltipProvider>
      <Link 
        href={`/courses/${course.id}`} 
        className="group block transform transition-all duration-300 hover:scale-[1.02]"
        aria-label={`View details for ${course.title}`}
      >
        <Card
          className={cn(
            "h-80 flex flex-col overflow-hidden border-2 border-neutral-800 bg-black",
            "hover:border-neutral-700 hover:shadow-2xl",
            "transition-all duration-300"
          )}
        >

          <CardHeader className="pb-3 space-y-2">
            <div className="flex justify-between items-start">
              <Badge 
                variant="secondary" 
                className="uppercase tracking-wider font-semibold bg-neutral-900 text-neutral-300"
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
                <TooltipContent className="bg-neutral-900 text-neutral-300 border-neutral-800">
                  Course Credit Intensity
                </TooltipContent>
              </Tooltip>
            </div>

            <CardTitle className={cn(
              "text-xl font-bold text-neutral-200",
              "line-clamp-2",
              "group-hover:text-neutral-400",
              "transition-colors"
            )}>
              {course.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm text-neutral-400 pb-4 flex-grow">
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-neutral-600" />
              <Tooltip>
                <TooltipTrigger>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      getDepartmentColor(course.department),
                      "font-medium"
                    )}
                  >
                    {course.department}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="bg-neutral-900 text-neutral-300 border-neutral-800">
                  Academic Department
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center">
              <BookmarkCheck className="w-4 h-4 mr-2 text-neutral-600" />
              <span className="font-medium text-neutral-300">Prerequisites:</span>
              <span className="ml-2 truncate text-neutral-400">
                {course.prerequisites || 'None'}
              </span>
            </div>

            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-neutral-600" />
              <span className="font-medium text-neutral-300">L-T-P:</span>
              <span className="ml-2 truncate text-neutral-400">
                {`${course.schedule.lectures}-${course.schedule.tutorials}-${course.schedule.labs}` || 'TBA'}
              </span>
            </div>
          </CardContent>

          <CardFooter className="bg-neutral-900/50 border-t border-neutral-800 py-3">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center text-sm text-neutral-500 
                group-hover:text-neutral-300 
                transition-colors">
                <BookOpen className="w-4 h-4 mr-2" />
                <span className="font-medium">Explore Course</span>
              </div>
              <Badge 
                variant="outline" 
                className={cn(
                  "text-neutral-400 border-neutral-800",
                  "group-hover:bg-neutral-800",
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