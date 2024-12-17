// types/uploadContext.ts
import { ResourceCategory, ResourceType } from '@/types/resource';
import { Course } from '@/types/courses';
import { NameOption, UploadFormData } from '@/types/upload';

export interface UploadContextState {
  selectedType: ResourceType;
  selectedCategory: ResourceCategory;
  files: File[];
  formData: UploadFormData;
  nameOption: NameOption;
  customName: string;
  courses: Course[];
  selectedCourse: string;
  coursesError: string | null;
  isSubmitting: boolean;
  uploadStatus: {
    type: 'success' | 'error' | null;
    message: string;
  };
}

export interface UploadContextActions {
  setSelectedType: (type: ResourceType) => void;
  setSelectedCategory: (category: ResourceCategory) => void;
  setFiles: (files: File[]) => void;
  updateFormData: (updates: Partial<UploadFormData>) => void;
  setNameOption: (option: NameOption) => void;
  setCustomName: (name: string) => void;
  setSelectedCourse: (courseId: string) => void;
  handleSubmit: () => Promise<boolean>;
  resetForm: () => void;
}

export interface UploadContextProps extends UploadContextState, UploadContextActions {}