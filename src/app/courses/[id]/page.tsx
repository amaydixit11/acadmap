// src/app/courses/[id]/page.tsx

import { Course } from '@/models/courses';
import CoursePage from './CoursePage';
import { getCourses } from '@/lib/courses';

export default async function CoursePageWrapper({ params }: { params: { id: string } }) {
  try {
    // Fetching courses directly inside the async function
    const fetchedCourses = await getCourses();

    // Find the course with the given ID
    const course = fetchedCourses.find((course) => course.id === params.id) || null;

    // Handle course not found
    if (!course) {
      return <p>Course not found.</p>;
    }

    // Return the CoursePage component with the fetched course
    return <CoursePage course={course} />;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return <p>Error fetching course data.</p>;
  }
}
