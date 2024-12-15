// src/types/upload.ts
import { Course } from '@/types/courses';
import { ResourceType, ResourceCategory } from '@/types/resource';

export interface UploadFormData {
  title: string;
  description: string;
  year: string;
  url: string;
}

export type NameOption = 'user' | 'custom' | 'anonymous';

export interface UploadStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export interface UploadState {
  courses: Course[];
  selectedCourse: string;
  selectedType: ResourceType;
  selectedCategory: ResourceCategory;
  isSubmitting: boolean;
  uploadStatus: UploadStatus;
  files: File[];
  formData: UploadFormData;
  nameOption: NameOption;
  customName: string;
}