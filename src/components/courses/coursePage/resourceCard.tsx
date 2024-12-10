import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Lock, 
  Video, 
  FileArchive, 
  Link as LinkIcon,
  ExternalLink 
} from 'lucide-react';
import { CourseResource } from '@/models/courses';
import { User } from '@supabase/supabase-js';

interface ResourceCardProps {
  resource: CourseResource;
  user?: User | null;
}

export function ResourceCard({ resource, user }: ResourceCardProps) {
  const router = useRouter();

  const getResourceIcon = () => {
    switch (resource.type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'archive': return FileArchive;
      case 'link': return LinkIcon;
      case 'other': return FileText;
      default: return FileText;
    }
  };

  const ResourceIcon = getResourceIcon();
  const canAccessResource = user !== null;

  const handleDownload = () => {
    if (!canAccessResource) {
      router.push('/login');
      return;
    }

    if (resource.type === 'link') {
      window.open(resource.url, '_blank');
    } else {
      window.open(resource.url, '_blank');
    }
  };

  return (
    <div className="bg-white border rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ResourceIcon className="text-primary w-6 h-6" />
            <h3 className="font-semibold text-gray-800 line-clamp-1">
              {resource.title}
            </h3>
          </div>
          <Badge variant="secondary">
            {resource.year}
          </Badge>
        </div>

        {resource.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {resource.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          {new Date(resource.uploadDate).toLocaleDateString()}
        </div>
        <Button 
          size="sm" 
          variant={canAccessResource ? "default" : "outline"}
          onClick={handleDownload}
        >
          {canAccessResource ? (
            <>
              {resource.type === 'link' ? (
                <ExternalLink className="mr-2 h-4 w-4" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              {resource.type === 'link' ? "Visit" : "Download"}
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Login to Access
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
