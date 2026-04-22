"use client"

import React from 'react';
import { Calendar, BookOpen, Clock, Users, Layers, Zap } from "lucide-react";
import { Course } from "@/types/courses";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CourseScheduleProps {
  course: Course;
}

export function CourseSchedule({ course }: CourseScheduleProps) {
  const lectures = Number(course.schedule.lectures) || 0;
  const labs = Number(course.schedule.labs) || 0;
  const tutorials = Number(course.schedule.tutorials) || 0;

  const scheduleItems = [
    { 
      label: "Lectures", 
      icon: BookOpen, 
      hours: lectures, 
      color: "text-indigo-600 dark:text-indigo-400",
      accent: "bg-indigo-600",
      description: "Theoretical frameworks and core concepts"
    },
    { 
      label: "Laboratories", 
      icon: Layers, 
      hours: labs, 
      color: "text-emerald-600 dark:text-emerald-400",
      accent: "bg-emerald-600",
      description: "Practical application and experimentation"
    },
    { 
      label: "Tutorials", 
      icon: Users, 
      hours: tutorials, 
      color: "text-amber-600 dark:text-amber-400",
      accent: "bg-amber-600",
      description: "Problem-solving and peer interaction"
    }
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight text-center md:text-left">Weekly Engagement</h3>
          <p className="text-sm text-slate-500 font-medium text-center md:text-left">Anatomy of the learning hours assigned to this course.</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/40 px-4 py-2 rounded-xl self-center">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
            {lectures + labs + tutorials} Contact Hours / Week
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {scheduleItems.map((item, idx) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 overflow-hidden"
          >
            {/* Background Accent */}
            <div className={cn(
              "absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500",
              item.accent
            )} />

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <item.icon className={cn("w-7 h-7", item.color)} />
              </div>
              
              <div className="space-y-2 mb-8">
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {item.label}
                </h4>
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-black text-slate-900 dark:text-white">{item.hours}</span>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hours</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-medium leading-relaxed mt-auto">
                {item.description}
              </p>
            </div>
            
            {/* Bottom Progress Indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-50 dark:bg-slate-800">
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                className={cn("h-full", item.accent)}
               />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-900 dark:bg-slate-800/20 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-500/20 shrink-0">
               <Zap className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-2 flex-1 text-center md:text-left">
               <h4 className="text-xl font-black tracking-tight">Academic Intensity Score</h4>
               <p className="text-indigo-100/60 text-sm font-medium">
                 Based on {course.credits} credits and {course.schedule.lectures + course.schedule.labs + course.schedule.tutorials} weekly contact hours, 
                 this course requires a dedicated engagement of approximately {course.credits * 3} study hours per week.
               </p>
            </div>
            <div className="text-center md:text-right px-8 py-4 bg-white/10 rounded-3xl backdrop-blur-md border border-white/10">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200 mb-1">Impact Level</p>
               <p className="text-2xl font-black">{course.credits >= 4 ? 'High Voltage' : course.credits >= 3 ? 'Standard' : 'Guided'}</p>
            </div>
         </div>
      </div>
    </div>
  );
}

export default CourseSchedule;
