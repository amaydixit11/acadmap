"use client"

import { useState, useEffect, useMemo } from "react";
import { Users, Star, CheckCircle, ShieldCheck, MessageSquare, Plus, Calendar, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/types/courses";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import Link from 'next/link';

import { useTimetable } from "@/hooks/useTimetable";
import { getCoursesForSlot, parseSlotString } from "@/lib/time-table";
import { timeTableSlots } from "@/types/time-table";

interface CourseSidebarProps {
  course: Course;
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const [session, setSession] = useState<any>(null);
  const { courses: timetableCourses, isLoading: timetableLoading } = useTimetable();
  const supabase = createClient();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session);
    };
    fetchSession();
  }, []);

  // Calculate difficulty based on credits and level
  const difficulty = course.credits > 3.5 ? "Hard" : course.credits > 2.5 ? "Medium" : "Easy";
  const difficultyValue = difficulty === "Hard" ? 85 : difficulty === "Medium" ? 55 : 30;

  // Find next occurrences in timetable
  const courseTimeSlots = timetableCourses.filter(c => c.code.toUpperCase() === course.code.toUpperCase());
  
  const nextClasses = useMemo(() => {
    if (courseTimeSlots.length === 0) return [];
    
    const classes: any[] = [];
    const tc = courseTimeSlots[0];
    
    // Simple logic to find occurrences
    timeTableSlots.forEach(slot => {
      const isLecture = parseSlotString(tc.lectureSlot).some(ps => slot.slots.includes(ps.letter));
      const isTut = parseSlotString(tc.tutorialSlot).some(ps => slot.slots.includes(ps.letter));
      
      if (isLecture) classes.push({ day: slot.day, time: slot.time, type: 'Lecture', venue: tc.lectureVenue });
      if (isTut) classes.push({ day: slot.day, time: slot.time, type: 'Tutorial', venue: tc.tutorialVenue });
    });

    // Sort by day of week (naive)
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return classes.sort((a,b) => days.indexOf(a.day) - days.indexOf(b.day)).slice(0, 2);
  }, [courseTimeSlots]);

  const progress = 0; // Future: fetch from user progress
  const checklist = (course.syllabus || []).slice(0, 4).map((topic, i) => ({
    id: i,
    title: topic,
    checked: false
  }));

  return (
    <div className="space-y-8">
      {/* Course Overview */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm space-y-8">
        <h3 className="text-lg font-black text-slate-900 dark:text-white">Course Overview</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tight">
            <span className="text-slate-400">Difficulty</span>
            <span className="text-slate-900 dark:text-white">{difficulty}</span>
          </div>
          <Progress value={difficultyValue} className="h-2.5 bg-slate-100 dark:bg-slate-800" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Credits</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{course.credits.toFixed(1)}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Source</p>
            <p className="text-xs font-black text-slate-900 dark:text-white">Academic Handbook</p>
          </div>
        </div>

        <Link href={`/groups?course=${course.code}`}>
          <Button className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xl shadow-indigo-500/20 gap-3">
            <MessageSquare className="w-5 h-5" /> Join Study Group
          </Button>
        </Link>
      </div>

      {/* Syllabus Progress */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Module Outline</h3>
          <span className="text-sm font-black text-indigo-600">{progress}%</span>
        </div>

        <div className="space-y-4">
          {checklist.length > 0 ? checklist.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className={cn(
                "w-5 h-5 rounded flex items-center justify-center transition-colors",
                item.checked ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-transparent border border-slate-200 dark:border-slate-700"
              )}>
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
              <span className={cn(
                "text-sm font-bold truncate",
                item.checked ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"
              )}>
                {item.title}
              </span>
            </div>
          )) : (
            <p className="text-xs text-slate-400 italic">No syllabus items available yet.</p>
          )}
        </div>

        <button className="w-full py-2 text-xs font-black uppercase tracking-wider text-slate-400 hover:text-indigo-600 transition-colors">
          View Detail Breakdown ▾
        </button>
      </div>

      {/* Next Up */}
      <div className="bg-[#111827] rounded-[2.5rem] p-8 shadow-sm space-y-6 text-white text-left">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-black uppercase tracking-widest text-left">Next Up</h3>
        </div>

        <div className="space-y-4">
          {timetableLoading ? (
            <div className="animate-pulse space-y-2">
               <div className="h-4 bg-slate-800 rounded w-1/2"></div>
               <div className="h-4 bg-slate-800 rounded w-3/4"></div>
            </div>
          ) : nextClasses.length > 0 ? nextClasses.map((cls, i) => (
            <div key={i} className="bg-slate-800/40 border border-white/5 rounded-2xl p-5 space-y-1 text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{cls.day} • {cls.time}</span>
              <p className="text-sm font-bold">{cls.type}: {course.code}</p>
              <p className="text-xs text-slate-400">{cls.venue}</p>
            </div>
          )) : (
            <div className="text-left">
               <p className="text-xs text-slate-400 italic">No scheduled sessions found for this course.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
