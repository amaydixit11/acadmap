'use client';

import { useState, useEffect } from 'react';
import { parseCSV } from '@/lib/time-table';
import { TimeTableParsedCourse } from '@/types/time-table';
import Timetable from '@/components/time-table/timetable';
import { Loader2 } from 'lucide-react';

interface SharedTimetableViewProps {
  courseCodes: string[];
}

export default function SharedTimetableView({ courseCodes }: SharedTimetableViewProps) {
  const [selectedCourses, setSelectedCourses] = useState<TimeTableParsedCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetch('/file.csv');
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        const csvText = await response.text();
        const allCourses = await parseCSV(csvText);
        
        // Filter to only the courses in this shared timetable
        const matchedCourses = allCourses.filter(course => 
          courseCodes.includes(course.code)
        );
        
        setSelectedCourses(matchedCourses);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, [courseCodes]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (selectedCourses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Could not load the timetable courses.</p>
        <p className="text-sm mt-2">The course data may have changed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-x-auto">
      <Timetable selectedCourses={selectedCourses} isCompact={true} />
    </div>
  );
}
