import { useCourses } from "@/hooks/useCourses";
import { Skeleton } from "../ui/skeleton"
import { Course } from "@/types/courses";
import CourseCard from "./CourseCard";

interface CourseCatalogProps {
    courses: Course[]
}
  
export const CourseCatalog: React.FC<CourseCatalogProps> = ({courses}) => {
    const {isLoading} = useCourses();

    if (isLoading) {
        return Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="w-full">
            <Skeleton className="h-64 w-full rounded-lg" />
            </div>
        ));
    }

    if (courses.length === 0) {
        return (
            <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-500">No courses match your filters.</p>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your search or filters.</p>
            </div>
        );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
        ))}
    </div>
    )
}

