// hooks/useUploadState.ts
import { useState } from 'react';
import { ResourceCategory } from '@/types/resource';
import { UploadContextState } from '@/types/uploadContext';

export const DEFAULT_FORM_DATA = {
  title: '',
  description: '',
  year: `${new Date().getFullYear()}`,
  url: ''
};

export const useUploadState = (defaultCategory: ResourceCategory) => {
  return useState<UploadContextState>({
    selectedType: 'document',
    selectedCategory: defaultCategory,
    files: [],
    formData: DEFAULT_FORM_DATA,
    nameOption: 'user',
    customName: '',
    courses: [],
    selectedCourse: '',
    coursesError: null,
    isSubmitting: false,
    uploadStatus: { type: null, message: '' }
  });
};