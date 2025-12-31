'use client';

import { Badge } from '@/types/gamification';
import { BadgeItem } from './Badge';
import { cn } from '@/lib/utils';
import { Award } from 'lucide-react';

interface BadgeDisplayProps {
  badges: Badge[];
  isLoading?: boolean;
  className?: string;
  emptyMessage?: string;
}

export function BadgeDisplay({ 
  badges, 
  isLoading = false, 
  className,
  emptyMessage = "No badges earned yet"
}: BadgeDisplayProps) {
  if (isLoading) {
    return (
      <div className={cn("flex gap-2 flex-wrap", className)}>
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="w-24 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (badges.length === 0) {
    return (
      <div className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground py-4",
        className
      )}>
        <Award className="w-5 h-5 opacity-50" />
        <span>{emptyMessage}</span>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2 flex-wrap", className)}>
      {badges.map((badge) => (
        <BadgeItem key={badge.id} badge={badge} showName />
      ))}
    </div>
  );
}
