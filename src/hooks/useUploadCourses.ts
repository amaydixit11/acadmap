// // src/hooks/useUploadCourses.ts
// import { useState, useEffect } from 'react';
// import { Course } from '@/types/courses';
// import { getCourses } from '@/lib/courses';
// import { useCourses } from './useCourses';

// export const useUploadCourses = (defaultCourseCode?: string) => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [coursesError, setCoursesError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadCourses = async () => {
//       try {
//         const fetchedCourses = await getCourses();  
//         setCourses(fetchedCourses);

//         if (defaultCourseCode) {
//           const matchingCourse = fetchedCourses.find(
//             course => course.code.toLowerCase() === defaultCourseCode.toLowerCase()
//           );
//           if (matchingCourse) {
//             setSelectedCourse(matchingCourse.id);
//           }
//         }
//       } catch (error) {
//         setCoursesError('Failed to load courses. Please try again.');
//       }
//     };

//     loadCourses();
//   }, [defaultCourseCode]);

//   return {
//     courses,
//     selectedCourse,
//     setSelectedCourse,
//     coursesError
//   };
// };