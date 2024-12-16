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
    <div className="relative mb-6">
      <Search 
        className={cn(
          "absolute left-3 top-1 h-4 w-4 text-muted-foreground",
          "dark:text-gray-400"
        )} 
      />
      <Input
        placeholder="Search courses..."
        className={cn(
          "pl-10",
          "dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder-gray-500"
        )}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};