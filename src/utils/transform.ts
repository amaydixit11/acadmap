// transform.ts

import { CourseModel } from "@/models/courses";
import { Course } from "@/types/courses"; // Adjust the import paths as necessary

// Helper function to transform a CourseModel object to a Course object
export function transformCourse(course: CourseModel): Course {
  // console.log("course department: ", CourseModel.Department)
    const distributionParts = course.distribution?.split('-') || ['', '', ''];
  return {
    id: course.course_code.toLowerCase(), // Assuming the ID is not available in course
    code: course.course_code,
    title: course.course_name,
    department: course.Department,
    credits: course.credits,
    prerequisites: course.prerequisites,
    syllabus: course.syllabus ? course.syllabus.split(/[;.,]/).slice(0, -1) : [], // Assuming syllabus is a string of comma-separated items
    schedule: {
        lectures: distributionParts[0], // Handle distribution safely
        tutorials: distributionParts[1],
        labs: distributionParts[2],
      },
    // resources: {
    //   lectures: [],
    //   assignments: [],
    //   labs: [],
    //   tutorials: [],
    //   pyq: [], // Empty array as no resource info is in CourseModel
    //   unclassified: []
    // },
    rating: {
      overall: 0, // Default to 0 for rating fields
      difficulty: 0,
      workload: 0,
      reviews: 0,
    },
  };
}
