// src/hooks/useUploadForm.ts
import { useState } from 'react';
import { ResourceType, ResourceCategory } from '@/types/resource';
import { UploadFormData, NameOption } from '@/types/upload';

export const useUploadForm = (defaultCategory: ResourceCategory = 'lecture') => {
  const [selectedType, setSelectedType] = useState<ResourceType>('document');
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<UploadFormData>({
    title: '',
    description: '',
    year: `${new Date().getFullYear()}`,
    url: ''
  });
  const [nameOption, setNameOption] = useState<NameOption>('user');
  const [customName, setCustomName] = useState('');

  const updateFormData = (updates: Partial<UploadFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      year: `${new Date().getFullYear()}`,
      url: ''
    });
    setFiles([]);
    setSelectedType('document');
    setSelectedCategory(defaultCategory);
  };

  return {
    selectedType,
    setSelectedType,
    selectedCategory,
    setSelectedCategory,
    files,
    setFiles,
    formData,
    updateFormData,
    nameOption,
    setNameOption,
    customName,
    setCustomName,
    resetForm
  };
};