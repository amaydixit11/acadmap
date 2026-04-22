"use client"

import { Course } from "@/types/courses";
import { User } from "@supabase/supabase-js";
import { useResources } from "@/hooks/useResources";
import { 
  FileText, 
  Library, 
  Download, 
  PlayCircle, 
  ChevronRight, 
  ThumbsUp, 
  ThumbsDown,
  Verified,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ResourceSectionProps {
  course: Course;
  user?: User | null;
}

export function ResourceSection({ course, user }: ResourceSectionProps) {
  const { resources, isLoading } = useResources(course.code);

  const lectureNotes = resources.filter(r => r.category === 'lecture').slice(0, 2);
  const pyqs = resources.filter(r => r.category === 'pyq').slice(0, 2);
  const tutorials = resources.filter(r => r.type === 'video').slice(0, 2);

  return (
    <div className="space-y-16">
      {/* Lecture Notes Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <FileText className="w-5 h-5" />
             </div>
             <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Lecture Notes</h3>
          </div>
          <button className="text-xs font-black uppercase tracking-widest text-indigo-600 hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {lectureNotes.length > 0 ? lectureNotes.map((res) => (
             <div key={res.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-start justify-between mb-4">
                   <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                      <FileText className="w-5 h-5" />
                   </div>
                   {res.is_verified && (
                     <Badge className="bg-indigo-50 text-indigo-700 border-0 font-bold text-[10px] uppercase px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Verified className="w-3 h-3" /> Verified
                     </Badge>
                   )}
                </div>
                <div className="space-y-1 mb-8">
                  <h4 className="font-bold text-slate-900 dark:text-white leading-snug truncate">{res.title}</h4>
                  <p className="text-xs text-slate-400 font-medium tracking-tight">
                    {res.author_name || 'Contributor'} • {new Date(res.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                   <div className="flex items-center gap-4 text-slate-400">
                      <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                         <ThumbsUp className="w-4 h-4" />
                         <span className="text-xs font-bold">{res.upvotes || 0}</span>
                      </button>
                   </div>
                   <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <Download className="w-4 h-4" />
                   </a>
                </div>
             </div>
           )) : (
             <div className="col-span-full py-8 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl text-slate-400 text-sm font-bold">
               No lecture notes available yet.
             </div>
           )}
        </div>
      </div>

      {/* PYQ Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Library className="w-5 h-5" />
           </div>
           <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Previous Year Questions</h3>
        </div>

        <div className="space-y-3">
           {pyqs.length > 0 ? pyqs.map((res) => (
             <a key={res.id} href={res.url} target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 flex items-center justify-between group cursor-pointer hover:border-indigo-200 transition-all shadow-sm">
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                      {res.year || 'PYQ'}
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{res.title}</h4>
                      <p className="text-xs text-slate-400 font-medium tracking-tight truncate max-w-md">{res.description || 'Examination resource'}</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </div>
             </a>
           )) : (
             <p className="text-sm text-slate-400 italic font-bold">No previous year questions found for this course.</p>
           )}
        </div>
      </div>

      {/* Video Tutorials Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <PlayCircle className="w-5 h-5" />
           </div>
           <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Video Tutorials</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {tutorials.length > 0 ? tutorials.map((res) => (
             <a key={res.id} href={res.url} target="_blank" rel="noopener noreferrer" className="group cursor-pointer">
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 shadow-sm border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
                   <img 
                    src={res.thumbnail_url || `https://img.youtube.com/vi/${res.url.split('v=')[1]?.split('&')[0]}/maxresdefault.jpg`} 
                    alt={res.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'; }}
                   />
                   <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-2xl">
                         <PlayCircle className="w-6 h-6 fill-current" />
                      </div>
                   </div>
                </div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-900 dark:text-white tracking-tight leading-snug truncate">{res.title}</h4>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Video Contribution</p>
                </div>
             </a>
           )) : (
             <div className="col-span-full py-8 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl text-slate-400 text-sm font-bold">
               No video tutorials uploaded yet.
             </div>
           )}
        </div>
      </div>
    </div>
  );
}