// components/courses/CourseResourceFilter.tsx
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourseResource } from '@/types/courses';

interface CourseResourceFilterProps {
  resources: CourseResource[];
  onFilterChange: (filteredResources: CourseResource[]) => void;
}

export function CourseResourceFilter({ 
  resources, 
  onFilterChange 
}: CourseResourceFilterProps) {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('lectures');

  const availableYears = Array.from(
    new Set(resources.map(resource => resource.year?.toString() || 'N/A'))
  ).sort((a, b) => b.localeCompare(a));

  const filterResources = (year: string | null, type: string) => {
    const filtered = resources.filter(resource => 
      resource.type === type && 
      (year === null || resource.year?.toString() === year)
    );
    onFilterChange(filtered);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Tabs 
          value={selectedYear || 'all'} 
          onValueChange={(value) => {
            const year = value === 'all' ? null : value;
            setSelectedYear(year);
            filterResources(year, selectedType);
          }}
        >
          <TabsList className="bg-gray-50/50 p-1">
            <TabsTrigger value="all">All Years</TabsTrigger>
            {availableYears.map(year => (
              <TabsTrigger key={year} value={year}>
                {year}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}