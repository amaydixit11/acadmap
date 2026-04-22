"use client"
import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Film, 
  File,
  Archive,
  BookOpen,
  X,
  Plus,
  LayoutGrid,
  List,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ChevronRight,
  Home
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { ResourceModel } from '@/models/resources';
import { useResources } from '@/hooks/useResources';
import { UpvoteButton, BookmarkButton } from '@/components/resources';
import { cn } from "@/lib/utils";

const getResourceIcon = (type: ResourceModel['type']) => {
  const iconMap = {
    'document': <FileText className="h-5 w-5 text-indigo-500" />,
    'video': <Film className="h-5 w-5 text-amber-500" />,
    'image': <ImageIcon className="h-5 w-5 text-emerald-500" />,
    'archive': <Archive className="h-5 w-5 text-purple-500" />,
    'link': <LinkIcon className="h-5 w-5 text-blue-500" />,
    'other': <File className="h-5 w-5 text-slate-500" />
  };
  return iconMap[type] || iconMap.other;
};

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<ResourceModel['type'] | ''>("");
  const [selectedCategory, setSelectedCategory] = useState<ResourceModel['category'] | ''>("");
  const [selectedResource, setSelectedResource] = useState<ResourceModel | null>(null);
  const { resources } = useResources();

  const filteredResources = useMemo(() => 
    resources.filter(resource => 
      (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       resource.course_code.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedType ? resource.type === selectedType : true) &&
      (selectedCategory ? resource.category === selectedCategory : true)
    ),
    [resources, searchTerm, selectedType, selectedCategory]
  );

  const types: ResourceModel['type'][] = ['document', 'video', 'image', 'archive', 'link', 'other'];
  const categories: ResourceModel['category'][] = ['lecture', 'tutorial', 'assignment', 'pyq', 'lab'];

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedCategory("");
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] dark:bg-[#0b0c10]">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        
        {/* Header Section */}
        <header className="mb-12">
          <nav className="flex items-center gap-2 mb-4 text-sm font-medium text-slate-500">
            <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 dark:text-white">Resources</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                Resource Vault
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
                Access over {resources.length}+ curated academic materials. 
                Sourced and verified by the student community.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
               <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shadow-sm">
                  <button className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <List className="w-4 h-4" />
                  </button>
               </div>
               <Button className="rounded-xl h-11 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 px-6 font-bold" asChild>
                  <Link href="/upload">
                    <Plus className="w-4 h-4 mr-2" /> Upload Material
                  </Link>
               </Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Filters</h3>
                {(selectedType || selectedCategory || searchTerm) && (
                  <button onClick={clearFilters} className="text-[10px] font-black uppercase text-red-500 hover:underline">Reset</button>
                )}
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Resource Type</label>
                  <div className="flex flex-wrap gap-2">
                    {types.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(selectedType === type ? "" : type)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border",
                          selectedType === type 
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20" 
                            : "bg-slate-50 dark:bg-slate-800 border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Category</label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all border",
                          selectedCategory === category 
                            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400" 
                            : "bg-transparent border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                        )}
                      >
                         <span className="capitalize">{category}</span>
                         {selectedCategory === category && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Contributor Stats or Leaderboard hint */}
            <div className="p-8 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2rem] text-white shadow-xl shadow-indigo-500/20">
               <TrendingUp className="w-8 h-8 mb-4 text-indigo-200" />
               <h4 className="text-xl font-black mb-2">Top Contributor?</h4>
               <p className="text-indigo-100/70 text-sm leading-relaxed mb-6">
                 Earn badges and clinical recognition by sharing high-quality academic archives.
               </p>
               <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 rounded-xl font-bold uppercase tracking-tight text-xs" asChild>
                 <Link href="/leaderboard">View Leaderboard</Link>
               </Button>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="lg:col-span-9 space-y-8">
            {/* Inline Search */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500" />
                <Input
                  placeholder="Search by title, course code (e.g., CS201)..."
                  className={cn(
                    "h-16 pl-14 pr-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl text-lg shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all",
                    "dark:text-white dark:placeholder-slate-500"
                  )}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Results Grid */}
            <AnimatePresence mode="popLayout">
              <motion.div 
                layout
                className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filteredResources.map((resource) => (
                  <motion.div
                    key={resource.resourceId}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group"
                    onClick={() => setSelectedResource(resource)}
                  >
                    <Card className="h-full cursor-pointer rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                      <div className="h-32 bg-slate-50 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center">
                         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent" />
                         <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
                            {getResourceIcon(resource.type)}
                         </div>
                         <Badge className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 border-0 font-bold px-2 py-0.5 rounded-lg text-[10px] uppercase shadow-sm">
                            {resource.type}
                         </Badge>
                      </div>
                      
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-indigo-600 dark:text-emerald-400 uppercase tracking-tighter bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                            {resource.course_code}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {resource.category}
                          </span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                          {resource.title}
                        </h4>

                        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                           <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">
                             {resource.uploadedBy[0]}
                           </div>
                           <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate flex-1">
                             {resource.uploadedBy}
                           </span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                           <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
                              <UpvoteButton resourceId={resource.resourceId} size="sm" />
                              <BookmarkButton resourceId={resource.resourceId} size="sm" />
                           </div>
                           <span className="text-[10px] font-bold text-slate-400 uppercase">
                             {resource.year}
                           </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* Empty State / Upload CTA Card */}
                <motion.div layout className="bg-white/30 dark:bg-slate-900/20 border-2 border-dashed border-indigo-200 dark:border-indigo-900 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-indigo-400 transition-all min-h-[300px]" asChild>
                   <Link href="/upload">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Plus className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h4 className="font-black text-indigo-900 dark:text-indigo-300 text-sm mb-1 uppercase tracking-widest">Contribute</h4>
                    <p className="text-slate-500 text-[11px] max-w-[150px] leading-relaxed">Share your knowledge with the vault</p>
                   </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Placeholder */}
            {filteredResources.length > 0 && (
              <div className="mt-16 flex items-center justify-center gap-3">
                <Button variant="outline" size="icon" className="rounded-xl h-10 w-10 border-slate-200 text-slate-400"><X className="w-4 h-4" /></Button>
                <div className="flex items-center gap-2">
                   {[1, 2, 3].map(p => (
                     <button key={p} className={cn("w-10 h-10 rounded-xl font-bold text-sm transition-all", p === 1 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:bg-slate-100")}>{p}</button>
                   ))}
                </div>
                <Button variant="outline" size="icon" className="rounded-xl h-10 w-10 border-slate-200 text-slate-400"><ChevronRight className="w-4 h-4" /></Button>
              </div>
            )}

            {filteredResources.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 bg-white dark:bg-slate-900/50 rounded-[3rem] border border-slate-100 dark:border-slate-800"
              >
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Search className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No archives found</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Adjust your filters or try a different search term to explore the vault.
                </p>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Resource Details Dialog */}
      <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
        <AnimatePresence>
          {selectedResource && (
            <DialogContent className="max-w-2xl bg-white dark:bg-[#0b0c10] border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-0 overflow-hidden">
               <div className="relative h-48 bg-indigo-600 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                  <div className="relative z-10 w-24 h-24 rounded-[2rem] bg-white text-indigo-600 flex items-center justify-center shadow-2xl">
                     {selectedResource && getResourceIcon(selectedResource.type)}
                  </div>
               </div>
               
               <div className="p-10 space-y-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-indigo-50 text-indigo-700 font-black px-3 py-1 rounded-lg uppercase tracking-wider text-[10px]">{selectedResource?.course_code}</Badge>
                      <Badge variant="outline" className="border-emerald-200 text-emerald-700 font-bold rounded-lg px-3 py-1 text-[10px] uppercase tracking-wider">{selectedResource?.category}</Badge>
                    </div>
                    <DialogTitle className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                      {selectedResource?.title}
                    </DialogTitle>
                    <DialogDescription className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                      Archived for {selectedResource?.year} • {selectedResource?.type} format
                    </DialogDescription>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Description</h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                      {selectedResource?.description || "No detailed description provided for this archive. Contributed by the student body for academic reference."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                     <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contributor</span>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedResource?.uploadedBy}</p>
                     </div>
                     <div className="space-y-1 text-right">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">File Type</span>
                        <p className="text-sm font-bold text-slate-900 dark:text-white uppercase">{selectedResource?.type}</p>
                     </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Link href={selectedResource?.url || "#"} target="_blank" className="flex-1">
                      <Button className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-xl shadow-indigo-500/20">
                        <Download className="w-5 h-5 mr-3" /> Download Archive
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={() => setSelectedResource(null)} className="h-14 px-8 rounded-2xl border-slate-200 font-bold">
                       Close
                    </Button>
                  </div>
               </div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  );
}