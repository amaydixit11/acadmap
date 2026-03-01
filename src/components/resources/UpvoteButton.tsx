"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useResourceVotes } from "@/hooks/useResourceUpvotes";
import { useAuth } from "@/context/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VoteButtonsProps {
  resourceId: string;
  className?: string;
  size?: "sm" | "default" | "lg";
}

export function VoteButtons({
  resourceId,
  className,
  size = "default",
}: VoteButtonsProps) {
  const { score, userVote, isLoading, upvote, downvote } = useResourceVotes(resourceId);
  const { isAuthenticated } = useAuth();

  const sizeClasses = {
    sm: "h-7 w-7",
    default: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    default: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const scoreSizes = {
    sm: "text-xs min-w-[1.5rem]",
    default: "text-sm min-w-[2rem]",
    lg: "text-base min-w-[2.5rem]",
  };

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    await upvote();
  };

  const handleDownvote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    await downvote();
  };

  const getScoreColor = () => {
    if (score > 0) return "text-green-600 dark:text-green-400";
    if (score < 0) return "text-red-600 dark:text-red-400";
    return "text-gray-500 dark:text-gray-400";
  };

  const content = (
    <div className={cn("flex items-center gap-0.5 rounded-lg border bg-background", className)}>
      {/* Upvote Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          sizeClasses[size],
          "rounded-r-none border-r",
          userVote === 1 && "bg-green-100 dark:bg-green-900/30 text-green-600",
          !isAuthenticated && "cursor-not-allowed opacity-60",
        )}
        onClick={handleUpvote}
        disabled={isLoading || !isAuthenticated}
      >
        <ThumbsUp
          className={cn(
            iconSizes[size],
            userVote === 1 && "fill-current",
            isLoading && "animate-pulse"
          )}
        />
      </Button>

      {/* Score */}
      <span className={cn(
        scoreSizes[size],
        "font-semibold text-center tabular-nums px-1",
        getScoreColor()
      )}>
        {score}
      </span>

      {/* Downvote Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          sizeClasses[size],
          "rounded-l-none border-l",
          userVote === -1 && "bg-red-100 dark:bg-red-900/30 text-red-600",
          !isAuthenticated && "cursor-not-allowed opacity-60",
        )}
        onClick={handleDownvote}
        disabled={isLoading || !isAuthenticated}
      >
        <ThumbsDown
          className={cn(
            iconSizes[size],
            userVote === -1 && "fill-current",
            isLoading && "animate-pulse"
          )}
        />
      </Button>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent>
            <p>Sign in to vote</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}

// Legacy export for backward compatibility
export function UpvoteButton(props: VoteButtonsProps) {
  return <VoteButtons {...props} />;
}

export default VoteButtons;
