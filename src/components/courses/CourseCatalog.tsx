import React from 'react';
import { useCourses } from "@/hooks/useCourses";
import { Skeleton } from "../ui/skeleton";
import { Course } from "@/types/courses";
import CourseCard from "./CourseCard";
import { Search } from "lucide-react";

interface CourseCatalogProps {
    courses: Course[];
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ courses }) => {
    const { isLoading } = useCourses();

    if (isLoading) {
        return (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {Array.from({ length: 8 }).map((_, idx) => (
                    <div key={idx} className="w-full space-y-3">
                        <Skeleton className="h-48 w-full rounded-xl" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="col-span-full flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-xl p-8">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700">
                    No courses found
                </h3>
                <p className="text-gray-500 mt-2 text-center max-w-md">
                    We couldn't find any courses matching your current filters. 
                    Try adjusting your search criteria or clearing filters.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <p className="text-gray-600">
                    Showing <span className="font-medium">{courses.length}</span> courses
                </p>
                <p className="text-sm text-gray-500">
                    Page 1 of 1
                </p>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 auto-rows-fr">
                {courses.map((course) => (
                    <div key={course.id} className="h-full">
                        <CourseCard course={course} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseCatalog;