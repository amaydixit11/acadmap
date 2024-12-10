import { 
  FileText, 
  Download, 
  Lock, 
  Video, 
  FileArchive, 
  LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseResource} from "@/models/courses";
import { User } from "@supabase/supabase-js";

interface ResourceCardProps {
  resource: CourseResource;
  user?: User | null;
}

export function ResourceCard({ resource, user }: ResourceCardProps) {
  const getResourceIcon = () => {
    switch (resource.type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'archive': return FileArchive;
      case 'link': return LinkIcon
      default: return FileText;
    }
  };

  const ResourceIcon = getResourceIcon();

  const canAccessResource = user !== null 
  // || !resource.restricted;

  const handleDownload = () => {
    if (canAccessResource) {
      // Implement download logic
      window.open(resource.url, '_blank');
    }
  };

  return (
    <div className="bg-white border rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <ResourceIcon className="text-primary w-6 h-6" />
          <h3 className="font-semibold text-gray-800 line-clamp-1">
            {resource.title}
          </h3>
        </div>
        <Badge variant="secondary">{resource.year}</Badge>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          {resource.description}
        </div>
        <Button 
          size="sm" 
          variant={canAccessResource ? "default" : "outline"}
          onClick={handleDownload}
          disabled={!canAccessResource}
        >
          {canAccessResource ? <Download className="mr-2 h-4 w-4" /> : <Lock className="mr-2 h-4 w-4" />}
          {canAccessResource ? "Download" : "Restricted"}
        </Button>
      </div>
    </div>
  );
}