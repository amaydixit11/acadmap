"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  FileText, 
  Video, 
  FileArchive, 
  Link as LinkIcon, 
  Download, 
  ExternalLink, 
  PlayCircle,
  BookOpen,
  Paperclip,
  Image,
  Microscope,
  X,
  Loader2,
  AlertCircle,
  Calendar,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ResourceModel } from '@/models/resources';
import { useContributor } from '@/hooks/useContributor';
import {PDFViewer} from '@/components/pdf-viewer';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { UpvoteButton, BookmarkButton } from '@/components/resources';

interface ResourceCardProps {
  resource: ResourceModel;
}

const truncateText = (text: string, maxLength: number = 30) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedProfileName } = useContributor(resource.uploadedBy);

  const resourceIcons = {
    'document': FileText,
    'video': Video,
    'image': Image,
    'archive': FileArchive,
    'link': LinkIcon,
    'other': Paperclip
  };

  const categoryIcons = {
    'lecture': BookOpen,
    'tutorial': PlayCircle,
    'assignment': FileText,
    'pyq': FileArchive,
    'lab': Microscope,
    'unclassified': Paperclip
  };

  const ResourceIcon = resourceIcons[resource.type] || Paperclip;
  const CategoryIcon = categoryIcons[resource.category] || Paperclip;

  const handleResourceAction = async (download: boolean) => {
    if (download){
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    } else if (resource.url.endsWith('.pdf') && resource.git_url) {
      setIsLoading(true);
      setIsPDFOpen(true);
    } else if (resource.type === 'link') {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    } else {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <TooltipProvider>
      <Card className="group relative overflow-hidden bg-white dark:bg-neutral-900 border-2 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
        {/* Decorative background - hidden on small screens */}
        <div className="hidden sm:block absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-primary/5 rounded-full transition-transform group-hover:scale-150" />
        
        <CardHeader className="p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-4">
            {/* Icon container - smaller on mobile */}
            <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg dark:bg-primary/5">
              <ResourceIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <h3 className="font-semibold text-base sm:text-lg text-left truncate text-gray-800 dark:text-gray-100">
                    {resource.title}
                  </h3>
                </TooltipTrigger>
                <TooltipContent>{resource.title}</TooltipContent>
              </Tooltip>

              {/* Metadata section - stack on mobile, flex on larger screens */}
              <div className="flex flex-col gap-1.5 mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                  <div className="flex items-center gap-1">
                    <CategoryIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="capitalize">{resource.category}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{resource.year}</span>
                  </div>
                </div>

                {selectedProfileName && (
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{selectedProfileName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardFooter className="p-3 sm:p-4 pt-0">
          {/* Button container - stack on extra small screens */}
          <div className="flex flex-col xs:flex-row gap-2 w-full">
            {/* Upvote and Bookmark buttons */}
            <div className="flex items-center gap-1">
              <UpvoteButton resourceId={resource.resourceId} size="sm" />
              <BookmarkButton resourceId={resource.resourceId} size="sm" />
            </div>
            
            <div className="flex flex-1 gap-2">
              <Button 
                size="sm"
                variant="secondary"
                onClick={() => handleResourceAction(false)}
                disabled={isLoading}
                className="hidden sm:flex flex-1 text-xs sm:text-sm bg-primary/10 hover:bg-primary/20 dark:bg-primary/5 dark:hover:bg-primary/10"
              >
                {isLoading ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                ) : (
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
                {resource.type === 'link' ? 'Open Link' : resource.url.endsWith('.pdf') ? 'View PDF' : 'Open'}
              </Button>
              
              <Button 
                size="sm"
                variant="default"
                onClick={() => handleResourceAction(true)}
                disabled={isLoading}
                className="flex-1 text-xs sm:text-sm"
              >
                <Download className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Download
              </Button>
            </div>
          </div>
        </CardFooter>

        <Dialog 
          open={isPDFOpen} 
          onOpenChange={(open) => {
            setIsPDFOpen(open);
            if (!open) setIsLoading(false);
          }}
        >
          <DialogContent className="w-[95vw] max-w-6xl h-[90vh] p-0">
            <DialogHeader className="p-2 sm:p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b">
              <DialogTitle className="text-base sm:text-lg font-medium truncate">
                {resource.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                PDF viewer for {resource.title}. Press Escape to close.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 w-full h-[calc(90vh-5rem)]">
              {resource.git_url && (
                <PDFViewer url={resource.git_url} />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    </TooltipProvider>
  );
}

export default ResourceCard;