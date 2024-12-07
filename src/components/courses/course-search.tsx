"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function CourseSearch() {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search courses..."
        className="pl-10"
      />
    </div>
  );
}