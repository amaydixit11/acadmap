"use client";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilters } from "@/context/FiltersContext";
import { Department } from "@/types/courses";

const levels = [
    "100 Level",
    "200 Level", 
    "300 Level", 
    "400 Level", 
    "500 Level", 
    "600 Level"
  ];

interface FilterContentProps {
  section?: "department" | "level";
}

export const FilterContent = ({ section }: FilterContentProps) => {
  const {filters, dispatch} = useFilters();
  
  const handleCheckboxChange = (category: string, item: string) => {
    switch (category) {
      case "department":
        dispatch({
          type: 'UPDATE_FILTER', 
          key: "departments",
          value: filters.departments.includes(item as keyof typeof Department)
          ? filters.departments.filter(d => d !== item)
          : [...filters.departments, item as keyof typeof Department]})
        break;
      case "level":
        dispatch({ 
          type: 'UPDATE_FILTER', 
          key: "levels",
          value: filters.levels.includes(item)
          ? filters.levels.filter(l => l !== item)
          : [...filters.levels, item]})
        break;
    }
  };

  if (section === "department") {
    return (
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {Object.entries(Department).map(([short, full]) => (
          <label key={short} className="flex items-start gap-3 group cursor-pointer">
            <Checkbox
              id={short}
              checked={filters.departments.includes(short as keyof typeof Department)}
              onCheckedChange={() => handleCheckboxChange("department", short)}
              className="mt-1 border-slate-300 dark:border-slate-700 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">
                {short}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-500 transition-colors">
                {full}
              </span>
            </div>
          </label>
        ))}
      </div>
    );
  }

  if (section === "level") {
    return (
      <div className="grid grid-cols-2 gap-2">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => handleCheckboxChange("level", level)}
            className={cn(
              "px-3 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl border transition-all",
              filters.levels.includes(level)
                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-indigo-300 dark:hover:border-indigo-700"
            )}
          >
            {level}
          </button>
        ))}
      </div>
    );
  }

  // Fallback for mobile/other uses if any
  return null;
};