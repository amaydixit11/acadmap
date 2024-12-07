export interface CourseResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link';
  url: string;
  uploadedBy: string;
  uploadDate: string;
  description?: string; // Optional field for description
}

export interface Course {
  id: string;
  code: string;
  title: string;
  department: string;
  credits: number;
  description: string;
  instructor: string;
  semester: string;
  prerequisites: string;
  syllabus: string[]
  schedule: {
    lectures: string;
    tutorials: string;
    labs: string;
  };
  resources: {
    lectures: CourseResource[];
    assignments: CourseResource[];
    tutorials: CourseResource[];
    pyq: CourseResource[]; // Previous Year Questions
  };
  rating?: {
    overall: number;
    difficulty: number;
    workload: number;
    reviews: number;
  };
}

export interface CourseSupabase { 
  course_code: string;
  department: string;
  course_name: string;
  credits: number;
  distribution: string;
  description: string;
  prerequisites: string;
  overlap_with: string;
  syllabus: string;

}