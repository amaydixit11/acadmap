import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CourseResource } from "@/models/courses";
import { 
  FileText, 
  Video, 
  FileArchive, 
  Link as LinkIcon, 
  Download, 
  ExternalLink, 
  PlayCircle,
  BookOpen,
  Paperclip
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  resource: CourseResource;
}

// Utility function to truncate text
const truncateText = (text: string, maxLength: number = 30) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const resourceIcons = {
    'pdf': FileText,
    'video': Video,
    'archive': FileArchive,
    'link': LinkIcon,
    'other': Paperclip
  };

  const categoryIcons = {
    'lecture': BookOpen,
    'tutorial': PlayCircle,
    'assignment': FileText,
    'pyq': FileArchive,
    'unclassified': Paperclip
  };

  const ResourceIcon = resourceIcons[resource.type] || Paperclip;
  const CategoryIcon = categoryIcons[resource.category] || Paperclip;

  const handleResourceAction = () => {
    if (resource.type === 'link') {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    } else {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <TooltipProvider>
      <Card 
        className="group/card w-full max-w-md transition-all duration-300 hover:shadow-xl hover:border-primary/50 border-2 border-transparent"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-0">
          <div className="flex items-center space-x-3 w-full min-w-0">
            <Tooltip>
              <TooltipTrigger>
                <ResourceIcon 
                  className="w-6 h-6 text-muted-foreground flex-shrink-0 group-hover/card:text-primary"
                />
              </TooltipTrigger>
              <TooltipContent>{resource.type}</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className="w-full min-w-0">
                <h3 className="font-semibold text-sm truncate text-gray-800 group-hover/card:text-primary">
                  {truncateText(resource.title, 40)}
                </h3>
              </TooltipTrigger>
              <TooltipContent>{resource.title}</TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="flex items-center">
                  <CategoryIcon className="mr-1 h-3 w-3" />
                  {resource.category}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Resource Category</TooltipContent>
            </Tooltip>

            <Badge variant="outline">{resource.year}</Badge>
          </div>
        </CardHeader>

        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {resource.uploadedBy && (
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="text-xs">
                    {truncateText(resource.uploadedBy, 15)}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Uploaded by {resource.uploadedBy}</TooltipContent>
              </Tooltip>
            )}
          </div>

          <Button 
            size="sm" 
            variant="default"
            onClick={handleResourceAction}
            className="group/btn my-4"
          >
            {resource.type === 'link' ? (
              <>
                <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:animate-pulse" />
                Open Link
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4 group-hover/btn:animate-bounce" />
                Download
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}

export default ResourceCard;