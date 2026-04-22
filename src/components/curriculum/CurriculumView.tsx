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
import { Badge } from "@/components/ui/badge";
import { BookOpen, CreditCard, GraduationCap, CheckCircle2, Circle, ChevronRight, Layers, LayoutPanelLeft } from "lucide-react";
import { useProfileContext } from "@/context/ProfileContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function CurriculumView() {
  const degrees = Array.from(new Set(curriculumData.map(b => b.degree)));
  const [selectedDegree, setSelectedDegree] = useState<string>(degrees[0]);
  
  const branchesForDegree = curriculumData.filter(b => b.degree === selectedDegree);
  const [selectedBranch, setSelectedBranch] = useState<string>(branchesForDegree[0].branch);
  
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
      case 'IC': return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'PC': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'PL': return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'PE': return 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'OE': return 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
      case 'LA': return 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-400';
      case 'NC': return 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-12">
      {/* Control Panel */}
      <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] flex items-center justify-center shadow-sm">
             <GraduationCap className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Curriculum <span className="text-indigo-600">Map</span></h2>
            <p className="text-slate-500 font-medium">Explore the blueprint of your academic journey.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Program</span>
            <Select value={selectedDegree} onValueChange={handleDegreeChange}>
              <SelectTrigger className="h-12 w-full sm:w-[180px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl font-bold shadow-sm">
                <SelectValue placeholder="Degree" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {degrees.map((degree) => (
                  <SelectItem key={degree} value={degree} className="font-medium">{degree}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Specialization</span>
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="h-12 w-full sm:w-[350px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl font-bold shadow-sm">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {branchesForDegree.map((branch) => (
                  <SelectItem key={branch.branch} value={branch.branch} className="font-medium">{branch.branch}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="1" className="w-full" value={selectedSemester} onValueChange={setSelectedSemester}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
          <TabsList className="bg-transparent h-auto p-0 gap-8 justify-start flex">
            {semesters.map((sem) => (
              <TabsTrigger 
                key={sem.semester} 
                value={sem.semester.toString()}
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-indigo-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 dark:data-[state=active]:border-emerald-400 rounded-none px-0 py-2 text-sm font-black uppercase tracking-widest text-slate-500 transition-all whitespace-nowrap"
              >
                {typeof sem.semester === 'number' ? `SEM ${sem.semester}` : sem.semester}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800">
            <LayoutPanelLeft className="w-4 h-4 text-indigo-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Semester Intensity</span> 
            <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
               {semesters.find(s => s.semester.toString() === selectedSemester)?.totalCredits || 0} Credits
            </span>
          </div>
        </div>

        {semesters.map((sem) => (
          <TabsContent key={sem.semester} value={sem.semester.toString()} className="mt-0 outline-none">
            <div className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-slate-100 dark:border-slate-800 hover:bg-transparent bg-slate-50/50 dark:bg-slate-900/50">
                      <TableHead className="py-6 pl-8 font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">Protocol</TableHead>
                      <TableHead className="py-6 font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">Pathway Description</TableHead>
                      <TableHead className="py-6 text-center font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">L-T-P-C</TableHead>
                      <TableHead className="py-6 text-center font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">Type</TableHead>
                      <TableHead className="py-6 text-center font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sem.courses.map((course) => (
                      <TableRow 
                        key={course.code} 
                        className={cn(
                          "group transition-all border-b border-slate-100 dark:border-slate-800",
                          isCompleted(course.code) ? "bg-emerald-50/20 dark:bg-emerald-950/10" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        )}
                      >
                        <TableCell className="py-6 pl-8">
                          <span className={cn(
                            "text-sm font-black uppercase tracking-tighter transition-colors",
                            isCompleted(course.code) ? "text-emerald-600 dark:text-emerald-400" : "text-indigo-600 dark:text-indigo-400"
                          )}>
                            {course.code}
                          </span>
                        </TableCell>
                        <TableCell className="py-6">
                           <div className="space-y-1">
                              <p className={cn(
                                "text-sm font-bold transition-all",
                                isCompleted(course.code) ? "text-slate-400 line-through decoration-emerald-500/30" : "text-slate-900 dark:text-white"
                              )}>
                                {course.name}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase text-slate-300">Section V.01</span>
                              </div>
                           </div>
                        </TableCell>
                        <TableCell className="py-6 text-center font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {course.ltpc}
                        </TableCell>
                        <TableCell className="py-6 text-center">
                          <Badge className={cn(
                             getCategoryColor(course.category),
                            "border-0 shadow-none text-[9px] px-2 py-0.5 h-6 font-black uppercase tracking-widest rounded-lg",
                            isCompleted(course.code) && "opacity-40"
                          )}>
                            {course.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-6 pr-8 text-right">
                           <div className="flex justify-center">
                            <button 
                                onClick={() => toggleCompletion(course.code)}
                                disabled={profileLoading}
                                className={cn(
                                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                                  isCompleted(course.code) 
                                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shadow-md shadow-emerald-500/10" 
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-300 hover:text-indigo-600 hover:shadow-lg hover:shadow-indigo-500/10"
                                )}
                              >
                                {isCompleted(course.code) ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                              </button>
                           </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="pt-8 flex flex-wrap gap-x-8 gap-y-4 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 group">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" /> 
          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Ins Core</span>
        </div>
        <div className="flex items-center gap-3 group">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> 
          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Prog Core</span>
        </div>
        <div className="flex items-center gap-3 group">
          <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" /> 
          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Prog Lab</span>
        </div>
        <div className="flex items-center gap-3 group">
          <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" /> 
          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Prog Elec</span>
        </div>
        <div className="flex items-center gap-3 group">
          <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" /> 
          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Open Elec</span>
        </div>
      </div>
    </div>
  );
}
