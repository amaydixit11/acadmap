"use client";

import { useState } from "react";
import { BranchCurriculum, SemesterCurriculum } from "@/types/curriculum";
import { curriculumData } from "@/data/curriculumData";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CreditCard, GraduationCap, CheckCircle2, Circle } from "lucide-react";
import { useProfileContext } from "@/context/ProfileContext";
import { cn } from "@/lib/utils";

export function CurriculumView() {
  const degrees = Array.from(new Set(curriculumData.map(b => b.degree)));
  const [selectedDegree, setSelectedDegree] = useState<string>(degrees[0]);
  
  const branchesForDegree = curriculumData.filter(b => b.degree === selectedDegree);
  const [selectedBranch, setSelectedBranch] = useState<string>(branchesForDegree[0].branch);
  
  // Update branch when degree changes
  const handleDegreeChange = (degree: string) => {
    setSelectedDegree(degree);
    const firstBranch = curriculumData.find(b => b.degree === degree)?.branch;
    if (firstBranch) setSelectedBranch(firstBranch);
  };

  const currentBranchData = curriculumData.find(
    b => b.branch === selectedBranch && b.degree === selectedDegree
  ) || branchesForDegree[0];
  
  const [selectedSemester, setSelectedSemester] = useState<string>("1");
  const semesters = currentBranchData.semesters;

  const { profile, handleInputChange, handleSave, loading: profileLoading } = useProfileContext();

  const isCompleted = (courseCode: string) => {
    return profile?.completed_courses?.includes(courseCode) || false;
  };

  const toggleCompletion = async (courseCode: string) => {
    if (!profile) return;
    
    const currentCompleted = profile.completed_courses || [];
    const newCompleted = currentCompleted.includes(courseCode)
      ? currentCompleted.filter(code => code !== courseCode)
      : [...currentCompleted, courseCode];
    
    const updatedProfile = { 
      ...profile, 
      completed_courses: newCompleted 
    };
    
    handleInputChange('completed_courses' as any, newCompleted as any);
    await handleSave([], updatedProfile);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'IC': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'PC': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100';
      case 'PL': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100';
      case 'PE': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100';
      case 'OE': return 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100';
      case 'LA': return 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-100';
      case 'NC': return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between bg-muted/30 p-6 rounded-2xl border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Academic Curriculum</h2>
            <p className="text-muted-foreground text-sm">Explore program-wise course structures</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
          <div className="w-full sm:w-[150px]">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block px-1">Degree</label>
            <Select value={selectedDegree} onValueChange={handleDegreeChange}>
              <SelectTrigger className="w-full bg-background/50 backdrop-blur-sm border-muted-foreground/20">
                <SelectValue placeholder="Degree" />
              </SelectTrigger>
              <SelectContent>
                {degrees.map((degree) => (
                  <SelectItem key={degree} value={degree}>
                    {degree}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-[350px]">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block px-1">Department / Branch</label>
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-full bg-background/50 backdrop-blur-sm border-muted-foreground/20">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {branchesForDegree.map((branch) => (
                  <SelectItem key={branch.branch} value={branch.branch}>
                    {branch.branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="1" className="w-full" value={selectedSemester} onValueChange={setSelectedSemester}>
        <div className="flex items-center justify-between mb-4 border-b pb-4 overflow-x-auto">
          <TabsList className="h-11 p-1 bg-muted/50 rounded-lg">
            {semesters.map((sem) => (
              <TabsTrigger 
                key={sem.semester} 
                value={sem.semester.toString()}
                className="px-6 py-2 rounded-md transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm text-sm font-medium"
              >
                {typeof sem.semester === 'number' ? `Semester ${sem.semester}` : sem.semester}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="hidden lg:flex items-center gap-4">
            <div className="h-8 w-[1px] bg-border mx-2" />
            <Badge variant="outline" className="h-9 px-4 rounded-lg bg-background/50 text-sm font-semibold border-primary/20 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground font-normal italic mr-1">Total:</span> 
              {semesters.find(s => s.semester.toString() === selectedSemester)?.totalCredits || 0} Credits
            </Badge>
          </div>
        </div>

        {semesters.map((sem) => (
          <TabsContent key={sem.semester} value={sem.semester.toString()} className="mt-0 outline-none">
            <div className="lg:hidden mb-4 flex justify-end">
              <Badge variant="outline" className="h-8 px-4 font-semibold border-primary/20 flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-primary" />
                {sem.totalCredits} Credits
              </Badge>
            </div>

            <div className="rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[110px] py-4 pl-6 font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Code</TableHead>
                      <TableHead className="py-4 font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Course Name</TableHead>
                      <TableHead className="w-[120px] py-4 text-center font-bold uppercase text-[10px] tracking-widest text-muted-foreground">L-T-P-C</TableHead>
                      <TableHead className="w-[100px] py-4 text-center font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Category</TableHead>
                      <TableHead className="w-[80px] py-4 text-center font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Credits</TableHead>
                      {profile && <TableHead className="w-[80px] py-4 pr-6 text-right font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Done</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sem.courses.map((course) => (
                      <TableRow 
                        key={course.code} 
                        className={cn(
                          "group transition-colors border-muted/30",
                          isCompleted(course.code) ? "bg-primary/[0.03] hover:bg-primary/[0.05]" : "hover:bg-muted/20"
                        )}
                      >
                        <TableCell className={cn(
                          "py-4 pl-6 font-mono font-bold text-sm",
                          isCompleted(course.code) ? "text-primary/60" : "text-primary"
                        )}>
                          {course.code}
                        </TableCell>
                        <TableCell className={cn(
                          "py-4 font-semibold text-sm transition-colors",
                          isCompleted(course.code) ? "text-muted-foreground line-through decoration-primary/30" : "group-hover:text-primary"
                        )}>
                          {course.name}
                        </TableCell>
                        <TableCell className="py-4 text-center font-mono text-xs text-muted-foreground">
                          {course.ltpc}
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          <Badge className={cn(
                            getCategoryColor(course.category),
                            "border-none shadow-none text-[10px] px-2 py-0 h-5 font-bold uppercase tracking-wider",
                            isCompleted(course.code) && "opacity-50"
                          )}>
                            {course.category}
                          </Badge>
                        </TableCell>
                        <TableCell className={cn(
                          "py-4 text-center font-bold text-sm",
                          isCompleted(course.code) && "text-muted-foreground"
                        )}>
                          {course.credits}
                        </TableCell>
                        {profile && (
                          <TableCell className="py-4 pr-6 text-right">
                            <button 
                              onClick={() => toggleCompletion(course.code)}
                              disabled={profileLoading}
                              className={cn(
                                "p-2 rounded-full transition-all duration-200 hover:scale-110",
                                isCompleted(course.code) 
                                  ? "text-primary bg-primary/10" 
                                  : "text-muted-foreground/30 hover:text-primary hover:bg-primary/5"
                              )}
                            >
                              {isCompleted(course.code) ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                            </button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="pt-4 flex flex-wrap gap-x-6 gap-y-3 px-2 border-t border-dashed">
        <div className="flex items-center gap-2 group cursor-help">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" /> 
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Institute Core (IC)</span>
        </div>
        <div className="flex items-center gap-2 group cursor-help">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform" /> 
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Program Core (PC)</span>
        </div>
        <div className="flex items-center gap-2 group cursor-help">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-150 transition-transform" /> 
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Program Elective (PE)</span>
        </div>
        <div className="flex items-center gap-2 group cursor-help">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 group-hover:scale-150 transition-transform" /> 
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Open Elective (OE)</span>
        </div>
        <div className="flex items-center gap-2 group cursor-help">
          <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 group-hover:scale-150 transition-transform" /> 
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Liberal Arts (LA)</span>
        </div>
      </div>
    </div>
  );
}
