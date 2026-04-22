"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Home, BookOpen, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Course } from "@/types/courses";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CourseHeaderProps {
  course: Course;
}

const CourseHeader = ({ course }: CourseHeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -70, opacity: 0 }}
          className="fixed top-20 left-0 right-0 z-50 px-6 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
             <div className="flex items-center gap-4 min-w-0">
               <Badge className="bg-indigo-600 text-white font-black px-2 py-0.5 rounded-lg text-[10px] uppercase shadow-md shadow-indigo-500/10">
                 {course.code}
               </Badge>
               <h2 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                 {course.title}
               </h2>
             </div>

             <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-8 mr-4 border-r border-slate-200 dark:border-slate-800 pr-8">
                   <div className="flex flex-col items-end">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Structure</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{course.schedule.lectures}-{course.schedule.tutorials}-{course.schedule.labs}</span>
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Credits</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{course.credits} Units</span>
                   </div>
                </div>
                <button className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-500/20">
                  Bookmark
                </button>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CourseHeader;
