// context/UploadContext.tsx
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { ResourceCategory } from '@/types/resource';
import { getCourses } from '@/lib/courses';
import { useUploadState } from '@/hooks/useUploadState';
import { useUploadActions } from '@/hooks/useUploadActions';
import { UploadContextProps } from '@/types/uploadContext';
import { createRepository } from '@/lib/github';

const UploadContext = createContext<UploadContextProps | undefined>(undefined);

interface UploadProviderProps {
  user: User;
  defaultCourseCode?: string;
  defaultCategory?: ResourceCategory;
  children: ReactNode;
}

export const UploadProvider: React.FC<UploadProviderProps> = ({
  user,
  defaultCourseCode,
  defaultCategory = 'lecture',
  children,
}) => {
  const [state, setState] = useUploadState(defaultCategory);
  const actions = useUploadActions(user, state, setState);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const fetchedCourses = await getCourses();
        const matchingCourse = defaultCourseCode
          ? fetchedCourses.find(
              course => course.code.toLowerCase() === defaultCourseCode.toLowerCase()
            )
          : null;

        setState(prev => ({
          ...prev,
          courses: fetchedCourses,
          selectedCourse: matchingCourse?.id || '',
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          coursesError: 'Failed to load courses. Please try again.'
        }));
      }
    };

    loadCourses();
  }, [defaultCourseCode, setState]);

  const handleSubmit = async (): Promise<boolean> => {
    const selectedCourseData = state.courses.find(c => c.id === state.selectedCourse);
    
    if (!selectedCourseData) {
      setState(prev => ({
        ...prev,
        uploadStatus: { type: 'error', message: 'Please select a course.' }
      }));
      return false;
    }

    setState(prev => ({
      ...prev,
      isSubmitting: true,
      uploadStatus: { type: null, message: '' }
    }));

    try {
      const repoName = `${selectedCourseData.code}-${state.formData.year}`;
      
      try {
        await createRepository(
          repoName,
          `Course materials for ${selectedCourseData.title} - ${state.formData.year}`
        );
      } catch (error) {
        console.log('Repository might already exist:', error);
      }

      await actions.handleUpload(repoName);

      setState(prev => ({
        ...prev,
        uploadStatus: {
          type: 'success',
          message: 'Resources uploaded successfully to GitHub!'
        }
      }));

      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        uploadStatus: {
          type: 'error',
          message: error?.toString() || 'An unexpected error occurred.'
        }
      }));
      return false;
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <UploadContext.Provider value={{ ...state, ...actions, handleSubmit }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUploadContext must be used within an UploadProvider');
  }
  return context;
};