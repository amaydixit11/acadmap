export interface CourseEntry {
  code: string;
  name: string;
  ltpc: string;
  category: string;
  credits: number;
}

export interface SemesterCurriculum {
  semester: number | string; // 1-8 or "I"-"VIII" 
  courses: CourseEntry[];
  totalCredits: number;
}

export interface BranchCurriculum {
  branch: string;
  degree: 'BTech' | 'MSc' | 'MTech' | 'PhD';
  semesters: SemesterCurriculum[];
}
