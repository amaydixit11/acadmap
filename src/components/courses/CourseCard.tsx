import Link from "next/link"
import { 
  BookOpen, 
  Clock, 
  BookmarkCheck, 
  Tag,
  Verified,
  Star,
  FileText
} from "lucide-react"
import { Course } from "@/types/courses"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link href={`/courses/${course.id}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        className={cn(
          "h-full flex flex-col overflow-hidden rounded-xl border-2 border-primary/10 dark:border-border",
          "bg-card transition-all duration-300",
          "hover:shadow-lg hover:border-primary/30"
        )}
      >
        <div className="p-8 flex-grow space-y-6">
          <div className="flex justify-between items-start">
            <Badge className="bg-muted text-foreground border-0 font-bold px-3 py-1 rounded-md uppercase tracking-wider text-[10px]">
              {course.code}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground/40">
               <Verified className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              Curated syllabus and resources for {course.title}. Explore modules, PYQs, and lecture notes.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              <Star className="w-3 h-3" />
              <span>{course.credits} Credits</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{course.schedule.lectures}-{course.schedule.tutorials}-{course.schedule.labs}</span>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 bg-muted/30 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <FileText className="w-4 h-4 text-muted-foreground" />
             </div>
             <span className="text-xs font-bold text-muted-foreground">
               {course.resourceCount || 0} Resources
             </span>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-primary group-hover:underline">
            Explore →
          </span>
        </div>
      </motion.div>
    </Link>
  )
}

export default CourseCard;
