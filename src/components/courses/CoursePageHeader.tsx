import { BookOpen } from 'lucide-react';
import { cn } from "@/lib/utils";

const CoursePageHeader = () => {
  return (
    <header 
      className={cn(
        "text-center space-y-4 md:space-y-6",
        "bg-gradient-to-r from-primary/10 to-primary/5",
        "dark:bg-gradient-to-r dark:from-primary/20 dark:to-primary/10",
        "px-4 py-6 md:p-8 rounded-xl md:rounded-2xl",
        "shadow-md md:shadow-lg",
        "dark:bg-gray-900/50"
      )}
    >
      <div className="flex flex-col items-center md:flex-row md:justify-center md:items-center gap-3 md:gap-4">
        <BookOpen 
          className={cn(
            "w-8 h-8 md:w-12 md:h-12", 
            "text-primary",
            "dark:text-primary-foreground"
          )} 
        />
        <h1 
          className={cn(
            "text-2xl md:text-4xl font-bold md:font-extrabold", 
            "text-gray-800",
            "dark:text-gray-100"
          )}
        >
          Course Catalog
        </h1>
      </div>
      <p 
        className={cn(
          "text-base md:text-xl text-muted-foreground",
          "max-w-3xl mx-auto leading-relaxed px-2 md:px-0",
          "dark:text-muted-foreground/80"
        )}
      >
        Explore a diverse range of courses tailored to fuel your academic journey. 
        Find the perfect classes to match your interests and academic goals.
      </p>
    </header>
  );
};

export default CoursePageHeader;