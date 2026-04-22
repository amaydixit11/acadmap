import React from 'react';
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CourseSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CourseSearch: React.FC<CourseSearchProps> = ({ 
  searchQuery, 
  onSearchChange 
}) => {
  return (
    <div className="relative mb-8 group max-w-xl mx-auto md:mx-0">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500" />
        <Input
          placeholder="Search by code, title, or department..."
          className={cn(
            "h-14 pl-14 pr-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl text-base shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all",
            "dark:text-white dark:placeholder-slate-500"
          )}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};