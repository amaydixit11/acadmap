// hooks/useUploadActions.ts
import { User } from '@supabase/supabase-js';
import { createRepository } from '@/lib/github';
import { UploadFile, UploadLink } from '@/lib/upload';
import { UploadContextState } from '@/types/uploadContext';
import { ResourceCategory, ResourceType } from '@/types/resource';
import { NameOption, UploadFormData } from '@/types/upload';
import { DEFAULT_FORM_DATA } from './useUploadState';

export const useUploadActions = (user: User, state: UploadContextState, setState: React.Dispatch<React.SetStateAction<UploadContextState>>) => {
  const handleUpload = async (repoName: string) => {
    const name = state.nameOption === 'user'
      ? user.user_metadata.name || 'unknown'
      : state.nameOption === 'custom'
        ? state.customName
        : 'anonymous';

    if (state.selectedType === 'link') {
      await UploadLink({
        repoName,
        category: state.selectedCategory,
        title: state.formData.title,
        description: state.formData.description,
        url: state.formData.url,
        name,
        userId: user.id
      });
    } else {
      const allFilesToUpload = [...state.files, ...state.failedFiles];

      // Filter out duplicate files based on name and size to avoid redundant uploads
      const uniqueFiles = allFilesToUpload.filter((file, index, self) =>
        index === self.findIndex((f) => (
          f.name === file.name && f.size === file.size
        ))
      );

      if (uniqueFiles.length === 0) return;

      const groupId = uniqueFiles.length > 1 && state.selectedType === 'image'
        ? crypto.randomUUID()
        : undefined;

      const uploadResults = await Promise.allSettled(uniqueFiles.map(file =>
        UploadFile({
          file,
          repoName,
          category: state.selectedCategory,
          title: state.formData.title,
          type: state.selectedType,
          name,
          userId: user.id,
          groupId
        })
      ));

      const failed = uniqueFiles.filter((_, index) => uploadResults[index].status === 'rejected');

      if (failed.length > 0) {
        setState(prev => ({ ...prev, failedFiles: failed }));
      }
    }
  };

  return {
    handleUpload,
    setSelectedType: (type: ResourceType) => setState(prev => ({ ...prev, selectedType: type })),
    setSelectedCategory: (category: ResourceCategory) => setState(prev => ({ ...prev, selectedCategory: category })),
    setFiles: (files: File[]) => setState(prev => ({ ...prev, files })),
    setFailedFiles: (files: File[]) => setState(prev => ({ ...prev, failedFiles: files })),
    updateFormData: (updates: Partial<UploadFormData>) => setState(prev => ({
      ...prev,
      formData: { ...prev.formData, ...updates }
    })),
    setNameOption: (option: NameOption) => setState(prev => ({ ...prev, nameOption: option })),
    setCustomName: (name: string) => setState(prev => ({ ...prev, customName: name })),
    setSelectedCourse: (courseId: string) => setState(prev => ({ ...prev, selectedCourse: courseId })),
    resetForm: () => setState(prev => ({
      ...prev,
      formData: DEFAULT_FORM_DATA,
      files: [],
      failedFiles: [],
      selectedType: 'document',
      selectedCategory: prev.selectedCategory
    }))
  };
};