import { arrayBufferToBase64, readFileAsArrayBuffer } from "@/utils/fileUtils";
import { createRepository, uploadFileToRepository } from "./github";
import { ResourceCategory, ResourceType } from "@/types/resource";
import { ResourceModel } from "@/types/courses";
import { uploadResourceToDatabase } from "./resources";
import { UploadFormData } from "@/types/upload";
import { User } from "@supabase/supabase-js";

interface UploadProps {
    repoName: string;
    category: ResourceCategory;
    title: string;
    fileName: string;
    name: string;
    userId: string;
    type: string;
    content: string;
    commitMessage: string;
    groupId?: string;
}

async function upload({
    repoName,
    category,
    title,
    fileName,
    name,
    userId,
    type,
    content,
    commitMessage,
    groupId
}: UploadProps) {
    try {
        const filePath = `${category}/${type === 'link' ? `${title}.md` : fileName}`;
        const response = await uploadFileToRepository({
            repoName,
            filePath,
            content,
            commitMessage
        });
        console.log("res: ", response);

        const resource: ResourceModel = uploadFactory({
            response,
            name,
            type: type as ResourceType,
            title,
            category,
            year: repoName.split('-')[1],
            course_code: repoName.split('-')[0],
            groupId
        });

        await uploadResourceToDatabase(resource);
    } catch (error) {
        throw `Failed to upload ${type === 'link' ? 'link' : 'file'} ${title}`;
    }
}

interface UploadFileProps {
    file: File;
    repoName: string;
    category: ResourceCategory;
    title: string;
    type: string;
    name: string;
    userId: string;
    groupId?: string;
}

export async function UploadFile({
    file,
    repoName,
    category,
    title,
    type,
    name,
    userId,
    groupId
}: UploadFileProps) {
    const buffer = await readFileAsArrayBuffer(file);
    const base64Content = arrayBufferToBase64(buffer);

    const uniqueFileName = groupId
      ? (() => {
          const lastDotIndex = file.name.lastIndexOf('.');
          if (lastDotIndex === -1) return `${file.name}_${Date.now()}`;
          const name = file.name.slice(0, lastDotIndex);
          const ext = file.name.slice(lastDotIndex);
          return `${name}_${Date.now()}${ext}`;
        })()
      : file.name;

    await upload({
        repoName,
        category,
        title,
        fileName: uniqueFileName,
        name,
        userId,
        type,
        content: base64Content,
        commitMessage: `Add ${type} resource: ${title} (Uploaded by ${name})`,
        groupId
    });
}

interface UploadLinkProps {
    repoName: string;
    category: ResourceCategory;
    title: string;
    description?: string;
    url: string;
    name: string;
    userId: string;
}

export async function UploadLink({
    repoName,
    category,
    title,
    description,
    url,
    name,
    userId
}: UploadLinkProps) {
    const content = `# ${title}

## Description
${description || 'No description provided'}

## Resource Link
${url}`;

    await upload({
        repoName,
        category,
        title,
        fileName: `${title}.md`,
        name,
        userId,
        type,
        content,
        commitMessage: `Add link resource: ${title} (Uploaded by ${name})`,
        groupId
    });
}

interface UploadFactoryProps{
    response: any,
    name: string,
    type: ResourceType,
    title: string,
    category: ResourceCategory,
    year: string,
    course_code: string

}
export function uploadFactory({response, name, type, title, category, year, course_code, groupId}: UploadFactoryProps): ResourceModel {
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
      groupId
    };
  }
