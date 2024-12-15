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

export let demoCourse: Course = {
  id: "csl100",
  code: "CSL100",
  title: "Introduction to Computer Science",  // Placeholder for course title
  department: Department['CSE'],  // Placeholder for department
  credits: 4,  // Placeholder for number of credits
  prerequisites: "None",  // Placeholder for prerequisites
  syllabus: ["loops", "functions", "objects"],  // Placeholder for syllabus
  schedule: {
    lectures: "2",
    tutorials: "1",
    labs: "3"
  },
  // resources: {
  //   lectures: [],
  //   assignments: [],
  //   labs: []
  //   tutorials: [],
  //   pyq: [],
  //   unclassified: []
  // },
  rating: {
    overall: 4.5,  // Placeholder for overall rating
    difficulty: 3,  // Placeholder for difficulty rating
    workload: 2,  // Placeholder for workload rating
    reviews: 4  // Placeholder for reviews
  }
};
