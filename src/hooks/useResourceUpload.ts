// src/hooks/useResourceUpload.ts
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createRepository, uploadFileToRepository } from '@/lib/github';
import { arrayBufferToBase64, readFileAsArrayBuffer } from '@/utils/fileUtils';
import { UploadFormData} from '@/types/upload';
import { ResourceCategory, ResourceType } from '@/types/resource';
import { processUploadResponse } from '@/utils/processUploadResponse';
import { ResourceModel } from '@/models/resources';
import { uploadToDatabase } from '@/lib/resources';

class UploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UploadError';
  }
}


export const useResourceUpload = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ 
    type: 'success' | 'error' | null, 
    message: string 
  }>({ type: null, message: '' });

  const handleFileUpload = async (
    repoName: string, 
    files: File[], 
    category: ResourceCategory,
    title: string, 
    type: string,
    name: string
  ) => {
    for (const file of files) {
      try {
        const buffer = await readFileAsArrayBuffer(file);
        const base64Content = arrayBufferToBase64(buffer);
        const response = await uploadFileToRepository(
          repoName,
          `${category}/${file.name}`,
          base64Content,
          `Add ${type} resource: ${title} (Uploaded by ${name})`
        );
        console.log("res: ", response);
        const resource: ResourceModel = processUploadResponse(response, name, type as ResourceType, title, category, repoName.split('-')[1], repoName.split('-')[0]);
        uploadToDatabase(resource);
        
      } catch (error) {
        throw new UploadError(`Failed to upload file ${file.name}`);
      }
    }
  };

  const handleLinkUpload = async (
    repoName: string, 
    formData: UploadFormData, 
    category: ResourceCategory,
    name: string
  ) => {
    const content = `# ${formData.title}

## Description
${formData.description}

## Resource Link
${formData.url}`;

    await uploadFileToRepository(
      repoName,
      `${category}/${formData.title}.md`,
      content,
      `Add link resource: ${formData.title} (Uploaded by ${name})`
    );
  };

  const uploadResource = async (
    user: User,
    course: { id: string, code: string, title: string },
    formData: UploadFormData,
    files: File[],
    category: ResourceCategory,
    type: string,
    nameOption: string,
    customName: string
  ) => {
    if (!course) {
      setUploadStatus({ 
        type: 'error', 
        message: 'Please select a course.' 
      });
      return false;
    }

    setIsSubmitting(true);
    setUploadStatus({ type: null, message: '' });

    try {
      const repoName = `${course.code}-${formData.year}`;
      
      try {
        await createRepository(
          repoName, 
          `Course materials for ${course.title} - ${formData.year}`
        );
      } catch (error) {
        // Repository might already exist, continue with upload
      }

      const name = nameOption === 'user' ? user.user_metadata.name || 'unknown' 
        : nameOption === 'custom' ? customName 
        : 'anonymous';

      if (type === 'link') {
        await handleLinkUpload(repoName, formData, category, name);
      } else {
        await handleFileUpload(repoName, files, category, formData.title, type, name);
      }




      setUploadStatus({
        type: 'success',
        message: 'Resources uploaded successfully to GitHub!'
      });

      return true;
    } catch (error) {
      const errorMessage = error instanceof UploadError 
        ? error.message 
        : 'An unexpected error occurred.';

      setUploadStatus({ type: 'error', message: errorMessage });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    uploadStatus,
    uploadResource
  };
};