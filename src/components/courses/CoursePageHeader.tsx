import { BookOpen } from 'lucide-react';

const CoursePageHeader = () => {
  return (
    <header className="text-center space-y-4 md:space-y-6 bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-6 md:p-8 rounded-xl md:rounded-2xl shadow-md md:shadow-lg">
      <div className="flex flex-col items-center md:flex-row md:justify-center md:items-center gap-3 md:gap-4">
        <BookOpen className="w-8 h-8 md:w-12 md:h-12 text-primary" />
        <h1 className="text-2xl md:text-4xl font-bold md:font-extrabold text-gray-800">
          Course Catalog
        </h1>
      </div>
      <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2 md:px-0">
        Explore a diverse range of courses tailored to fuel your academic journey. 
        Find the perfect classes to match your interests and academic goals.
      </p>
    </header>
  );
};

export default CoursePageHeader;