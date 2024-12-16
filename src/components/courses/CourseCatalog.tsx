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
                        <Skeleton className="h-48 w-full rounded-xl bg-neutral-900" />
                        <Skeleton className="h-4 w-3/4 bg-neutral-800" />
                        <Skeleton className="h-4 w-1/2 bg-neutral-800" />
                    </div>
                ))}
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="col-span-full flex flex-col items-center justify-center min-h-[400px] p-8">
                <div className="bg-neutral-900 p-4 rounded-full mb-4">
                    <Search className="h-8 w-8 text-neutral-500" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-300">
                    No courses found
                </h3>
                <p className="text-neutral-500 mt-2 text-center max-w-md">
                    We couldn't find any courses matching your current filters. 
                    Try adjusting your search criteria or clearing filters.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6">
            <div className="flex items-center justify-between">
                <p className="text-neutral-800">
                    Showing <span className="font-medium text-neutral-800">{courses.length}</span> courses
                </p>
                <p className="text-sm text-neutral-600">
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