"use client"

import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  Search,
  Linkedin,
  Filter,
  Loader2,
  Award,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from 'next/link';
import { ProfileModel } from '@/models/profile';
import { useContributors } from '@/hooks/useContributors';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ContributorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<ProfileModel['role'] | ''>("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const { contributors, isLoading } = useContributors();

  const filteredContributors = contributors.filter(contributor => 
    (contributor.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     contributor.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedRole ? contributor.role === selectedRole : true) &&
    (selectedDepartment ? contributor.department === selectedDepartment : true)
  );

  const departments = [...new Set(contributors.map(c => c.department).filter(Boolean))];
  const roles: ProfileModel['role'][] = ['student', 'alumni', 'external'];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-[#0b0c10] pb-24">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 shadow-sm"
          >
            <Award className="h-4 w-4 text-indigo-600 dark:text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700 dark:text-indigo-300">
              Intellectual Merit
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
            Hall of <span className="text-indigo-600 dark:text-emerald-400">Scholars</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Honoring the architects of our collective academic repository. Every contribution fuels the next generation of excellence.
          </p>
        </div>

        {/* Dynamic Filters Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-500/5 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative w-full lg:max-w-md group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <Input 
                placeholder="Search scholars..." 
                className="h-14 pl-14 pr-6 bg-slate-50 dark:bg-slate-800 border-transparent rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all dark:placeholder-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
               {departments.map((dept) => (
                 <button
                  key={dept}
                  onClick={() => setSelectedDepartment(selectedDepartment === dept ? "" : dept ?? "")}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2",
                    selectedDepartment === dept 
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                      : "bg-transparent border-slate-100 dark:border-slate-800 text-slate-400 hover:border-indigo-200"
                  )}
                 >
                   {dept}
                 </button>
               ))}
            </div>

            <div className="lg:ml-auto flex items-center gap-2">
              {roles.map(role => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(selectedRole === role ? "" : role)}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all border-2 capitalize text-xs font-black",
                    selectedRole === role 
                      ? "bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900" 
                      : "bg-transparent border-slate-100 dark:border-slate-800 text-slate-400"
                  )}
                >
                  {role[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contributors Grid */}
        {isLoading ? (
          <div className="flex justify-center py-32">
             <div className="relative">
                <Loader2 className="w-16 h-16 animate-spin text-indigo-600 opacity-20" />
                <Sparkles className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" />
             </div>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContributors.map((contributor, idx) => (
              <motion.div
                key={contributor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group overflow-hidden relative">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/10 transition-colors" />

                  <CardHeader className="p-0 mb-8 flex flex-row items-center gap-5 space-y-0">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-[1.75rem] overflow-hidden border-2 border-slate-50 dark:border-slate-800 shadow-md">
                        <img 
                          src={contributor.profile_image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${contributor.name}`} 
                          alt={contributor.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-900 border-4 border-white dark:border-slate-900 flex items-center justify-center">
                         <Award className="h-3 w-3 text-emerald-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{contributor.name}</h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-emerald-400">{contributor.role}</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0 space-y-6">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                       <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 block mb-1">Academic Context</span>
                       <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                         {contributor.department} Scholar • {contributor.batch ? `Batch of ${contributor.batch}` : 'Global Contributor'}
                       </span>
                    </div>

                    {contributor.bio && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                        &quot;{contributor.bio}&quot;
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                           <FileText className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
                           {contributor.contributionCount} Assets
                        </span>
                      </div>
                      
                      {contributor.linkedin_url && (
                        <a 
                          href={contributor.linkedin_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all shadow-sm"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && filteredContributors.length === 0 && (
          <div className="text-center py-32 space-y-6">
            <div className="w-24 h-24 rounded-[2rem] bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto mb-8 border border-dashed border-slate-300 dark:border-slate-800">
              <Search className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">No scholars identified.</h3>
            <p className="text-slate-500 font-medium max-w-sm mx-auto">
              We couldn&apos;t find any contributors matching your specific search parameters.
            </p>
            <Button 
              variant="outline" 
              onClick={() => { setSearchTerm(""); setSelectedRole(""); setSelectedDepartment(""); }}
              className="rounded-xl font-black uppercase tracking-widest text-xs h-12 px-8"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}