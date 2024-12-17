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
      await Promise.all(state.files.map(file => 
        UploadFile({
          file,
          repoName,
          category: state.selectedCategory,
          title: state.formData.title,
          type: state.selectedType,
          name,
          userId: user.id
        })
      ));
    }
  };

  return {
    handleUpload,
    setSelectedType: (type: ResourceType) => setState(prev => ({ ...prev, selectedType: type })),
    setSelectedCategory: (category: ResourceCategory) => setState(prev => ({ ...prev, selectedCategory: category })),
    setFiles: (files: File[]) => setState(prev => ({ ...prev, files })),
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
      selectedType: 'document',
      selectedCategory: prev.selectedCategory
    }))
  };
};