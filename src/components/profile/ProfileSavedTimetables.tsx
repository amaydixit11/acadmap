"use client";

import { useSavedTimetables } from "@/hooks/useSavedTimetables";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProfileSavedTimetablesProps {
  className?: string;
}

export function ProfileSavedTimetables({ className }: ProfileSavedTimetablesProps) {
  const { timetables, isLoading } = useSavedTimetables();

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5" />
            Saved Timetables
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  if (timetables.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5" />
            Saved Timetables
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-6">
          <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            No saved timetables yet
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link href="/time-table">
              Create Timetable
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5" />
            Saved Timetables
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {timetables.length} saved
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {timetables.slice(0, 5).map((timetable) => (
          <Link
            key={timetable.id}
            href="/time-table"
            className={cn(
              "flex items-center justify-between p-3 rounded-lg",
              "bg-gray-50 dark:bg-gray-800/50",
              "hover:bg-gray-100 dark:hover:bg-gray-800",
              "transition-colors duration-200 group"
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex-shrink-0">
                {timetable.is_default ? (
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                ) : (
                  <Calendar className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {timetable.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(timetable.updated_at)}
                  <span className="mx-1">•</span>
                  {timetable.config.course_codes.length} courses
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}

        {timetables.length > 5 && (
          <div className="pt-2 text-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/time-table">
                View all {timetables.length} timetables
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ProfileSavedTimetables;
