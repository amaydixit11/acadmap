"use client"

import React, { useState, useMemo } from 'react';
import { 
  Book, 
  Search, 
  Filter, 
  BookOpen,
  Clock,
  FileText,
  Calendar,
  GraduationCap,
  X,
  ArrowUpRight,
  Sparkles,
  School
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useCourses } from '@/hooks/useCourses';
import { Course, Department } from '@/types/courses';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { courses } = useCourses();

  const departments = Object.values(Department).sort();

  const filteredCourses = useMemo(() =>
    courses.filter(course =>
      (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       course.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedDepartment ? course.department === selectedDepartment : true)
    ),
    [courses, searchTerm, selectedDepartment]
  );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">
      <motion.div 
        className="container mx-auto px-4 py-8 md:py-16 max-w-7xl"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16 relative"
          variants={slideUp}
        >
          <motion.div
            className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-100/20 dark:from-violet-900/20 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex justify-center"
          >
            <Badge 
              variant="secondary" 
              className="px-6 py-2 mb-6 text-base
              bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-500 dark:to-indigo-500
              text-white font-semibold
              shadow-lg shadow-violet-500/20 dark:shadow-violet-500/10
              hover:shadow-violet-500/30 dark:hover:shadow-violet-500/20
              transition-all duration-300 transform hover:scale-105"
            >
              <School className="mr-2 h-5 w-5" />
              Course Catalog
            </Badge>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black 
            bg-clip-text text-transparent bg-gradient-to-r from-violet-700 via-indigo-700 to-purple-700
            dark:from-violet-300 dark:via-indigo-300 dark:to-purple-300
            mb-6 tracking-tight leading-none"
          >
            Discover Your Path
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 
            max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Explore our diverse range of courses designed to ignite your curiosity
            and fuel your academic journey.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          variants={slideUp}
          transition={{ delay: 0.4 }}
          className="space-y-8 mb-16"
        >
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-grow group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 
                h-5 w-5 transition-colors group-hover:text-violet-500 dark:group-hover:text-violet-400" />
              <Input 
                placeholder="Search courses by title or code..." 
                className="pl-12 h-14 text-lg rounded-2xl
                bg-white dark:bg-gray-900
                border-2 border-gray-200 dark:border-gray-800
                shadow-lg shadow-violet-500/5 dark:shadow-violet-500/5
                hover:border-violet-500 dark:hover:border-violet-500
                focus:border-violet-500 dark:focus:border-violet-500
                focus:ring-2 focus:ring-violet-500/20 dark:focus:ring-violet-500/20
                transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={clearFilters}
                    className="h-14 w-14 rounded-2xl
                    border-2 border-gray-200 dark:border-gray-800
                    hover:bg-violet-50 dark:hover:bg-violet-950
                    hover:border-violet-500 dark:hover:border-violet-500
                    transition-all duration-300"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear Filters</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Department Filters */}
          <LayoutGroup>
            <motion.div 
              layout
              className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto px-4"
            >
              {departments.map(dept => (
                <motion.div
                  key={dept}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge 
                    variant={selectedDepartment === dept ? "default" : "secondary"}
                    onClick={() => setSelectedDepartment(selectedDepartment === dept ? "" : dept)}
                    className={`cursor-pointer px-6 py-2 text-base font-medium
                    transition-all duration-300 transform hover:scale-105
                    ${selectedDepartment === dept ? 
                      'bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-500 dark:to-indigo-500 shadow-lg shadow-violet-500/20' : 
                      'hover:bg-violet-50 dark:hover:bg-violet-950'}`}
                  >
                    {dept}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </LayoutGroup>
        </motion.div>

        {/* Courses Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            variants={fadeIn}
            transition={{ delay: 0.6 }}
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedCourse(course)}
                className="cursor-pointer group"
              >
                <Card className="h-full overflow-hidden rounded-2xl
                  bg-white dark:bg-gray-900
                  border-2 border-gray-100 dark:border-gray-800
                  group-hover:border-violet-500 dark:group-hover:border-violet-500
                  shadow-xl hover:shadow-2xl dark:shadow-gray-950/50
                  transition-all duration-500">
                  <CardHeader className="space-y-3 p-6
                    bg-gradient-to-br from-gray-50/50 to-transparent
                    dark:from-gray-800/50 dark:to-transparent">
                    <div className="flex items-start justify-between gap-4">
                      <Badge variant="outline" 
                        className="bg-violet-50 dark:bg-violet-950
                        text-violet-700 dark:text-violet-300 
                        border-violet-200 dark:border-violet-800
                        px-4 py-1.5">
                        {course.department}
                      </Badge>
                      <Badge variant="outline" 
                        className="bg-indigo-50 dark:bg-indigo-950
                        text-indigo-700 dark:text-indigo-300
                        border-indigo-200 dark:border-indigo-800">
                        {course.credits} Credits
                      </Badge>
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100
                        group-hover:text-violet-700 dark:group-hover:text-violet-300
                        transition-colors duration-300">
                        {course.title}
                      </CardTitle>
                      <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
                        {course.code}
                      </p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 p-6">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-3 text-base">
                        <Clock className="h-5 w-5 text-violet-500 dark:text-violet-400
                          group-hover:text-violet-600 dark:group-hover:text-violet-300
                          transition-colors duration-300" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {course.schedule.lectures}
                        </span>
                      </div>
                      {course.prerequisites && (
                        <div className="flex items-center gap-3 text-base">
                          <ArrowUpRight className="h-5 w-5 text-indigo-500 dark:text-indigo-400
                            group-hover:text-indigo-600 dark:group-hover:text-indigo-300
                            transition-colors duration-300" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {course.prerequisites}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Course Details Dialog */}
        <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
          <DialogContent className="max-w-3xl
            bg-white dark:bg-gray-900
            border-2 border-gray-100 dark:border-gray-800
            rounded-2xl shadow-2xl">
            <DialogHeader className="space-y-4">
              <DialogTitle className="text-3xl font-bold
                bg-clip-text text-transparent bg-gradient-to-r
                from-violet-700 to-indigo-700
                dark:from-violet-300 dark:to-indigo-300">
                {selectedCourse?.title}
              </DialogTitle>
              <div className="flex flex-wrap gap-4">
                <Badge variant="outline" className="px-4 py-1.5
                  border-violet-200 dark:border-violet-800
                  bg-violet-50 dark:bg-violet-950
                  text-violet-700 dark:text-violet-300">
                  {selectedCourse?.code}
                </Badge>
                <Badge variant="outline" className="px-4 py-1.5
                  border-indigo-200 dark:border-indigo-800
                  bg-indigo-50 dark:bg-indigo-950
                  text-indigo-700 dark:text-indigo-300">
                  {selectedCourse?.credits} Credits
                </Badge>
              </div>
            </DialogHeader>

            {selectedCourse && (
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold flex items-center gap-2
                      text-gray-900 dark:text-gray-100">
                      <Clock className="h-5 w-5 text-violet-500 dark:text-violet-400" />
                      Schedule
                    </h4>
                    <div className="space-y-3 rounded-xl
                      bg-gray-50 dark:bg-gray-800/50
                      border-2 border-gray-100 dark:border-gray-800
                      p-6">
                      {Object.entries(selectedCourse.schedule).map(([type, time]) => (
                        <div key={type} className="flex items-center gap-3">
                          <div className="w-24 text-gray-500 dark:text-gray-400 capitalize">
                            {type}:
                          </div>
                          <div className="text-gray-700 dark:text-gray-200">
                            {time}
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedCourse.prerequisites && (
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold flex items-center gap-2
                          text-gray-900 dark:text-gray-100">
                          <ArrowUpRight className="h-5 w-5 text-violet-500 dark:text-violet-400" />
                          Prerequisites
                        </h4>
                        <p className="text-gray-700 dark:text-gray-200 
                          bg-gray-50 dark:bg-gray-800/50
                          border-2 border-gray-100 dark:border-gray-800
                          p-6 rounded-xl">
                          {selectedCourse.prerequisites}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold flex items-center gap-2
                      text-gray-900 dark:text-gray-100">
                      <BookOpen className="h-5 w-5 text-violet-500 dark:text-violet-400" />
                      Syllabus
                    </h4>
                    <ul className="space-y-4 
                      bg-gray-50 dark:bg-gray-800/50
                      border-2 border-gray-100 dark:border-gray-800
                      p-6 rounded-xl">
                      {selectedCourse.syllabus.map((topic, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="h-2 w-2 rounded-full mt-2
                            bg-gradient-to-r from-violet-500 to-indigo-500
                            dark:from-violet-400 dark:to-indigo-400" />
                          <span className="text-gray-700 dark:text-gray-200">{topic}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedCourse(null)}
                    className="px-8 py-6 text-lg rounded-xl
                    border-2 border-gray-200 dark:border-gray-700
                    hover:bg-violet-50 dark:hover:bg-violet-950
                    hover:border-violet-500 dark:hover:border-violet-500
                    transition-all duration-300"
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>

        {/* Empty State */}
        <AnimatePresence>
          {filteredCourses.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-24"
            >
              <motion.div 
                className="inline-flex items-center justify-center
                  w-24 h-24 rounded-full mb-6
                  bg-gradient-to-br from-violet-100 to-indigo-100
                  dark:from-violet-900/30 dark:to-indigo-900/30
                  shadow-xl dark:shadow-violet-500/10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Search className="h-12 w-12 text-violet-500 dark:text-violet-400" />
              </motion.div>
              <motion.h3 
                className="text-3xl font-bold 
                  text-gray-900 dark:text-gray-100 mb-4"
                variants={slideUp}
              >
                No courses found
              </motion.h3>
              <motion.p 
                className="text-lg text-gray-500 dark:text-gray-400
                  max-w-md mx-auto"
                variants={slideUp}
              >
                Try adjusting your search terms or clearing the department filter
              </motion.p>
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  onClick={clearFilters}
                  className="px-8 py-6 text-lg rounded-xl
                    bg-gradient-to-r from-violet-600 to-indigo-600
                    dark:from-violet-500 dark:to-indigo-500
                    text-white font-medium
                    shadow-lg shadow-violet-500/20 dark:shadow-violet-500/10
                    hover:shadow-violet-500/30 dark:hover:shadow-violet-500/20
                    transition-all duration-300 transform hover:scale-105"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer 
          className="mt-24 text-center text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm">
            © {new Date().getFullYear()} Course Directory. All rights reserved.
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}