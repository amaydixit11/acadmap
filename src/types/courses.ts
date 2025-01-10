export interface ResourceModel { 
  resourceId: string;
  course_code: string;
  title: string;
  type: 'document' | 'video' | 'image' | 'archive' | 'link' | 'other';
  category: 'lecture' | 'tutorial' | 'assignment' | 'pyq' | 'lab' | 'unclassified'
  url: string;
  uploadedBy: string;
  description ?: string;
  year: number;
} 
export enum Department {
  CSE = "Computer Science and Engineering",
  DSAI = "Data Science and Artificial Intelligence",
  ECE = "Electronics and Communication Engineering",
  EE = "Electrical Engineering",
  EVT = "Electric Vehicle Technology",
  ME = "Mechanical Engineering",
  MT = "Mechatronics Engineering",
  MSME = "Materials Science and Metallurgical Engineering",
  PHY = "Physics",
  MAT = "Mathematics",
  CHE = "Chemistry",
  BSBM = "Bioscience and Biomedical Engineering",
  LA = "Liberal Arts"
}
export interface Course {
  id: string;
  code: string;
  title: string;
  department: string;
  credits: number;
  prerequisites: string;
  syllabus: string[];
  schedule: {
    lectures: string;
    tutorials: string;
    labs: string;
  };
  rating: {
    overall: number;
    difficulty: number;
    workload: number;
    reviews: number;
  }
}

