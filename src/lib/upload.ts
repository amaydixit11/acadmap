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
    name: string;
    userId: string;
    type: string;
    content: string;
    commitMessage: string;
}

async function upload({
    repoName,
    category,
    title,
    name,
    userId,
    type,
    content,
    commitMessage
}: UploadProps) {
    try {
        const filePath = `${category}/${type === 'link' ? `${title}.md` : title}`;
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
            course_code: repoName.split('-')[0]
        });

        uploadResourceToDatabase(resource);
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
}

export async function UploadFile({
    file,
    repoName,
    category,
    title,
    type,
    name,
    userId
}: UploadFileProps) {
    const buffer = await readFileAsArrayBuffer(file);
    const base64Content = arrayBufferToBase64(buffer);

    await upload({
        repoName,
        category,
        title: file.name,
        name,
        userId,
        type,
        content: base64Content,
        commitMessage: `Add ${type} resource: ${title} (Uploaded by ${name})`
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
        name,
        userId,
        type: "link",
        content,
        commitMessage: `Add link resource: ${title} (Uploaded by ${name})`
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
export function uploadFactory({response, name, type, title, category, year, course_code}: UploadFactoryProps): ResourceModel {
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
