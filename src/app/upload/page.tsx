"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  AlertCircle, 
  Book, 
  FileQuestion, 
  Video,
  Link as LinkIcon,
  File,
  Pencil,
  GraduationCap
} from "lucide-react";
import { Course, Department, CourseResource } from "@/models/courses";
import { fetchCourses, getCourses } from "@/lib/courses";

const resourceTypes = {
  pdf: { label: "PDF Document", icon: FileText, color: "text-red-500" },
  video: { label: "Video Content", icon: Video, color: "text-blue-500" },
  link: { label: "External Link", icon: LinkIcon, color: "text-green-500" },
  archive: { label: "Archive File", icon: File, color: "text-purple-500" },
  other: { label: "Other Resource", icon: File, color: "text-gray-500" }
};

const resourceCategories = {
  lectures: { label: "Lecture Materials", icon: Book },
  assignments: { label: "Assignment Resources", icon: Pencil },
  tutorials: { label: "Tutorial Content", icon: GraduationCap },
  pyq: { label: "Previous Year Questions", icon: FileQuestion }
};

export default function UploadPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedType, setSelectedType] = useState<keyof typeof resourceTypes>("pdf");
  const [selectedCategory, setSelectedCategory] = useState<keyof Course["resources"]>("lectures");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear(),
    url: ""
  });

  useEffect(() => {
    const loadCourses = async () => {
      const fetchedCourses = await getCourses();
      setCourses(fetchedCourses);
    };
    loadCourses();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      // Reset form
      setFormData({ title: "", description: "", year: new Date().getFullYear(), url: "" });
      setFiles([]);
    } catch (error) {
      console.error("Upload error:", error);
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

        {showSuccess && (
          <Alert className="bg-green-50 border-green-200">
            <FileText className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-700">Upload Successful</AlertTitle>
            <AlertDescription className="text-green-600">
              Your materials have been uploaded and will be reviewed shortly. Thank you for contributing!
            </AlertDescription>
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
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Resource Details</TabsTrigger>
                  <TabsTrigger value="upload">Upload Files</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="course">Course</Label>
                      <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
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
                      <Label htmlFor="year">Academic Year</Label>
                      <Input 
                        type="number"
                        value={formData.year}
                        onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
                        min={2000}
                        max={new Date().getFullYear()}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Resource Category</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {Object.entries(resourceCategories).map(([key, value]) => {
                        const Icon = value.icon;
                        return (
                          <Button
                            key={key}
                            type="button"
                            variant={selectedCategory === key ? "default" : "outline"}
                            className="h-24 flex flex-col gap-2"
                            onClick={() => setSelectedCategory(key as keyof Course["resources"])}
                          >
                            <Icon className="h-6 w-6" />
                            <span className="text-sm">{value.label}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Resource Type</Label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {Object.entries(resourceTypes).map(([key, value]) => {
                        const Icon = value.icon;
                        return (
                          <Button
                            key={key}
                            type="button"
                            variant={selectedType === key ? "default" : "outline"}
                            className="h-20 flex flex-col gap-2"
                            onClick={() => setSelectedType(key as keyof typeof resourceTypes)}
                          >
                            <Icon className={`h-5 w-5 ${value.color}`} />
                            <span className="text-xs">{value.label}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

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
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
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
                    <div className="space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <input
                          type="file"
                          id="file-upload"
                          className="hidden"
                          onChange={handleFileChange}
                          multiple
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer space-y-4 block"
                        >
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                          <div className="space-y-2">
                            <h3 className="font-medium">Drop files here or click to browse</h3>
                            <p className="text-sm text-muted-foreground">
                              Maximum file size: 10MB
                            </p>
                          </div>
                        </label>
                      </div>

                      {files.length > 0 && (
                        <div className="space-y-2">
                          <Label>Selected Files</Label>
                          <div className="space-y-2">
                            {files.map((file, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-md">
                                <FileText className="h-4 w-4" />
                                <span className="text-sm flex-1">{file.name}</span>
                                <Badge variant="secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <Alert>
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
  );
}