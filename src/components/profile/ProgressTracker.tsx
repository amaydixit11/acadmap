"use client"

import { useProfileContext } from "@/context/ProfileContext";
import { curriculumData } from "@/data/curriculumData";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Trophy, BookOpen, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProgressTracker() {
  const { profile } = useProfileContext();

  if (!profile || !profile.department || !profile.program) {
    return null;
  }

  const branchData = curriculumData.find(
    (b) => b.branch === profile.department && b.degree === profile.program
  );

  if (!branchData) return null;

  const totalCourses = branchData.semesters.reduce(
    (acc, sem) => acc + sem.courses.length, 
    0
  );
  
  const totalCreditsRequired = branchData.semesters.reduce(
    (acc, sem) => acc + sem.totalCredits,
    0
  );

  const completedCoursesCount = profile.completed_courses?.length || 0;
  
  // Calculate completed credits
  let completedCredits = 0;
  branchData.semesters.forEach(sem => {
    sem.courses.forEach(course => {
      if (profile.completed_courses?.includes(course.code)) {
        completedCredits += course.credits;
      }
    });
  });

  const courseProgress = totalCourses > 0 ? (completedCoursesCount / totalCourses) * 100 : 0;
  const creditProgress = totalCreditsRequired > 0 ? (completedCredits / totalCreditsRequired) * 100 : 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex items-center gap-2 px-1">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">Degree Progress</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Course Completion Card */}
        <Card className="bg-card/50 border-primary/10 shadow-sm overflow-hidden group">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Courses Completed
              </CardTitle>
              <span className="text-2xl font-bold">{completedCoursesCount}/{totalCourses}</span>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={courseProgress} className="h-2 mb-2" />
            <p className="text-[10px] text-muted-foreground text-right font-medium">
              {courseProgress.toFixed(1)}% Complete
            </p>
          </CardContent>
        </Card>

        {/* Credit Progress Card */}
        <Card className="bg-card/50 border-primary/10 shadow-sm overflow-hidden group">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                Credits Earned
              </CardTitle>
              <span className="text-2xl font-bold">{completedCredits}/{totalCreditsRequired}</span>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={creditProgress} className="h-2 mb-2" />
            <p className="text-[10px] text-muted-foreground text-right font-medium">
              {creditProgress.toFixed(1)}% Complete
            </p>
          </CardContent>
        </Card>
      </div>
      
      {courseProgress === 100 && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-4 animate-bounce">
          <div className="bg-emerald-500 p-2 rounded-full">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-700 dark:text-emerald-400">Curriculum Completed!</h4>
            <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80">You have successfully finished all mandatory courses.</p>
          </div>
        </div>
      )}
    </div>
  );
}
