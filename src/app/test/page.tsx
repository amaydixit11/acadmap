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
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Link from 'next/link';
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
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black transition-colors duration-300">
      <motion.div 
        className="container mx-auto px-4 py-8 md:py-16"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          variants={slideUp}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge 
              variant="secondary" 
              className="inline-flex items-center px-6 py-2 mb-6 text-base
              bg-gradient-to-r from-violet-500 to-indigo-500 text-white
              shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30
              transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Explore Courses
            </Badge>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black 
            bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600
            dark:from-violet-400 dark:via-indigo-400 dark:to-purple-400 mb-8
            tracking-tight leading-tight"
          >
            Course Directory
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 
            max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Discover and explore our comprehensive collection of courses
            designed to enhance your academic journey.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          variants={slideUp}
          transition={{ delay: 0.4 }}
          className="space-y-8 mb-16"
        >
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Search courses by title or code..." 
                className="pl-12 h-14 text-lg rounded-2xl shadow-lg dark:shadow-gray-800/20
                border-2 border-gray-100 dark:border-gray-800
                focus:border-violet-500 dark:focus:border-violet-400
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
                    className="h-14 w-14 rounded-2xl border-2
                    hover:bg-violet-50 dark:hover:bg-gray-800
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
              className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto"
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
                      'bg-gradient-to-r from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/20' : 
                      'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
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
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
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
                className="cursor-pointer"
              >
                <Card className="h-full border-2 dark:border-gray-800
                  bg-white dark:bg-gray-900
                  shadow-xl hover:shadow-2xl dark:shadow-gray-800/30
                  transition-all duration-500 rounded-xl overflow-hidden">
                  <CardHeader className="space-y-3 bg-gradient-to-br from-gray-50 to-white
                    dark:from-gray-800 dark:to-gray-900 p-6">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" 
                        className="bg-violet-50 dark:bg-violet-900/30 
                        text-violet-700 dark:text-violet-300 px-4 py-1.5">
                        {course.department}
                      </Badge>
                      <Badge variant="outline" 
                        className="bg-indigo-50 dark:bg-indigo-900/30
                        text-indigo-700 dark:text-indigo-300">
                        {course.credits} Credits
                      </Badge>
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">
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
                        <Clock className="h-5 w-5 text-violet-500 dark:text-violet-400" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {course.schedule.lectures}
                        </span>
                      </div>
                      {course.prerequisites && (
                        <div className="flex items-center gap-3 text-base">
                          <ArrowUpRight className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
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
        <AnimatePresence>
          {selectedCourse && (
            <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
              <DialogContent className="max-w-3xl bg-white dark:bg-gray-900
                border-2 dark:border-gray-800 rounded-xl">
                <DialogHeader className="space-y-4">
                  <DialogTitle className="text-3xl font-bold">
                    {selectedCourse.title}
                  </DialogTitle>
                  <div className="flex gap-4">
                    <Badge variant="outline" className="px-4 py-1.5">
                      {selectedCourse.code}
                    </Badge>
                    <Badge variant="outline" className="px-4 py-1.5">
                      {selectedCourse.credits} Credits
                    </Badge>
                  </div>
                </DialogHeader>

                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold flex items-center gap-2">
                        <Clock className="h-5 w-5 text-violet-500 dark:text-violet-400" />
                        Schedule
                      </h4>
                      <div className="space-y-3 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
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
                      <h4 className="text-xl font-semibold flex items-center gap-2">
                        <ArrowUpRight className="h-5 w-5 text-violet-500 dark:text-violet-400" />
                        Prerequisites
                      </h4>
                      <p className="text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                        {selectedCourse.prerequisites}
                      </p>
                    </div>
                  )}
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-violet-500 dark:text-violet-400" />
                        Syllabus
                      </h4>
                      <ul className="space-y-3 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                        {selectedCourse.syllabus.map((topic, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="h-2 w-2 rounded-full bg-violet-500 dark:bg-violet-400" />
                            <span className="text-gray-700 dark:text-gray-200">{topic}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedCourse(null)}
                      className="px-8 py-6 text-lg rounded-xl"
                    >
                      Close
                    </Button>
                  </div>
                </motion.div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>

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
                    className="bg-gradient-to-br from-gray-100 to-gray-50 
                    dark:from-gray-800 dark:to-gray-900 
                    rounded-full p-8 inline-block mb-6
                    shadow-xl dark:shadow-gray-800/30"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Search className="h-12 w-12 text-gray-400" />
                  </motion.div>
                  <motion.h3 
                    className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4"
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
                      className="bg-gradient-to-r from-violet-500 to-indigo-500
                      text-white px-8 py-6 text-lg rounded-xl
                      shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30
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