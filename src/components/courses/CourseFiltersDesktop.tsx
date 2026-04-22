import React from 'react'
import { cn } from "@/lib/utils"
import { ClearFilters } from './ClearFiltersButton'
import { FilterContent } from './CourseFiltersContent'
import { Filter } from 'lucide-react'

const CourseFiltersDesktop = () => {
  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-24 space-y-8">
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-foreground">
              Departments
            </h3>
            <ClearFilters />
          </div>
          
          <FilterContent section="department" />
          
          <div className="my-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-6">
              Level
            </h3>
            <FilterContent section="level" />
          </div>
        </div>

        <div className="bg-muted rounded-xl p-8 border border-border">
          <h4 className="text-sm font-bold text-foreground mb-2">Missing a course?</h4>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            Request a new course repository from the academic administrators.
          </p>
          <button className="text-xs font-black uppercase tracking-wider text-primary hover:underline">
            Request Repository →
          </button>
        </div>
      </div>
    </aside>
  )
}

export default CourseFiltersDesktop