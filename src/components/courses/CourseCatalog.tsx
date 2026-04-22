import React from 'react';
import { useCourses } from "@/hooks/useCourses";
import { Skeleton } from "../ui/skeleton";
import { Course } from "@/types/courses";
import CourseCard from "./CourseCard";
import { Search, Info } from "lucide-react";
import { motion } from "framer-motion";

interface CourseCatalogProps {
    courses: Course[];
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ courses }) => {
    const { isLoading } = useCourses();

    if (isLoading) {
        return (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 9 }).map((_, idx) => (
                    <div key={idx} className="h-80 w-full rounded-[2rem] bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-8 space-y-6">
                        <div className="flex justify-between">
                          <Skeleton className="h-6 w-20 rounded-lg" />
                          <Skeleton className="h-6 w-6 rounded-full" />
                        </div>
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-16 w-full" />
                        <div className="flex gap-3">
                          <Skeleton className="h-8 w-24 rounded-xl" />
                          <Skeleton className="h-8 w-24 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center min-h-[400px] p-12 bg-white dark:bg-slate-900/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 text-center"
            >
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-8">
                    <Search className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    No results found
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-8">
                    We couldn't find any courses matching your specific filters. 
                    Try expanding your search or clearing the selection.
                </p>
                <button className="text-sm font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:underline">
                  Clear All Filters
                </button>
            </motion.div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                    Displaying <span className="text-slate-900 dark:text-white">{courses.length}</span> Academic Nodes
                </p>
            </div>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {courses.map((course, idx) => (
                    <motion.div 
                      key={course.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                        <CourseCard course={course} />
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-12 p-8 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/50 flex flex-col md:flex-row items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
                    <Info className="w-6 h-6" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-300">About the Catalog</h4>
                  <p className="text-sm text-indigo-600 dark:text-indigo-500 leading-relaxed">
                    This catalog is live-updated by the student community. Verified resources are checked for accuracy and quality before appearing in the primary vault.
                  </p>
                </div>
            </div>
        </div>
    );
};

export default CourseCatalog;