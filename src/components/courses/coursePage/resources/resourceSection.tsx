"use client"

import React, { useState, useMemo } from 'react';
import { Course } from "@/types/courses";
import { User } from "@supabase/supabase-js";
import { NoResources } from "./NoResources";
import { useResourceFilters } from "@/hooks/useResourcesFilters";
import { useResources } from "@/hooks/useResources";
import { ResourceFilters } from "./ResourcesFilters";
import ResourceCard from "./resourceCard";
import UploadResourcesButton from "./UploadResourcesButton";
import { uploadResource } from "@/lib/resources";
import { Loader2, Filter, Upload, Image, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";

const RESOURCE_TYPES = [
  { value: "all", label: "All" },
  { value: "lecture", label: "Lectures" },
  { value: "assignment", label: "Assignments" },
  { value: "tutorial", label: "Tutorials" },
  { value: "pyq", label: "Past Year Questions" },
  { value: "lab", label: "Labs" },
  { value: "unclassified", label: "Unclassified" }
];

interface ResourceSectionProps {
  course: Course;
  user?: User | null;
}

export function ResourceSection({ course, user }: ResourceSectionProps) {
  const { isAuthenticated } = useAuth();
  const { filters, setResourceType, setYear, setSortOrder } = useResourceFilters();
  const { resources, isLoading, error } = useResources(course.code);
  const [selectedGroup, setSelectedGroup] = useState<any[] | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredAndSortedResources = resources
    .filter(r =>
      (filters.selectedResourceType === 'all' || r.category === filters.selectedResourceType) &&
      (!filters.selectedYear || r.year === Number(filters.selectedYear))
    )
    .sort((a, b) => {
      const order = filters.sortOrder === "desc" ? -1 : 1;
      return order * ((a.year || 0) - (b.year || 0));
    });

  const groupedResources = useMemo(() => {
    const result: (any | any[])[] = [];
    const seenIds = new Set<string>();

    filteredAndSortedResources.forEach(resource => {
      if (seenIds.has(resource.resourceId)) return;

      if (resource.groupId) {
        const group = filteredAndSortedResources.filter(r => r.groupId === resource.groupId);
        result.push(group);
        group.forEach(r => seenIds.add(r.resourceId));
      } else {
        result.push(resource);
        seenIds.add(resource.resourceId);
      }
    });

    return result;
  }, [filteredAndSortedResources]);

  const availableYears = [...new Set(
    resources
      .filter(r => filters.selectedResourceType === 'all' || r.category === filters.selectedResourceType)
      .map(r => r.year)
      .filter(Boolean)
  )].sort((a, b) => filters.sortOrder === "desc" ? b - a : a - b);

  if (error) {
    return (
      <div className="w-full p-4 text-center bg-red-50 text-red-600 rounded-lg">
        Error loading resources: {error.message}
      </div>
    );
  }

  const MobileFilters = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 m-2">
          <Filter className="w-4 h-4" />
          Apply Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Resources</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <ResourceFilters
            filters={filters}
            onTypeChange={setResourceType}
            onYearChange={setYear}
            onSortChange={setSortOrder}
            availableYears={availableYears}
            resourceTypes={RESOURCE_TYPES}
          />
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col space-y-4">
      {isAuthenticated && (
            <UploadResourcesButton
              onClick={() => uploadResource({
                resourceType: filters.selectedResourceType,
                courseCode: course.code,
                year: filters.selectedYear ?? new Date().getFullYear().toString(),
              })}
              text={`Upload Resources`}
            />
          )}
        <div className="block md:hidden">
          <MobileFilters />
        </div>

        <div className="hidden md:flex flex-col sm:flex-row justify-between gap-4 items-center">
          <ResourceFilters
            filters={filters}
            onTypeChange={setResourceType}
            onYearChange={setYear}
            onSortChange={setSortOrder}
            availableYears={availableYears}
            resourceTypes={RESOURCE_TYPES}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="w-full flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {groupedResources.length > 0 ? (
              groupedResources.map((resourceOrGroup, index) => {
                const isGroup = Array.isArray(resourceOrGroup);
                const resource = isGroup ? resourceOrGroup[0] : resourceOrGroup;

                return (
                  <div key={resource.resourceId} className="relative">
                    {isGroup && (
                      <Badge
                        className="absolute -top-2 -right-2 z-10 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-sm"
                      >
                        {resourceOrGroup.length} Photos
                      </Badge>
                    )}
                    <div
                      onClick={() => isGroup ? setSelectedGroup(resourceOrGroup) : null}
                      className={isGroup ? "cursor-pointer" : ""}
                    >
                      <ResourceCard
                        resource={resource}
                        onOpen={() => isGroup && setSelectedGroup(resourceOrGroup)}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full">
                <NoResources
                  courseCode={course.code}
                  user={user}
                  selectedResourceType={filters.selectedResourceType}
                  resourceTypes={RESOURCE_TYPES}
                  year={filters.selectedYear ?? new Date().getFullYear().toString()}
                />
              </div>
            )}
          </div>

          <Dialog open={!!selectedGroup} onOpenChange={() => setSelectedGroup(null)}>
            {selectedGroup && (
              <DialogContent className="max-w-lg">
                <DialogHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Image className="h-6 w-6 text-emerald-500" />
                    <Badge variant="outline" className={getCategoryColor(selectedGroup[0].category)}>
                      {selectedGroup[0].category}
                    </Badge>
                  </div>
                  <DialogTitle className="text-xl font-semibold leading-tight">
                    {selectedGroup[0].title}
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedGroup[0].course_code} • {selectedGroup[0].year}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Photos
                    </h4>
                    <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1">
                      {selectedGroup.map((r, idx) => (
                        <div
                          key={r.resourceId}
                          className="aspect-square rounded-md overflow-hidden border border-gray-200 dark:border-gray-700"
                        >
                          <img
                            src={r.url}
                            alt={`${selectedGroup[0].title} ${idx + 1}`}
                            className="w-full h-full object-cover cursor-zoom-in"
                            onClick={() => setSelectedImage(r.url)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end items-center pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedGroup(null)}
                      className="border-2"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            )}
          </Dialog>

          <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            {selectedImage && (
              <DialogContent className="max-w-screen-xl p-0 bg-black border-none overflow-hidden">
                <div className="relative h-[90vh] w-full flex items-center justify-center">
                  <img
                    src={selectedImage}
                    alt="Zoomed view"
                    className="max-w-full max-h-full object-contain"
                  />
                  <Button
                    variant="ghost"
                    className="absolute top-4 right-4 text-white hover:bg-white/20"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </DialogContent>
            )}
          </Dialog>
        </>
      )}
    </div>
  );
}

// Helper function for colors (since it was used in the main page and needs to be here too)
function getCategoryColor(category: string) {
  const colorMap = {
    'lecture': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'tutorial': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'assignment': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'pyq': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'lab': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    'unclassified': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  };
  return colorMap[category as keyof typeof colorMap] || colorMap.unclassified;
}
