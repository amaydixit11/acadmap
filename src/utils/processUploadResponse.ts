import { ResourceModel } from "@/models/resources";
import { ResourceCategory, ResourceType } from "@/types/resource";

export function processUploadResponse(response: any, name: string, type: ResourceType, title: string, category: ResourceCategory, year: string, course_code: string): ResourceModel {
    const { content, commit } = response;

    const resourceUrl = content.download_url;
    const uploadedBy = name
    const resourceId = content.sha;
    // const year = Number(year)
    return {
      resourceId,
      course_code: course_code,
      title: title,
      type: type,
      category: category,
      url: resourceUrl,
      uploadedBy,
      year: Number(year),
    };
  }