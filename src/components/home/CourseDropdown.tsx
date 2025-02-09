// "use client"
// import React, { useState, useRef, useEffect } from 'react';
// import { Search } from 'lucide-react';
// import { Course } from '../../types/courses';
// import { useCourses } from '../../hooks/useCourses';
// import { Input } from '@/components/ui/input';
// import { Card } from '@/components/ui/card';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// const CourseDropdown = () => {
//   const router = useRouter();
//   const { courses } = useCourses();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [isFocused, setIsFocused] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const listRef = useRef<HTMLDivElement>(null);

//   const filteredCourses = courses.filter((course) =>
//     course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     course.title.toLowerCase().includes(searchQuery.toLowerCase())
//   ).slice(0, 8);

//   const handleCourseSelect = (course: Course) => {
//     setSearchQuery('');
//     setSelectedIndex(-1);
//     router.replace(`/courses/${course.code.toLowerCase()}`);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (!searchQuery) return;

//     switch (e.key) {
//       case 'ArrowDown':
//         e.preventDefault();
//         setSelectedIndex(prev => 
//           prev < filteredCourses.length - 1 ? prev + 1 : prev
//         );
//         break;
//       case 'ArrowUp':
//         e.preventDefault();
//         setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
//         break;
//       case 'Enter':
//         e.preventDefault();
//         if (selectedIndex >= 0 && filteredCourses[selectedIndex]) {
//           handleCourseSelect(filteredCourses[selectedIndex]);
//         }
//         break;
//       case 'Escape':
//         e.preventDefault();
//         setSearchQuery('');
//         setSelectedIndex(-1);
//         inputRef.current?.blur();
//         break;
//     }
//   };

//   // Scroll selected item into view
//   useEffect(() => {
//     if (selectedIndex >= 0 && listRef.current) {
//       const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
//       if (selectedElement) {
//         selectedElement.scrollIntoView({ block: 'nearest' });
//       }
//     }
//   }, [selectedIndex]);

//   // Click outside handler
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
//         setIsFocused(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const showDropdown = searchQuery && isFocused;

//   return (
//     <div className="relative w-full max-w-sm">
//       <div className="relative">
//         <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//         <Input
//           ref={inputRef}
//           type="text"
//           placeholder="Search courses..."
//           value={searchQuery}
//           onChange={(e) => {
//             setSearchQuery(e.target.value);
//             setSelectedIndex(-1);
//           }}
//           onFocus={() => setIsFocused(true)}
//           onKeyDown={handleKeyDown}
//           className="pl-8 pr-4"
//           aria-label="Search courses"
//           aria-expanded={showDropdown}
//           aria-controls="course-list"
//           aria-activedescendant={
//             selectedIndex >= 0 ? `course-${filteredCourses[selectedIndex]?.id}` : undefined
//           }
//           role="combobox"
//           aria-autocomplete="list"
//         />
//       </div>

//       {showDropdown && (
//         <Card 
//           className="absolute z-50 w-full mt-1 overflow-auto max-h-80" 
//           id="course-list"
//           role="listbox"
//         >
//           {filteredCourses.length > 0 ? (
//             <div className="divide-y divide-border" ref={listRef}>
//               {filteredCourses.map((course, index) => (
//               <Link href={`/courses/${course.id}`} >
//                 <button
//                   key={course.id}
//                   id={`course-${course.id}`}
//                   // onClick={() => handleCourseSelect(course)}
//                   // onMouseEnter={() => setSelectedIndex(index)}
//                   className={`w-full p-3 text-left hover:bg-muted focus:bg-muted focus:outline-none transition-colors
//                     ${index === selectedIndex ? 'bg-muted' : ''}`}
//                   role="option"
//                   aria-selected={index === selectedIndex}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="font-medium">{course.code}</div>
//                       <div className="text-sm text-muted-foreground truncate">
//                         {course.title}
//                       </div>
//                     </div>
//                     {index === selectedIndex && (
//                       <div className="text-xs text-muted-foreground">
//                         Press Enter to select
//                       </div>
//                     )}
//                   </div>
//                 </button>
//               </Link>
//               ))}
//             </div>
//           ) : (
//             <div className="p-3 text-center text-sm text-muted-foreground">
//               No courses found
//             </div>
//           )}
//         </Card>
//       )}
//     </div>
//   );
// };

// export default CourseDropdown;