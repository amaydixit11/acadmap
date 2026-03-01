import { useEffect, useState } from "react";
import { useProfileContext } from "@/context/ProfileContext";
import { curriculumData } from "@/data/curriculumData";
import { calculateCurrentSemester } from "@/utils/curriculum";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, GraduationCap, Calendar } from "lucide-react";
import Link from "next/link";
import { TimeTableParsedCourse } from "@/types/time-table";
import { parseCSV } from "@/lib/time-table";
import { cn } from "@/lib/utils";

export function MyCourses() {
  const { profile } = useProfileContext();
  const [electives, setElectives] = useState<TimeTableParsedCourse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadElectives = async () => {
      if (!profile?.selected_courses || profile.selected_courses.length === 0) {
        setElectives([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch("/file.csv");
        if (response.ok) {
          const csvText = await response.text();
          const allCourses = await parseCSV(csvText);
          const selected = allCourses.filter(c => 
            profile.selected_courses?.includes(c.code)
          );
          setElectives(selected);
        }
      } catch (error) {
        console.error("Error loading electives:", error);
      } finally {
        setLoading(false);
      }
    };

    loadElectives();
  }, [profile?.selected_courses]);

  if (!profile || !profile.batch || !profile.program || !profile.department) {
    return null;
  }

  const graduationYear = parseInt(profile.batch);
  const currentSemester = calculateCurrentSemester(graduationYear, profile.program);
  
  const branchData = curriculumData.find(
    (b) => b.branch === profile.department && b.degree === profile.program
  );

  const semesterData = branchData?.semesters.find(
    (s) => s.semester.toString() === currentSemester.toString()
  );

  const hasCurriculumCourses = semesterData && semesterData.courses.length > 0;
  const hasElectives = electives.length > 0;

  if (!hasCurriculumCourses && !hasElectives) {
    return (
      <Card className="mt-8 border-dashed bg-muted/20">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <BookOpen className="w-10 h-10 text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-lg font-semibold">No Courses Found</h3>
          <p className="text-sm text-muted-foreground max-w-[250px] mt-1">
            Go to the <Link href="/time-table" className="text-primary hover:underline">Timetable</Link> page to select your electives and courses!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Core Curriculum Section */}
      {hasCurriculumCourses && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Core Curriculum
            </h3>
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
              Sem {currentSemester} • {semesterData.totalCredits} Credits
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {semesterData.courses.map((course) => (
              <CourseCard key={course.code} course={{
                code: course.code,
                name: course.name,
                category: course.category,
                ltpc: course.ltpc,
                credits: course.credits.toString()
              }} />
            ))}
          </div>
        </div>
      )}

      {/* Selected Electives Section */}
      {hasElectives && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Selected Electives
            </h3>
            <Badge variant="outline" className="bg-blue-500/5 text-blue-500 border-blue-500/20">
              {electives.length} Selected
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {electives.map((course) => (
              <CourseCard key={course.code} course={{
                code: course.code,
                name: course.title,
                category: course.program,
                ltpc: course.ltp,
                credits: course.credits.toString()
              }} isElective />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CourseCard({ course, isElective = false }: { 
  course: { code: string; name: string; category: string; ltpc: string; credits: string },
  isElective?: boolean 
}) {
  return (
    <Link 
      href={`/courses/${course.code.toLowerCase().split('/')[0]}`}
      className="group"
    >
      <Card className={cn(
        "h-full transition-all duration-300 hover:shadow-md bg-card/50",
        isElective ? "hover:border-blue-500/50" : "hover:border-primary/50"
      )}>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <span className={cn(
              "font-mono text-xs font-bold px-2 py-0.5 rounded",
              isElective ? "text-blue-600 bg-blue-100" : "text-primary bg-primary/10"
            )}>
              {course.code}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <CardTitle className={cn(
            "text-base mt-2 transition-colors line-clamp-1 border-none",
            isElective ? "group-hover:text-blue-600" : "group-hover:text-primary"
          )}>
            {course.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex items-center justify-between">
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-bold">
              {course.category}
            </Badge>
            <span className="text-[10px] text-muted-foreground font-medium flex items-center">
              L-T-P-C: {course.ltpc}
            </span>
          </div>
          <span className="text-xs font-bold text-muted-foreground">
            {course.credits} Cr
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
