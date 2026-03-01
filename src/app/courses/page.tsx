import { CourseFilters } from "@/components/courses/CourseFilters";
import { CourseList } from "@/components/courses/CourseList";
import CoursePageHeader from "@/components/courses/CoursePageHeader";
import { CurriculumView } from "@/components/curriculum/CurriculumView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, GraduationCap } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid gap-8">
        <CoursePageHeader />
        
        <Tabs defaultValue="catalog" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="catalog" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Course Catalog
              </TabsTrigger>
              <TabsTrigger value="curriculum" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Branch Curriculum
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="catalog" className="space-y-6 m-0">
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
              <CourseFilters />
              <main className="space-y-6">
                <CourseList />
              </main>
            </div>
          </TabsContent>

          <TabsContent value="curriculum" className="m-0">
            <CurriculumView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}