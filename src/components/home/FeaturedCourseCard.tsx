"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Users, Zap } from "lucide-react";
import { Course } from "@/types/courses";
import { useCourseStats } from "@/hooks/useCourseStats";

interface FeaturedCourseCardProps {
  course: Course;
}

export function FeaturedCourseCard({ course }: FeaturedCourseCardProps) {
  const { studentCount, isLoading } = useCourseStats(course.code);

  return (
    <Link href={`/courses/${course.id}`}>
      <motion.div 
        whileHover={{ y: -5 }}
        className="relative group overflow-hidden rounded-xl h-[500px] shadow-xl cursor-pointer border border-border"
      >
        <img 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          src={`https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-12 w-full">
          <Badge className="bg-primary text-primary-foreground text-[10px] font-black px-4 py-1.5 rounded-md uppercase mb-6 border-0 tracking-widest">
            Academic Pathway
          </Badge>
          <h3 className="text-white text-4xl font-black mb-8 leading-tight max-w-2xl text-balance">
            {course.code}: {course.title}
          </h3>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 text-white/90 text-sm font-black uppercase tracking-widest">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span>{isLoading ? "..." : studentCount}+ Scholars</span>
            </div>
            <div className="flex items-center gap-3 text-white/90 text-sm font-black uppercase tracking-widest">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span>{course.credits} Credits</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
