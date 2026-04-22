import { CourseFilters } from "@/components/courses/CourseFilters";
import { CourseList } from "@/components/courses/CourseList";
import CoursePageHeader from "@/components/courses/CoursePageHeader";
import { CurriculumView } from "@/components/curriculum/CurriculumView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="flex flex-col gap-12">
          <CoursePageHeader />
          
          <Tabs defaultValue="catalog" className="w-full">
            <div className="flex justify-start mb-12 border-b border-border">
              <TabsList className="bg-transparent h-auto p-0 gap-8">
                <TabsTrigger 
                  value="catalog" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-4 text-base font-bold text-muted-foreground flex items-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Course Catalog
                </TabsTrigger>
                <TabsTrigger 
                  value="curriculum" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-4 text-base font-bold text-muted-foreground flex items-center gap-2"
                >
                  <GraduationCap className="w-5 h-5" />
                  Branch Curriculum
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="catalog" className="m-0 focus-visible:outline-none">
              <div className="flex flex-col lg:flex-row gap-12">
                <CourseFilters />
                <main className="flex-1">
                  <CourseList />
                </main>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="m-0 focus-visible:outline-none">
              <div className="bg-card rounded-xl border border-border p-8 md:p-12 shadow-sm">
                <CurriculumView />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}