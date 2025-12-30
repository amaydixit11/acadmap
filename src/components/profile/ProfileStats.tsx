"use client";

import { useProfileStats } from "@/hooks/useProfileStats";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, ThumbsUp, Bookmark, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileStatsProps {
  userId: string;
  className?: string;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <Card className={cn(
      "border transition-all duration-200 hover:shadow-md",
      "dark:bg-gray-800/50 dark:border-gray-700"
    )}>
      <CardContent className="p-4 flex items-center gap-3">
        <div className={cn(
          "p-2.5 rounded-full",
          color
        )}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileStats({ userId, className }: ProfileStatsProps) {
  const { stats, isLoading } = useProfileStats(userId);

  if (isLoading) {
    return (
      <div className={cn("flex justify-center items-center py-8", className)}>
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-4", className)}>
      <StatCard
        icon={<Upload className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
        label="Uploads"
        value={stats.uploads_count}
        color="bg-blue-100 dark:bg-blue-900/30"
      />
      <StatCard
        icon={<ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" />}
        label="Upvotes Received"
        value={stats.upvotes_received}
        color="bg-green-100 dark:bg-green-900/30"
      />
      <StatCard
        icon={<Bookmark className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
        label="Bookmarks"
        value={stats.bookmarks_count}
        color="bg-amber-100 dark:bg-amber-900/30"
      />
    </div>
  );
}

export default ProfileStats;
