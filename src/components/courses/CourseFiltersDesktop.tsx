import React from 'react'
import { cn } from "@/lib/utils"
import { ClearFilters } from './ClearFiltersButton'
import { FilterContent } from './CourseFiltersContent'
import { Filter } from 'lucide-react'

const CourseFiltersDesktop = () => {
  return (
    <div className="hidden md:block">
        <div 
          className={cn(
            "bg-white shadow-md rounded-xl p-6",
            "border border-gray-100",
            "dark:bg-black dark:border-gray-800",
            "sticky top-20"
          )}
        >
        <div className="flex items-center justify-between mb-4">
            <h2 
              className={cn(
                "text-xl font-bold flex items-center gap-2",
                "text-gray-800",
                "dark:text-white"
              )}
            >
            <Filter 
              className={cn(
                "w-5 h-5 text-primary",
                "dark:text-primary"
              )} 
            />
            Filters
            </h2>
        </div>
        <div 
          className={cn(
            "border rounded-lg p-4",
            "border-gray-200",
            "dark:border-gray-800"
          )}
        >
            <FilterContent />
            <ClearFilters />
        </div>
        </div>
    </div>
  )
}

export default CourseFiltersDesktop