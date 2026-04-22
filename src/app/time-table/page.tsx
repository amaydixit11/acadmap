"use client";

import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeTableParsedCourse } from "@/types/time-table";
import { parseCSV } from "@/lib/time-table";
import { calculateCurrentSemester } from "@/utils/curriculum";
import { curriculumData } from "@/data/curriculumData";
import { TimeTableCourseList } from "@/components/time-table/course-list";
import Timetable from "@/components/time-table/timetable";
import { cn } from "@/lib/utils";
import { detectClashes, SlotClash } from "@/lib/clashes";
import { ClashesTab } from "@/components/time-table/clashesTab";
import { useProfileContext } from "@/context/ProfileContext";
import { Loader2, Save, Calendar, BookOpen, AlertTriangle, Settings2, Home, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SavedTimetablesPanel } from "@/components/time-table/SavedTimetablesPanel";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function TimeTablePage() {
  return (
    <TimeTableContent />
  );
}

function TimeTableContent() {
  const { profile, handleInputChange, handleSave, loading: profileLoading } = useProfileContext();
  const [courses, setCourses] = useState<TimeTableParsedCourse[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<
    TimeTableParsedCourse[]
  >([]);
  const [isCompact, setIsCompact] = useState(true);
  const [viewSlots, setViewSlots] = useState(false);
  const [clashes, setClashes] = useState<SlotClash[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync selected courses from profile AND core curriculum when both are loaded
  useEffect(() => {
    if (profile && courses.length > 0 && !isInitialized) {
      const profileCodes = profile.selected_courses || [];
      let coreCodes: string[] = [];
      if (profile.batch && profile.program && profile.department) {
        const gradYear = parseInt(profile.batch);
        if (!isNaN(gradYear)) {
          const currentSemester = calculateCurrentSemester(gradYear, profile.program);
          const branchData = curriculumData.find(
            b => b.branch === profile.department && b.degree === profile.program
          );
          if (branchData) {
            const semesterData = branchData.semesters.find(s => s.semester === currentSemester);
            if (semesterData) {
              coreCodes = semesterData.courses.flatMap(c => c.code.toUpperCase().split('/'));
            }
          }
        }
      }

      const allSelectedCodes = new Set([
        ...profileCodes.map(c => c.toUpperCase()),
        ...coreCodes.map(c => c.toUpperCase())
      ]);

      const initialSelected = courses.filter(c => 
        allSelectedCodes.has(c.code.toUpperCase())
      );
      
      setSelectedCourses(initialSelected);
      setIsInitialized(true);
    }
  }, [profile, courses, isInitialized]);

  useEffect(() => {
    const detectedClashes = detectClashes(selectedCourses);
    setClashes(detectedClashes);
  }, [selectedCourses]);

  const handleSaveToProfile = async () => {
    if (!profile) return;
    
    const courseCodes = selectedCourses.map(c => c.code);
    const updatedProfile = { 
      ...profile, 
      selected_courses: courseCodes 
    };
    
    handleInputChange('selected_courses' as any, courseCodes as any);
    await handleSave([], updatedProfile); 
  };

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetch("/file.csv");
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        const csvText = await response.text();
        const parsedCourses = await parseCSV(csvText);
        setCourses(parsedCourses);
      } catch (error) {
        console.error("Error loading and parsing CSV:", error);
      }
    };

    loadCourses();
  }, []);

  const handleCourseSelect = (course: TimeTableParsedCourse) => {
    setSelectedCourses((prev) => {
      const isSelected = prev.some((c) => c.code === course.code);
      if (isSelected) {
        return prev.filter((c) => c.code !== course.code);
      }
      return [...prev, course];
    });
  };

  const handleLoadTimetable = useCallback((courseCodes: string[]) => {
    const matchedCourses = courses.filter(c => 
      courseCodes.includes(c.code)
    );
    setSelectedCourses(matchedCourses);
  }, [courses]);

  return (
    <main className="min-h-screen bg-[#f8f9ff] dark:bg-[#0b0c10]">
      <div className="container mx-auto px-4 py-4 max-w-7xl relative z-10">
        
        {/* Navigation Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-4 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 dark:text-white">Timetable</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
           <div className="space-y-1">
             <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
               Scheduler <span className="text-indigo-600 dark:text-emerald-400">Pro</span>
             </h1>
             <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
               Construct your ideal academic week. Detect clashes automatically.
             </p>
           </div>
           
           <div className="flex items-center gap-2">
             {profile && (
               <Button 
                 onClick={handleSaveToProfile}
                 disabled={profileLoading}
                 className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md shadow-indigo-500/20 gap-2 border-0 text-xs"
               >
                 {profileLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                 Save
               </Button>
             )}
             <div className="h-9 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center gap-3 shadow-sm">
                <div className="flex items-center gap-2">
                   <div className={cn("w-1.5 h-1.5 rounded-full", clashes.length > 0 ? "bg-rose-500 animate-pulse" : "bg-emerald-500")} />
                   <span className="text-[8px] font-black uppercase text-slate-400">{clashes.length} Clashes</span>
                </div>
             </div>
           </div>
        </div>

        {courses.length > 0 ? (
          <div className="w-full">
            <Tabs defaultValue="courses" className="w-full">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                <TabsList className="bg-transparent h-auto p-0 gap-6 justify-start">
                  <TabsTrigger 
                    value="courses"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-indigo-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 dark:data-[state=active]:border-emerald-400 rounded-none px-0 py-1 text-xs font-bold text-slate-500 flex items-center gap-2"
                  >
                    <BookOpen className="w-3 h-3" />
                    Archive
                  </TabsTrigger>
                  <TabsTrigger 
                    value="timetable"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-indigo-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 dark:data-[state=active]:border-emerald-400 rounded-none px-0 py-1 text-xs font-bold text-slate-500 flex items-center gap-2"
                  >
                    <Calendar className="w-3 h-3" />
                    Grid View
                  </TabsTrigger>
                  <TabsTrigger 
                    value="clashes"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-rose-600 dark:data-[state=active]:text-rose-400 data-[state=active]:border-b-2 data-[state=active]:border-rose-600 dark:data-[state=active]:border-rose-400 rounded-none px-0 py-1 text-xs font-bold text-slate-500 flex items-center gap-2"
                  >
                    <AlertTriangle className="w-3 h-3" />
                    Conflicts
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-3 px-3 py-1 bg-slate-100/50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="compact-mode"
                          checked={isCompact}
                          onChange={(e) => setIsCompact(e.target.checked)}
                          className="w-3 h-3 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="compact-mode" className="text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest cursor-pointer">Compact</label>
                      </div>
                      <div className="w-px h-3 bg-slate-300 dark:bg-slate-700" />
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="slots"
                          checked={viewSlots}
                          onChange={(e) => setViewSlots(e.target.checked)}
                          className="w-3 h-3 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="slots" className="text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest cursor-pointer">Slots</label>
                      </div>
                   </div>
                   <SavedTimetablesPanel
                      currentCourseCodes={selectedCourses.map(c => c.code)}
                      onLoadTimetable={handleLoadTimetable}
                    />
                </div>
              </div>

              <div className="min-h-[300px]">
                <TabsContent value="courses" className="m-0 focus-visible:outline-none">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-6 shadow-sm">
                      <TimeTableCourseList
                        courses={courses}
                        selectedCourses={selectedCourses}
                        onCourseSelect={handleCourseSelect}
                      />
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="timetable" className="m-0 focus-visible:outline-none">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-1 shadow-sm overflow-x-auto">
                      <Timetable
                        selectedCourses={selectedCourses}
                        isCompact={isCompact}
                        viewSlots={viewSlots}
                      />
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="clashes" className="m-0 focus-visible:outline-none">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                      <ClashesTab
                        clashes={clashes}
                        selectedCourses={selectedCourses}
                        allCourses={courses}
                      />
                    </div>
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-24 space-y-8 bg-white dark:bg-slate-900/50 rounded-[3rem] border border-slate-100 dark:border-slate-800">
             <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
             </div>
             <div className="text-center space-y-2">
                <h3 className="text-2xl font-black uppercase text-slate-900 dark:text-white">Initializing Architect</h3>
                <p className="text-slate-500 font-medium">Pulling latest course data from the IITB vault...</p>
             </div>
             <div className="w-64 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-indigo-600"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
             </div>
          </div>
        )}
      </div>
    </main>
  );
}
