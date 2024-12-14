import React from 'react';
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
      <Search className="absolute left-3 top-1 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search courses..."
        className="pl-10"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};