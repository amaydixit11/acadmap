import { BookOpen } from 'lucide-react'

const CoursePageHeader = () => {
  return (
    <header className="text-center space-y-4 bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl">
        <div className="flex justify-center items-center gap-4">
            <BookOpen className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-extrabold text-gray-800">Course Catalog</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Explore a diverse range of courses tailored to fuel your academic journey. 
        Find the perfect classes to match your interests and academic goals.
        </p>
    </header>
  )
}

export default CoursePageHeader
