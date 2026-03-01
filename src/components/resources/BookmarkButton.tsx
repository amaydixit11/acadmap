"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useIsBookmarked } from "@/hooks/useBookmarks";
import { useAuth } from "@/context/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BookmarkButtonProps {
  resourceId: string;
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: "button" | "icon";
}

export function BookmarkButton({
  resourceId,
  className,
  size = "default",
  variant = "icon",
}: BookmarkButtonProps) {
  const { isBookmarked, isLoading, toggle } = useIsBookmarked(resourceId);
  const { isAuthenticated } = useAuth();

  const sizeClasses = {
    sm: variant === "icon" ? "h-7 w-7" : "h-7 px-2 text-xs",
    default: variant === "icon" ? "h-9 w-9" : "h-9 px-3 text-sm",
    lg: variant === "icon" ? "h-11 w-11" : "h-11 px-4 text-base",
  };

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    default: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      return;
    }
    
    await toggle();
  };

  const button = (
    <Button
      variant={variant === "icon" ? "ghost" : isBookmarked ? "default" : "outline"}
      size={variant === "icon" ? "icon" : "default"}
      className={cn(
        variant !== "icon" && sizeClasses[size],
        variant === "icon" && sizeClasses[size],
        "transition-all duration-200",
        isBookmarked && variant === "icon" && "text-amber-500 hover:text-amber-600",
        isBookmarked && variant !== "icon" && "bg-amber-500 hover:bg-amber-600 text-white border-amber-500",
        !isAuthenticated && "cursor-not-allowed opacity-60",
        className
      )}
      onClick={handleClick}
      disabled={isLoading}
    >
      <Bookmark
        className={cn(
          iconSizes[size],
          isBookmarked && "fill-current",
          isLoading && "animate-pulse"
        )}
      />
      {variant !== "icon" && (
        <span className="ml-1.5">{isBookmarked ? "Saved" : "Save"}</span>
      )}
    </Button>
  );

  if (!isAuthenticated) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p>Sign in to bookmark</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>{isBookmarked ? "Remove bookmark" : "Add to bookmarks"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default BookmarkButton;
