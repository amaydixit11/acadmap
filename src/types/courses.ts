export interface CourseResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'archive' | 'link' | 'other';
  category: 'lecture' | 'tutorial' | 'assignment' | 'pyq' | 'unclassified'
  url: string;
  uploadedBy: string;
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
  description: string;
  instructor: string;
  semester: string;
  prerequisites: string;
  syllabus: string[];
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
    unclassified: CourseResource[];
  };
  rating?: {
    overall: number;
    difficulty: number;
    workload: number;
    reviews: number;
  };
}

export let demoCourse: Course = {
  id: "csl100",
  code: "CSL100",
  title: "Introduction to Computer Science",  // Placeholder for course title
  department: Department['CSE'],  // Placeholder for department
  credits: 4,  // Placeholder for number of credits
  description: "An introductory course to computer science concepts and programming.",  // Placeholder for course description
  instructor: "Dr. John Doe",  // Placeholder for instructor name
  semester: "Fall 2024",  // Placeholder for semester
  prerequisites: "None",  // Placeholder for prerequisites
  syllabus: ["loops", "functions", "objects"],  // Placeholder for syllabus
  schedule: {
    lectures: "2",
    tutorials: "1",
    labs: "3"
  },
  resources: {
    lectures: [],
    assignments: [],
    tutorials: [],
    pyq: [],
    unclassified: []
  },
  rating: {
    overall: 4.5,  // Placeholder for overall rating
    difficulty: 3,  // Placeholder for difficulty rating
    workload: 2,  // Placeholder for workload rating
    reviews: 4  // Placeholder for reviews
  }
};

export interface CourseSupabase { 
  course_code: string;
  Department: string;
  course_name: string;
  credits: number;
  distribution: string;
  description: string;
  prerequisites: string;
  overlap_with: string;
  syllabus: string;

}