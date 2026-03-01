"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/context/AuthContext';
import { ResourceModel } from '@/models/resources';
import { fetchResourceModels, getUploaderNames } from '@/lib/resources';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bookmark, 
  FileText, 
  Film, 
  Image, 
  Archive, 
  Link as LinkIcon,
  File,
  Loader2,
  BookOpen,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const getResourceIcon = (type: ResourceModel['type']) => {
  const iconMap = {
    'document': <FileText className="h-5 w-5 text-blue-500" />,
    'video': <Film className="h-5 w-5 text-pink-500" />,
    'image': <Image className="h-5 w-5 text-emerald-500" />,
    'archive': <Archive className="h-5 w-5 text-violet-500" />,
    'link': <LinkIcon className="h-5 w-5 text-indigo-500" />,
    'other': <File className="h-5 w-5 text-gray-500" />
  };
  return iconMap[type] || iconMap.other;
};

const getCategoryColor = (category: string) => {
  const colorMap: Record<string, string> = {
    'lecture': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'tutorial': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'assignment': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'pyq': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'lab': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    'unclassified': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  };
  return colorMap[category] || colorMap.unclassified;
};

export default function BookmarksPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { bookmarks, isLoading: bookmarksLoading, toggleBookmark } = useBookmarks();
  const [resources, setResources] = useState<Map<string, ResourceModel>>(new Map());
  const [loadingResources, setLoadingResources] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/sign-in');
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch resource details for bookmarked items
  useEffect(() => {
    const fetchBookmarkedResources = async () => {
      if (bookmarks.length === 0) return;
      
      setLoadingResources(true);
      try {
        const { resources: allResources } = await fetchResourceModels({});
        const resourceMap = new Map<string, ResourceModel>();
        
        const bookmarkIds = new Set(bookmarks.map(b => b.resource_id));
        allResources.forEach(r => {
          if (bookmarkIds.has(r.resourceId)) {
            resourceMap.set(r.resourceId, r);
          }
        });

        // Get uploader names
        const resourceIds = Array.from(resourceMap.keys());
        const uploaderMap = await getUploaderNames(resourceIds);
        
        uploaderMap.forEach((name, id) => {
          const resource = resourceMap.get(id);
          if (resource) {
            resourceMap.set(id, { ...resource, uploadedBy: name });
          }
        });

        setResources(resourceMap);
      } catch (error) {
        console.error('Error fetching bookmarked resources:', error);
      } finally {
        setLoadingResources(false);
      }
    };

    fetchBookmarkedResources();
  }, [bookmarks]);

  const handleRemoveBookmark = async (resourceId: string) => {
    await toggleBookmark(resourceId);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const isLoading = bookmarksLoading || loadingResources;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge 
            variant="secondary" 
            className="inline-flex items-center px-4 py-1.5 mb-4 text-sm
            bg-gradient-to-r from-amber-500 to-orange-500 text-white"
          >
            <Bookmark className="mr-2 h-4 w-4" />
            Your Collection
          </Badge>

          <h1 className="text-4xl md:text-5xl font-extrabold 
            bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600
            dark:from-amber-400 dark:to-orange-400 mb-4"
          >
            Saved Bookmarks
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Quick access to resources you&apos;ve saved for later.
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : bookmarks.length === 0 ? (
          <Card className="max-w-md mx-auto text-center py-12">
            <CardContent>
              <Bookmark className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No bookmarks yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Start saving resources by clicking the bookmark icon on any resource.
              </p>
              <Button asChild>
                <Link href="/resources">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Resources
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((bookmark) => {
              const resource = resources.get(bookmark.resource_id);
              
              return (
                <Card 
                  key={bookmark.id}
                  className={cn(
                    "group transition-all duration-200",
                    "hover:shadow-lg dark:hover:shadow-black/20",
                    "border-2 border-transparent hover:border-amber-200 dark:hover:border-amber-800"
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {resource ? getResourceIcon(resource.type) : <File className="h-5 w-5 text-gray-400" />}
                        {resource && (
                          <Badge variant="outline" className={getCategoryColor(resource.category)}>
                            {resource.category}
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => handleRemoveBookmark(bookmark.resource_id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg font-semibold line-clamp-2 mt-2">
                      {resource?.title || 'Loading...'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {resource && (
                      <>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          {resource.course_code} • {resource.year}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            By {resource.uploadedBy}
                          </span>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={resource.url} target="_blank">
                              View
                            </Link>
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Stats */}
        {bookmarks.length > 0 && (
          <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
            {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''} saved
          </div>
        )}
      </div>
    </div>
  );
}
