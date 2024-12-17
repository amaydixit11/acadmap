  // // src/hooks/useUpload.ts
  // import { User } from '@supabase/supabase-js';
  // import { ResourceCategory } from '@/types/resource';
  // import { useUploadCourses } from './useUploadCourses';
  // import { useUploadForm } from './useUploadForm';
  // import { useResourceUpload } from './useResourceUpload';

  // export const useUpload = (
  //   user: User, 
  //   defaultCourseCode?: string, 
  //   defaultCategory: ResourceCategory = 'lecture'
  // ) => {
  //   const courseHook = useUploadCourses(defaultCourseCode);
  //   const formHook = useUploadForm(defaultCategory);
  //   const uploadHook = useResourceUpload();

  //   const handleSubmit = async () => {
  //     const selectedCourse = courseHook.courses.find(
  //       c => c.id === courseHook.selectedCourse
  //     );

  //     if (!selectedCourse) {
  //       return false;
  //     }

  //     const result = await uploadHook.uploadResource(
  //       user,
  //       selectedCourse,
  //       formHook.formData,
  //       formHook.files,
  //       formHook.selectedCategory,
  //       formHook.selectedType,
  //       formHook.nameOption,
  //       formHook.customName
  //     );

  //     if (result) {
  //       formHook.resetForm();
  //     }

  //     return result;
  //   };

  //   return {
  //     ...courseHook,
  //     ...formHook,
  //     ...uploadHook,
  //     handleSubmit
  //   };
  // };