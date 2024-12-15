import React from 'react'
import { ClearFilters } from './ClearFiltersButton'
import { FilterContent } from './CourseFiltersContent'
import { Filter } from 'lucide-react'

const CourseFiltersDesktop = () => {
  return (
    <div className="hidden md:block">
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 sticky top-20">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filters
            </h2>
        </div>
        <div className="border rounded-lg p-4">
            <FilterContent />
            <ClearFilters />
        </div>
        </div>
    </div>
  )
}

export default CourseFiltersDesktop
