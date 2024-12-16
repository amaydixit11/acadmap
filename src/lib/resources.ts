import { Course } from "@/types/courses";
import { fetchOrganizationRepositories, fetchRepositoryContent } from "./github";
import { Download, FileArchive, FileText, Microscope, Video } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { ResourceModel } from "@/models/resources";
import { createClient } from "@/utils/supabase/client";

interface ResourceFetchOptions {
    courseCode?: string;
    resourceCategory?: string;
    year?: Number | null;
  }
export async function fetchResourceModels(options: ResourceFetchOptions = {}): Promise<{
    resources: ResourceModel[];
    count: number;
  }> {
    try {
      const repos = await fetchOrganizationRepositories(options.courseCode);
      const resources: ResourceModel[] = [];
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
            const repoResources: ResourceModel[] = folderContents.map((file: any) => ({
                reourceId: file.sha,
                course_code: nameParts[0],
                title: file.name,
                type: 'other',
                category: folder.name,
                url: file.download_url,
                uploadedBy: getUploaderName(file.sha),
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

  async function getUploaderName(resourceId: string): Promise<string> {
    const supabase = createClient();
  
    // Query the database
    const { data, error } = await supabase
      .from('resources')
      .select('uploadedBy') // Select only the required column to optimize the query
      .eq('resourceId', resourceId)
      .limit(1) // Limit the result to 1 since you expect a single match
  
    // Handle errors and return "unknown" if necessary
    if (error) {
      console.error('Error fetching uploader name:', error.message);
      return 'Anonymous';
    }
  
    // Check if data exists and return the uploader's name or "Anonymous"
    const name = data?.[0]?.uploadedBy ?? 'Anonymous';
    return name;
  }


// Utility function to determine resource category based on repository name
function determineResourceCategory(repoName: string): ResourceModel['category'] {
    const lowerName = repoName.toLowerCase();

    if (lowerName.includes('lecture') || lowerName.includes('video')) {
        return 'lecture';
    }
    if (lowerName.includes('assignment') || lowerName.includes('homework')) {
      return 'assignment';
    }
    if (lowerName.includes('lab')) {
      return 'lab';
    }
    if (lowerName.includes('tutorial')) {
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
        case 'lab':
        return Microscope;
        case 'tutorial':
        return FileArchive;
        case 'pyq':
        return Download;
        default:
        return FileText;
    }
}
// Prefetch and categorize resources
export async function prefetchResourceModels(courseCode: string) {
    try {
        const { resources } = await fetchResourceModels({ courseCode });
        
        return {
        lectures: resources.filter(r => r.category === 'lecture'),
        assignments: resources.filter(r => r.category === 'assignment'),
        labs: resources.filter(r => r.category === 'lab'),
        tutorials: resources.filter(r => r.category === 'tutorial'),
        pyq: resources.filter(r => r.category === 'pyq'),
        totalCount: resources.length
        };
    } catch (error) {
        console.error('Error prefetching resources:', error);
        return {
        lectures: [],
        assignments: [],
        labs: [],

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
  // const router = useRouter();
  const params = new URLSearchParams({
      courseCode: courseCode,
      type: resourceType,
      ...(year && { year: year })
  });
  // router.push(`/upload?${params.toString()}`);
  redirect(`/upload?${params.toString()}`);
}

export async function uploadToDatabase(resource: ResourceModel): Promise<void> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('resources') // Replace 'resources' with your table name
      .insert(
        {
          resourceId: resource.resourceId,
          course_code: resource.course_code,
          title: resource.title,
          type: resource.type,
          category: resource.category,
          url: resource.url,
          uploadedBy: resource.uploadedBy,
          description: resource.description,
          year: resource.year,
        }
      );

    if (error) {
      throw new Error(`Failed to upload resource: ${error.message}`);
    }

    console.log('Resource uploaded successfully:', data);
  } catch (error) {
    console.error('Error uploading to Supabase:', error);
    throw error;
  }
}
