'use client';

import { useMemo } from 'react';
import { TimeTableParsedCourse } from '@/types/time-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Clock, BookOpen, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkloadVisualizationProps {
  courses: TimeTableParsedCourse[];
  className?: string;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

export function WorkloadVisualization({ courses, className }: WorkloadVisualizationProps) {
  // Calculate hours per day based on slots
  const hoursPerDay = useMemo(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const dayHours: Record<string, number> = {};
    
    days.forEach(day => {
      dayHours[day] = 0;
    });

    // Simple estimation: count slots per course
    courses.forEach(course => {
      // Count lecture slots (each letter = ~1 hour per occurrence in the week)
      if (course.lectureSlot) {
        const lectureSlots = course.lectureSlot.split(/[,\s]+/).filter(Boolean);
        lectureSlots.forEach(() => {
          // Distribute evenly across weekdays as estimation
          days.forEach(day => {
            dayHours[day] += lectureSlots.length / 5;
          });
        });
      }
      
      // Tutorial slots
      if (course.tutorialSlot) {
        const tutSlots = course.tutorialSlot.split(/[,\s]+/).filter(Boolean);
        days.forEach(day => {
          dayHours[day] += tutSlots.length / 5;
        });
      }
      
      // Lab slots (typically longer)
      if (course.labSlot) {
        const labSlots = course.labSlot.split(/[,\s]+/).filter(Boolean);
        days.forEach(day => {
          dayHours[day] += (labSlots.length * 2) / 5;
        });
      }
    });

    return days.map(day => ({
      day: day.slice(0, 3),
      hours: Math.round(dayHours[day] * 10) / 10,
    }));
  }, [courses]);

  // Calculate credit distribution
  const creditDistribution = useMemo(() => {
    const credits: Record<string, number> = {};
    
    courses.forEach(course => {
      const type = course.lectureSlot ? 'Lecture' :
                   course.labSlot ? 'Lab' : 'Tutorial';
      credits[type] = (credits[type] || 0) + (Number(course.credits) || 3);
    });

    return Object.entries(credits).map(([name, value]) => ({
      name,
      value,
    }));
  }, [courses]);

  // Calculate total hours
  const totalHours = useMemo(() => 
    hoursPerDay.reduce((sum, day) => sum + day.hours, 0),
    [hoursPerDay]
  );

  // Calculate busiest day
  const busiestDay = useMemo(() => {
    const max = hoursPerDay.reduce((prev, curr) => 
      prev.hours > curr.hours ? prev : curr
    );
    return max;
  }, [hoursPerDay]);

  // Check for potential issues
  const warnings = useMemo(() => {
    const issues: string[] = [];
    
    if (totalHours > 25) {
      issues.push('Heavy workload detected (>25 hrs/week)');
    }
    
    if (busiestDay.hours > 6) {
      issues.push(`${busiestDay.day} is very busy (${busiestDay.hours}+ hrs)`);
    }

    // Check for back-to-back classes (simplified)
    if (courses.length > 5) {
      issues.push('Many courses may cause scheduling conflicts');
    }

    return issues;
  }, [totalHours, busiestDay, courses]);

  if (courses.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center justify-center py-12 text-gray-500">
          <BookOpen className="w-10 h-10 mb-3 opacity-50" />
          <p>Add courses to see workload analysis</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          Workload Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalHours}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Hours/Week</p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{courses.length}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Courses</p>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{busiestDay.day}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Busiest Day</p>
          </div>
        </div>

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium mb-2">
              <AlertTriangle className="w-4 h-4" />
              Heads Up
            </div>
            <ul className="text-sm text-amber-600 dark:text-amber-300 space-y-1">
              {warnings.map((warning, i) => (
                <li key={i}>• {warning}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Hours per Day Chart */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
            Hours per Day
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hoursPerDay}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: number) => [`${value} hrs`, 'Hours']}
                  contentStyle={{ 
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                />
                <Bar 
                  dataKey="hours" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Credit Distribution Pie Chart */}
        {creditDistribution.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
              Course Type Distribution
            </h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={creditDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {creditDistribution.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
