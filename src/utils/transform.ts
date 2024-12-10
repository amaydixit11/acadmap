// transform.ts

import { CourseSupabase, Course } from "@/models/courses"; // Adjust the import paths as necessary

// Helper function to transform a CourseSupabase object to a Course object
export function transformCourse(courseSupabase: CourseSupabase): Course {
  console.log("course department: ", courseSupabase.Department)
    const distributionParts = courseSupabase.distribution?.split('-') || ['', '', ''];
  return {
    id: courseSupabase.course_code.toLowerCase(), // Assuming the ID is not available in CourseSupabase
    code: courseSupabase.course_code,
    title: courseSupabase.course_name,
    department: courseSupabase.Department,
    credits: courseSupabase.credits,
    description: courseSupabase.description,
    instructor: 'Dr. Amay Dixit', // Placeholder as no instructor is present in CourseSupabase
    semester: '1', // Placeholder for semester
    prerequisites: courseSupabase.prerequisites,
    syllabus: courseSupabase.syllabus ? courseSupabase.syllabus.split(/[;.]/).slice(0, -1) : [], // Assuming syllabus is a string of comma-separated items
    schedule: {
        lectures: distributionParts[0], // Handle distribution safely
        tutorials: distributionParts[1],
        labs: distributionParts[2],
      },
    resources: {
      lectures: [],
      assignments: [],
      tutorials: [],
      pyq: [], // Empty array as no resource info is in CourseSupabase
    },
    rating: {
      overall: 0, // Default to 0 for rating fields
      difficulty: 0,
      workload: 0,
      reviews: 0,
    },
  };
}
