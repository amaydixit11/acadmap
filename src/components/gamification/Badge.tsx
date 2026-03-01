
import React from 'react';
import { 
  Trophy, 
  Upload, 
  BookOpen, 
  Heart, 
  Bookmark, 
  Compass, 
  Star, 
  Zap, 
  Medal,
  Award,
  Crown
} from 'lucide-react';
import { Badge as BadgeType } from '@/types/gamification';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from '@/lib/utils';

// Map icon names to Lucide components
const iconMap: Record<string, any> = {
  'Trophy': Trophy,
  'Upload': Upload,
  'BookOpen': BookOpen,
  'Heart': Heart,
  'Bookmark': Bookmark,
  'Compass': Compass,
  'Star': Star,
  'Zap': Zap,
  'Medal': Medal,
  'Award': Award,
  'Crown': Crown
};

// Map categories to colors
const categoryColors = {
  contribution: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  engagement: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
  achievement: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
};

interface BadgeIconProps {
  badge: BadgeType;
  className?: string;
  showName?: boolean;
}

export function BadgeItem({ badge, className, showName = false }: BadgeIconProps) {
  const IconComponent = iconMap[badge.icon_name] || Award;
  const colorClass = categoryColors[badge.category];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              "flex items-center gap-2 px-2.5 py-1.5 rounded-full border transition-all duration-200 cursor-default",
              colorClass,
              "hover:scale-105 hover:shadow-sm",
              className
            )}
          >
            <IconComponent className="w-4 h-4" />
            {(showName || !badge.icon_name) && (
              <span className="text-xs font-semibold">{badge.name}</span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[200px] text-center">
          <p className="font-semibold mb-1">{badge.name}</p>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
          {badge.received_at && (
            <p className="text-[10px] opacity-70 mt-1 pt-1 border-t border-border">
              Earned on {new Date(badge.received_at).toLocaleDateString()}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
