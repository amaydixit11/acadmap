import { Course } from "@/types/courses";
import { fetchOrganizationRepositories, fetchRepositoryContent } from "./github";
import { Download, FileArchive, FileText, Microscope, Video } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { ResourceModel } from "@/models/resources";
import { createClient } from "@/utils/supabase/client";
import { insertRecord } from "./supabase";

interface ResourceFetchOptions {
    courseCode?: string;
    resourceCategory?: string;
    year?: Number | null;
    // columnN
  }
export async function fetchResourceModels(options: ResourceFetchOptions = {}): Promise<{
    resources: ResourceModel[];
    count: number;
  }> {
    console.log('[fetchResourceModels] Fetching resources with options:', options);
    try {
      const repos = await fetchOrganizationRepositories(options.courseCode);
      console.log(`[fetchResourceModels] Found ${repos.length} repositories for course code: ${options.courseCode}`);
      let resources: Omit<ResourceModel, 'uploadedBy'>[] = [];
  
      // Process all repositories in parallel
      const resourcePromises = repos.map(async (repo: any) => {
        try {
          const processedShas = new Set<string>();
          console.log(`[fetchResourceModels] Processing repo: ${repo.name}`);
          const nameParts = repo.name.split('-');
          const rootContents = await fetchRepositoryContent(repo.name);
          console.log(`[fetchResourceModels] Found ${rootContents.length} folders/files in repo: ${repo.name}`);
  
          // Fetch contents of all subfolders in parallel
          const folderPromises = rootContents.map(async (folder: any) => {
            const folderContents = await fetchRepositoryContent(repo.name, folder.path);
            console.log(`[fetchResourceModels] Found ${folderContents.length} items in folder: ${folder.path}`);
            return folderContents.map((file: any) => {
              if (processedShas.has(file.sha)) return null;
              processedShas.add(file.sha);
              return {
                resourceId: file.sha,
                course_code: nameParts[0],
                title: file.name,
                type: 'other', // You might want to determine this based on file extension
                category: folder.name,
                url: file.download_url,
                year: Number(repo.name.slice(7,)),
                git_url: file.git_url,
              };
            }).filter(Boolean); // Remove nulls
          });
  
          return (await Promise.all(folderPromises)).flat();
        } catch (error) {
          console.error(`[fetchResourceModels] Failed to process repo ${repo.name}:`, error);
          return []; // Return empty array on error to not fail the whole process
        }
      });
  
      resources = (await Promise.all(resourcePromises)).flat();
      const resourceIds = resources.map(r => r.resourceId);
      const uploaderMap = await getUploaderNames(resourceIds);

      const finalResources: ResourceModel[] = resources.map(resource => ({
        ...resource,
        uploadedBy: uploaderMap.get(resource.resourceId) || 'Anonymous',
      }));
  
      console.log(`[fetchResourceModels] Total resources fetched: ${finalResources.length}`);
      return {
        resources: finalResources,
        count: finalResources.length
      };
    } catch (error) {
      console.error('Error fetching course resources:', error);
      throw error;
    }
  }

  
  async function getUploaderName(resourceId: string): Promise<string> {
    console.log(`[getUploaderName] Fetching uploader name for resourceId: ${resourceId}`);
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
    console.log(`[getUploaderName] Found uploader name: ${name} for resourceId: ${resourceId}`);
    return name;
  }

  export async function getUploaderNames(resourceIds: string[]): Promise<Map<string, string>> {
    if (resourceIds.length === 0) {
      console.log('[getUploaderNames] No resource IDs provided, returning empty map.');
      return new Map();
    }
  
    const supabase = createClient();
    const { data, error } = await supabase
      .from('resources')
      .select('resourceId, uploadedBy')
      .in('resourceId', resourceIds);
  
    if (error) {
      console.error('[getUploaderNames] Error fetching uploader names:', error.message);
      return new Map();
    }
  
    const uploaderMap = new Map<string, string>();
    data?.forEach(item => {
      console.log(`[getUploaderNames] Mapping resourceId ${item.resourceId} to uploader ${item.uploadedBy || 'Anonymous'}`);
      uploaderMap.set(item.resourceId, item.uploadedBy || 'Anonymous');
    });
  
    return uploaderMap;
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
        console.error(`[prefetchResourceModels] Error prefetching resources for ${courseCode}:`, error);
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
  console.log(`[uploadResource] Redirecting to upload page with params: courseCode=${courseCode}, resourceType=${resourceType}, year=${year}`);
  // const router = useRouter();
  const params = new URLSearchParams({
      courseCode: courseCode,
      type: resourceType,
      ...(year && { year: year })
  });
  // router.push(`/upload?${params.toString()}`);
  redirect(`/upload?${params.toString()}`);
}

export async function uploadResourceToDatabase(resource: ResourceModel): Promise<void> {
  console.log('[uploadResourceToDatabase] Uploading resource to database:', resource);
  try {
    const response = await insertRecord('resources', resource)
    // const supabase = createClient();
    // const { data, error } = await supabase
    //   .from('resources')
    //   .insert(
    //     {
    //       resourceId: resource.resourceId,
    //       course_code: resource.course_code,
    //       title: resource.title,
    //       type: resource.type,
    //       category: resource.category,
    //       url: resource.url,
    //       uploadedBy: resource.uploadedBy,
    //       description: resource.description,
    //       year: resource.year,
    //     }
    //   );

    // if (error) {
    //   throw new Error(`Failed to upload resource: ${error.message}`);
    // }

    // console.log('Resource uploaded successfully:', data);
    // console.log('Resource uploaded successfully:', response);
  } catch (error) {
    console.error('[uploadResourceToDatabase] Error uploading to Supabase:', error);
    throw error;
  }
}
