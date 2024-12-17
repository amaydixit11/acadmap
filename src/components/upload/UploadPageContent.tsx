"use client"
import React from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UploadStatusAlert } from './UploadStatusAlerts';
import { NameSelection } from './NameSelection';
import { ResourceCategorySelector } from './ResourceCategorySelector';
import { ResourceTypeSelector } from './ResourceTypeSelector';
import { ResourceCategory } from '@/types/resource';
import ResourceData from './ResourceData';
import CourseSelection from './CourseSelection';
import UploadButton from './UploadButton';
import { UploadProvider, useUploadContext } from '@/context/UploadContext';

interface UploadFormProps {
  user: User;
}

const UploadForm = ({ user }: UploadFormProps) => {
  const { addToast } = useToast();
  const {
    coursesError,
    isSubmitting,
    uploadStatus,
    handleSubmit,
    resetForm
  } = useUploadContext();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleSubmit();

    if (result) {
      addToast({ 
        id: Date.now().toString(), 
        message: 'Upload successful!', 
        type: 'success' 
      });
      resetForm();
    } else {
      addToast({ 
        id: Date.now().toString(), 
        message: uploadStatus.message || 'Upload failed. Try again.', 
        type: 'error' 
      });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Share Course Resources
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Contribute to our knowledge base by sharing your course materials with future students
          </p>
        </div>

        <UploadStatusAlert uploadStatus={uploadStatus} />

        {coursesError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{coursesError}</AlertDescription>
          </Alert>
        )}

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Resource Upload
            </CardTitle>
            <CardDescription>
              Fill in the details below to share your course materials
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={onSubmitHandler} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CourseSelection />
                <NameSelection user={user} />
              </div>
              <ResourceCategorySelector />
              <ResourceTypeSelector />
              <ResourceData />

              <Alert variant="default">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  By uploading materials, you confirm that you have the right to share these resources
                  and agree to our content sharing guidelines.
                </AlertDescription>
              </Alert>
            </form>
          </CardContent>

          <CardFooter className="bg-secondary/10 flex flex-col sm:flex-row sm:justify-end gap-4">
            <UploadButton 
              isDisabled={isSubmitting}
              onClick={onSubmitHandler}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

interface UploadPageContentProps {
  user: User;
}

export function UploadPageContent({ user }: UploadPageContentProps) {
  const searchParams = useSearchParams();
  const defaultCourseCode = searchParams.get('courseCode')?.toUpperCase() || '';
  const defaultCategory = searchParams.get('type') as ResourceCategory || 'unclassified';

  return (
    <UploadProvider 
      user={user}
      defaultCategory={defaultCategory}
      defaultCourseCode={defaultCourseCode}
    >
      <UploadForm user={user} />
    </UploadProvider>
  );
}