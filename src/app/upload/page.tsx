// src/pages/UploadPage.tsx
"use client"
import { useState, useEffect, Suspense } from "react";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, FileText, AlertCircle, AlertTriangle, Badge, X, LogIn } from "lucide-react";

import { Course } from "@/types/courses";
import { getCourses } from "@/lib/courses";
import { createRepository, uploadFileToRepository } from "@/lib/github";

import { ResourceTypeSelector } from "@/components/resources/ResourceTypeSelector";
import { ResourceCategorySelector } from "@/components/resources/ResourceCategorySelector";
import { FileUploader } from "@/components/resources/FileUploader";
import { 
  ResourceType, 
  ResourceCategory, 
  resourceTypes, 
  resourceCategories 
} from '@/types/resource'
import { redirect, useSearchParams } from "next/navigation";
import { isUserLoggedIn } from "@/utils/ifLoggedIn";
import Link from "next/link";
import { getUserData } from "@/utils/getUserData";
import { Checkbox } from "@/components/ui/checkbox";

interface PageProps {
    user: User
}

function UploadPageContent({ user }: PageProps) {

  const searchParams = useSearchParams();

  const defaultCourseCode = searchParams.get('courseCode')?.toUpperCase() || "";
  const defaultCategory = searchParams.get('type') as ResourceCategory || "lectures";
  const defaultYear = searchParams.get('year') || new Date().getFullYear().toString();

  const [userEmail, setUserEmail] = useState("")
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>(defaultCourseCode ?? "");
  const [selectedType, setSelectedType] = useState<ResourceType>("document");
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>(defaultCategory ?? "lectures");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | null,
    message: string
  }>({ type: null, message: '' });
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: defaultYear ?? (new Date().getFullYear()).toString(),
    url: ""
  });

  useEffect(() => {
    const loadCourses = async () => {
      // console.log("loadCourses function triggered");
      try {
        // console.log("Fetching courses...");
        const fetchedCourses = await getCourses();
        // console.log("Fetched courses:", fetchedCourses);
  
        setCourses(fetchedCourses);
        // console.log("Courses set in state.");
  
        // If a course code is provided in the URL, try to set it
        if (defaultCourseCode) {
          // console.log("Default course code provided:", defaultCourseCode);
          const matchingCourse = fetchedCourses.find(
            course => course.code === defaultCourseCode
          );
          // console.log("Matching course found:", matchingCourse);
  
          if (matchingCourse) {
            setSelectedCourse(matchingCourse.id);
            // console.log("Selected course set:", matchingCourse.id);
          } else {
            console.warn("No matching course found for code:", defaultCourseCode);
          }
        }
      } catch (error) {
        console.error("Error loading courses:", error);
        setUploadStatus({
          type: 'error',
          message: 'Failed to load courses. Please try again.'
        });
      }
    };
  
    // console.log("useEffect triggered. defaultCourseCode:", defaultCourseCode);
    loadCourses();
  }, [defaultCourseCode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      
      // Validate file size (10MB max)
      const validFiles = selectedFiles.filter(file => file.size <= 100 * 1024 * 1024);
      if (validFiles.length !== selectedFiles.length) {
        setUploadStatus({
          type: 'error',
          message: 'Some files exceed the 100MB size limit and were not added.'
        });
      }
      
      setFiles(validFiles);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };
  function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const binary = new Uint8Array(buffer);
    let base64 = '';
    const chunkSize = 8192; // Process in smaller chunks to avoid memory issues

    for (let i = 0; i < binary.length; i += chunkSize) {
        base64 += String.fromCharCode(...binary.subarray(i, i + chunkSize));
    }

    return btoa(base64);
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!selectedCourse) {
      setUploadStatus({
        type: 'error',
        message: 'Please select a course.'
      });
      return;
    }
    setIsSubmitting(true);
    setUploadStatus({ type: null, message: '' });

    try {
      const course = courses.find(c => c.id === selectedCourse);
      if (!course) throw new Error('Course not found');

      // Repository name format: courseCode-year
      const repoName = `${course.code}-${formData.year}`;

      // Attempt to create repository (will not throw if it already exists)
      try {
        await createRepository(repoName, `Course materials for ${course.title} - ${formData.year}`);
      } catch (repoError) {
        console.warn('Repository might already exist:', repoError);
      }

      // Upload logic based on resource type
      if (selectedType === 'link') {
        // Upload link as a markdown file
        await uploadFileToRepository(
          repoName, 
          `${selectedCategory}/${formData.title}.md`, 
          `# ${formData.title}

## Description
${formData.description}

## Resource Link
${formData.url}`,
          `Add ${selectedType} resource: ${formData.title} (Uploaded by ${userEmail})`
        );
      } else {
        // Upload files
        for (const file of files) {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
      
          await new Promise<void>((resolve, reject) => {
              reader.onload = async () => {
                  try {
                      // Convert ArrayBuffer to Base64
                      const base64Content = arrayBufferToBase64(reader.result as ArrayBuffer);
      
                      await uploadFileToRepository(
                          repoName,
                          `${selectedCategory}/${file.name}`,
                          base64Content,
                          `Add ${selectedType} resource: ${formData.title} (Uploaded by ${userEmail})`
                      );
                      resolve();
                  } catch (uploadError) {
                      reject(uploadError);
                  }
              };
      
              reader.onerror = () => reject(new Error('File reading failed'));
          });
        }
      }

      // Success handling
      setUploadStatus({
        type: 'success',
        message: 'Resources uploaded successfully to GitHub!'
      });

      // Reset form
      setFormData({ title: "", description: "", year: (new Date().getFullYear()).toString(), url: "" });
      setFiles([]);
      setSelectedType('document');
      setSelectedCategory('lectures');
      setUserEmail("");
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred.'
      });
    } finally {
      setIsSubmitting(false);
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
        <div className="container mx-auto px-4 py-8 max-w-4xl">

        {uploadStatus.type && (
          <Alert variant={uploadStatus.type === 'success' ? 'default' : 'destructive'}>
            {uploadStatus.type === 'success' ? (
              <FileText className="h-5 w-5 text-green-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-600" />
            )}
            <AlertTitle>{uploadStatus.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
            <AlertDescription>{uploadStatus.message}</AlertDescription>
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select 
                    value={selectedCourse} 
                    onValueChange={setSelectedCourse}
                  >
                    <SelectTrigger>
                    <SelectValue 
                      placeholder={
                        defaultCourseCode !== "" 
                          ? `${courses.find(course => course.code.toLowerCase() === defaultCourseCode.toLowerCase())?.code} - ${courses.find(course =>  course.code.toLowerCase() === defaultCourseCode.toLowerCase())?.title}` 
                          : "Select course"
                      } 
                    />

                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.code} - {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Your Email Address</Label>
                  {/* <Input 
                    type="email"
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  /> */}
                  <div>
                    <Checkbox
                      id="userName"
                      onCheckedChange={() => {}}
                    />
                </div>
                </div>

              </div>

              <ResourceCategorySelector 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              <ResourceTypeSelector 
                selectedType={selectedType}
                onTypeChange={setSelectedType}
              />

              <div className="space-y-2">
                <Label htmlFor="title">Resource Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Week 1 Lecture Notes"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Briefly describe what's included in these materials..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Academic Year</Label>
                <Input 
                  type="number"
                  value={formData.year}
                  onChange={e => setFormData({...formData, year: parseInt(e.target.value).toString()})}
                  min={2000}
                  max={new Date().getFullYear()}
                />
              </div>

              {selectedType === 'link' ? (
                <div className="space-y-2">
                  <Label htmlFor="url">Resource URL</Label>
                  <Input
                    id="url"
                    type="url"
                    value={formData.url}
                    onChange={e => setFormData({...formData, url: e.target.value})}
                    placeholder="https://"
                    required
                  />
                </div>
              ) : (
                <FileUploader 
                  resourceType={selectedType}
                  onFilesChange={setFiles}
                />
              )}

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
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Resource
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
        </div>
      </div>
    </div>

  );
}

export default function UploadPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({} as User)
  useEffect(() => {
    const checkLoginStatus = async () => {
      const data = await getUserData();
      const user = data?.user;
      if (user) setUser(user)
      setLoggedIn(!!user);
    };

    checkLoginStatus();
  }, []);

  if (loggedIn != true) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <LogIn className="h-6 w-6" />
              Login Required
            </CardTitle>
            <CardDescription>
              Please log in to upload course resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href='/sign-in'>
              <Button className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                Log In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UploadPageContent user = {user}/>
    </Suspense>
  );
}