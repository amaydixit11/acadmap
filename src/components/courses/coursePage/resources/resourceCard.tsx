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
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ResourceModel } from '@/models/resources';
import { useContributor } from '@/hooks/useContributor';
import {PDFViewer} from '@/components/pdf-viewer';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

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

  const handleResourceAction = async () => {
    if (resource.url.endsWith('.pdf') && resource.git_url) {
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
      <Card 
        className={cn(
          "group/card w-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 border-2 border-transparent",
          "bg-white text-black dark:bg-neutral-900 dark:text-white"
        )}
      >
        <CardHeader className="flex flex-col space-y-2 p-4 pb-0 md:pb-2">
          <div className="flex items-start space-x-3 w-full min-w-0">
            <Tooltip>
              <TooltipTrigger>
                <ResourceIcon 
                  className="w-5 h-5 text-muted-foreground flex-shrink-0 group-hover/card:text-primary dark:text-gray-400 dark:group-hover/card:text-primary mt-0.5"
                />
              </TooltipTrigger>
              <TooltipContent>{resource.type}</TooltipContent>
            </Tooltip>

            <div className="flex-1 min-w-0">
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <h3 className="font-semibold text-sm md:text-base truncate text-gray-800 dark:text-gray-100 group-hover/card:text-primary dark:group-hover/card:text-primary text-left">
                    {truncateText(resource.title, 35)}
                  </h3>
                </TooltipTrigger>
                <TooltipContent>{resource.title}</TooltipContent>
              </Tooltip>

              <div className="flex flex-wrap gap-2 mt-2">
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="secondary" className="flex items-center text-xs dark:bg-gray-800 dark:text-white">
                      <CategoryIcon className="mr-1 h-3 w-3 text-gray-600 dark:text-gray-400" />
                      {resource.category}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>Resource Category</TooltipContent>
                </Tooltip>

                <Badge variant="outline" className="text-xs dark:text-gray-400">{resource.year}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardFooter className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div className="w-full md:w-auto">
            {selectedProfileName && (
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="text-xs w-full md:w-auto truncate dark:text-gray-400">
                    {selectedProfileName}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Uploaded by {selectedProfileName}</TooltipContent>
              </Tooltip>
            )}
          </div>

          <Button 
            size="sm"
            variant="default"
            onClick={handleResourceAction}
            disabled={isLoading}
            className="w-full md:w-auto group/btn dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            {resource.type === 'link' ? (
              <>
                <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:animate-pulse" />
                Open Link
              </>
            ) : (
              <>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4 group-hover/btn:animate-bounce" />
                )}
                {resource.url.endsWith('.pdf') ? 'View PDF' : 'Download'}
              </>
            )}
          </Button>
        </CardFooter>

        <Dialog 
          open={isPDFOpen} 
          onOpenChange={(open) => {
            setIsPDFOpen(open);
            if (!open) setIsLoading(false);
          }}
        >
          <DialogContent className="w-[95vw] max-w-6xl h-[90vh] p-0">
            <DialogHeader className="p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
              <DialogTitle className="text-sm font-medium truncate px-2">
                {resource.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                PDF viewer for {resource.title}. Press Escape to close.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 w-full h-[calc(90vh-4rem)]">
              {resource.git_url && (
                <PDFViewer 
                  url={resource.git_url} 
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    </TooltipProvider>
  );
}

export default ResourceCard;