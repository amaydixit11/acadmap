import React from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { useSearchParams } from 'next/navigation';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { useUploadCourses } from '@/hooks/useUploadCourses';
import { useUploadForm } from '@/hooks/useUploadForm';
import { useResourceUpload } from '@/hooks/useResourceUpload';
import { UploadStatusAlert } from './UploadStatusAlerts';
import { NameSelection } from './NameSelection';
import { ResourceCategorySelector } from './ResourceCategorySelector';
import { ResourceTypeSelector } from './ResourceTypeSelector';
import { ResourceCategory} from '@/types/resource';
import ResourceData from './ResourceData';
import CourseSelection from './CourseSelection';
import UploadButton from './UploadButton';

interface UploadPageContentProps {
  user: User;
}

export function UploadPageContent({ user }: UploadPageContentProps) {
  const searchParams = useSearchParams();
  const defaultCourseCode = searchParams.get('courseCode')?.toUpperCase() || '';
  const defaultCategory = searchParams.get('type') as ResourceCategory || 'unclassified';

  const {
    courses,
    selectedCourse,
    setSelectedCourse,
    coursesError
  } = useUploadCourses(defaultCourseCode);

  const {
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
  } = useUploadForm(defaultCategory);

  const {
    isSubmitting,
    uploadStatus,
    uploadResource
  } = useResourceUpload();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCourseDetails = courses.find(c => c.id === selectedCourse);
    
    if (!selectedCourseDetails) {
      return;
    }

    const result = await uploadResource(
      user,
      selectedCourseDetails,
      formData,
      files,
      selectedCategory,
      selectedType,
      nameOption,
      customName
    );

    if (result) {
      resetForm();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">Share Course Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
              <div className="grid grid-cols-2 gap-4">
                <CourseSelection 
                  courses={courses}
                  value={selectedCourse}
                  onValueChange={setSelectedCourse}
                />

                <NameSelection
                  user={user}
                  selectedOption={nameOption}
                  customName={customName}
                  onOptionChange={setNameOption}
                  onCustomNameChange={setCustomName}
                />
              </div>

              <ResourceCategorySelector 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              <ResourceTypeSelector 
                selectedType={selectedType}
                onTypeChange={setSelectedType}
              />

              <ResourceData 
                 formData={formData}
                 onFilesChange={setFiles}
                 selectedType={selectedType}
                 updateFormData={updateFormData}
              />

              <Alert variant="default">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  By uploading materials, you confirm that you have the right to share these resources
                  and agree to our content sharing guidelines.
                </AlertDescription>
              </Alert>
            </form>
          </CardContent>

          <CardFooter className="bg-secondary/10">
            <UploadButton 
              isDisabled={isSubmitting}
              onClick={onSubmitHandler}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}