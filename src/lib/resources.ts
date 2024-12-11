import { Course, CourseResource } from "@/models/courses";
import { fetchOrganizationRepositories, fetchRepositoryContent } from "./github";
import { Download, FileArchive, FileText, Video } from "lucide-react";

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
      // Fetch repositories, optionally filtered by course code
      const repos = await fetchOrganizationRepositories(options.courseCode);
    //   console.log("repos: ", repos )
  
      // Process repositories into resources
      const resources: CourseResource[] = [];
  
      for (const repo of repos) {
        // Try to extract year and resource category from repository name
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
  
        // Fetch repository contents
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
        // Create resource entries for each file
        // const repoCategories = contents.map((file: any) => ({
        //   id: file.sha,
        //   name: file.name,
        //   category,
        //   year,
        //   url: file.html_url,
        //   downloadUrl: file.download_url,
        //   description: repo.description
        // }));
  
        // resources.push(...repoCategories);
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
  
  
  