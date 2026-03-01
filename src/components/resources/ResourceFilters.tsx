'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, X, Calendar, FileType, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ResourceFilters {
  year?: number;
  category?: string;
  type?: string;
}

interface ResourceFiltersProps {
  filters: ResourceFilters;
  onFiltersChange: (filters: ResourceFilters) => void;
  availableYears?: number[];
  availableCategories?: string[];
  availableTypes?: string[];
  className?: string;
}

const defaultYears = [2024, 2023, 2022, 2021, 2020];
const defaultCategories = ['PYQ', 'Notes', 'Assignments', 'Books', 'Other'];
const defaultTypes = ['pdf', 'doc', 'ppt', 'image', 'other'];

export function ResourceFiltersBar({
  filters,
  onFiltersChange,
  availableYears = defaultYears,
  availableCategories = defaultCategories,
  availableTypes = defaultTypes,
  className,
}: ResourceFiltersProps) {
  const hasActiveFilters = filters.year || filters.category || filters.type;

  const clearFilters = () => {
    onFiltersChange({});
  };

  const updateFilter = (key: keyof ResourceFilters, value: string | undefined) => {
    if (value === 'all') {
      const newFilters = { ...filters };
      delete newFilters[key];
      onFiltersChange(newFilters);
    } else {
      onFiltersChange({
        ...filters,
        [key]: key === 'year' ? parseInt(value || '0') : value,
      });
    }
  };

  return (
    <div className={cn(
      "flex flex-wrap items-center gap-3 p-4 rounded-lg",
      "bg-white dark:bg-gray-900",
      "border border-gray-200 dark:border-gray-700",
      "shadow-sm",
      className
    )}>
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <Filter className="w-4 h-4" />
        <span>Filters:</span>
      </div>

      {/* Year Filter */}
      <Select
        value={filters.year?.toString() || 'all'}
        onValueChange={(value) => updateFilter('year', value)}
      >
        <SelectTrigger className="w-[120px]">
          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Years</SelectItem>
          {availableYears.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Category Filter */}
      <Select
        value={filters.category || 'all'}
        onValueChange={(value) => updateFilter('category', value)}
      >
        <SelectTrigger className="w-[140px]">
          <FolderOpen className="w-4 h-4 mr-2 text-gray-500" />
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {availableCategories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Type Filter */}
      <Select
        value={filters.type || 'all'}
        onValueChange={(value) => updateFilter('type', value)}
      >
        <SelectTrigger className="w-[120px]">
          <FileType className="w-4 h-4 mr-2 text-gray-500" />
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {availableTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
