"use client";

import { FileText, Video, Link as LinkIcon, Download, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseResource } from "@/models/courses";

interface ResourceCardProps {
  resource: CourseResource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const getIcon = () => {
    switch (resource.type) {
      case "pdf":
        return <FileText className="h-6 w-6" />;
      case "video":
        return <Video className="h-6 w-6" />;
      case "link":
        return <LinkIcon className="h-6 w-6" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getIcon()}
            <div>
              <CardTitle className="text-base">{resource.title}</CardTitle>
              <CardDescription className="text-sm">
                {resource.description}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary">{resource.type.toUpperCase()}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{resource.uploadedBy}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
          </div>
        </div>
        <Button className="w-full mt-4" variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardContent>
    </Card>
  );
}