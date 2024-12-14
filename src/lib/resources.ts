import { Course, CourseResource } from "@/types/courses";
import { fetchOrganizationRepositories, fetchRepositoryContent } from "./github";
import { Download, FileArchive, FileText, Video } from "lucide-react";
import { useRouter } from "next/navigation";

interface ResourceFetchOptions {
    courseCode?: string;
    resourceCategory?: string;
    year?: Number | null;
  }
export async function fetchCourseResources(options: ResourceFetchOptions = {}): Promise<{
    resources: CourseResource[];
    count: number;
  }> {
    try {
      const repos = await fetchOrganizationRepositories(options.courseCode);
      const resources: CourseResource[] = [];
      for (const repo of repos) {
        const nameParts = repo.name.split('-');
        const year = nameParts.length > 1 ? parseInt(nameParts[1]) : undefined;
        const category = determineResourceCategory(repo.name);
  
        // Apply filters
        // if (
        //   (options.resourceCategory && category !== options.resourceCategory) ||
        //   (options.year !== undefined && options.year !== null && year !== options.year)
        // ) {
        //   continue;
        // }
  
        const contents = await fetchRepositoryContent(repo.name);
        console.log("contents: ", JSON.stringify(contents))
        for (let folder of contents){
            const folderContents = await fetchRepositoryContent(repo.name, folder.path);
            const repoResources: CourseResource[] = folderContents.map((file: any) => ({
                id: file.sha,
                title: file.name,
                type: 'other',
                category: folder.name,
                url: file.download_url,
                uploadedBy: 'unknown',
                year: Number(repo.name.slice(7,))
            }));
            resources.push(...repoResources);
        }
      }
  
      return {
        resources,
        count: resources.length
      };
    } catch (error) {
      console.error('Error fetching course resources:', error);
      throw error;
    }
  }
  
// Utility function to determine resource category based on repository name
function determineResourceCategory(repoName: string): CourseResource['category'] {
    const lowerName = repoName.toLowerCase();

    if (lowerName.includes('lecture') || lowerName.includes('video')) {
        return 'lecture';
    }
    if (lowerName.includes('assignment') || lowerName.includes('homework')) {
        return 'assignment';
    }
    if (lowerName.includes('tutorial') || lowerName.includes('lab')) {
        return 'tutorial';
    }
    if (lowerName.includes('pyq') || lowerName.includes('past-year') || lowerName.includes('previous-year')) {
        return 'pyq';
    }

    return 'unclassified'; // Default to lectures
}

// Utility function to get resource category icon
export function getResourceCategoryIcon(category: string) {
    switch (category) {
        case 'lecture':
        return Video;
        case 'assignment':
        return FileText;
        case 'tutorial':
        return FileArchive;
        case 'pyq':
        return Download;
        default:
        return FileText;
    }
}
// Prefetch and categorize resources
export async function prefetchCourseResources(courseCode: string) {
    try {
        const { resources } = await fetchCourseResources({ courseCode });
        
        return {
        lectures: resources.filter(r => r.category === 'lecture'),
        assignments: resources.filter(r => r.category === 'assignment'),
        tutorials: resources.filter(r => r.category === 'tutorial'),
        pyq: resources.filter(r => r.category === 'pyq'),
        totalCount: resources.length
        };
    } catch (error) {
        console.error('Error prefetching resources:', error);
        return {
        lectures: [],
        assignments: [],
        tutorials: [],
        pyq: [],
        totalCount: 0
        };
    }
}
  
interface UploadResourcesProps{
  courseCode: string;
  resourceType: string;
  year: string;
}
export function uploadResource({courseCode, resourceType, year}: UploadResourcesProps){
  const router = useRouter();
  const params = new URLSearchParams({
      courseCode: courseCode,
      type: resourceType,
      ...(year && { year: year })
  });
  router.push(`/upload?${params.toString()}`);
}
