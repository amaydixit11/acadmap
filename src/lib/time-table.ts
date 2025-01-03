import { TimeTableParsedCourse, TimeTableSlotInfo, timeTableSlots } from '@/types/time-table';
import Papa from 'papaparse';

interface ParsedSlot {
  letter: string;
  numbers: number[];
}

export function parseSlotString(slotStr: string): ParsedSlot[] {  
  if (!slotStr || slotStr === 'NA' || slotStr === 'TBA') {    
    return [];
  }

  const slotStrings = slotStr.match(/[A-Z]\d{0,2}/g) || [];
  const parsedSlots = slotStrings.map(slot => {    
    const match = slot.match(/^([A-Z])(\d{1,2})?$/);
    if (!match) {      
      return null;
    }

    const [, letter, numberStr] = match;
    if (!numberStr) {      
      return { letter, numbers: [1, 2, 3] };
    }

    if (numberStr.length === 1) {      
      return { letter, numbers: [parseInt(numberStr)] };
    }
    
    return {
      letter,
      numbers: [parseInt(numberStr[0]), parseInt(numberStr[1])]
    };
  }).filter((slot): slot is ParsedSlot => slot !== null);
  
  return parsedSlots;
}

export function getSlotOccurrenceNumber(day: string, time: string, slotLetter: string): number {
  let occurrence = 0;
  for (const slot of timeTableSlots) {
    if (slot.slots.includes(slotLetter)) {
      occurrence++;      
      if (slot.day === day && slot.time === time) {
        return occurrence;
      }
    }
  }
  return 0;
}
export function getCoursesForSlot(
  day: string,
  time: string,
  selectedCourses: TimeTableParsedCourse[]
): TimeTableSlotInfo[] {
  const slot = timeTableSlots.find(s => s.day === day && s.time === time);
  if (!slot) {
    return [];
  }

  
  const coursesInSlot: TimeTableSlotInfo[] = [];
  // const slotLetter = slot.slots[0];
  for (const slotLetter of slot.slots){
    const occurrenceNumber = getSlotOccurrenceNumber(day, time, slotLetter);

    selectedCourses.forEach(course => {
      const checkSlot = (slotStr: string, venue: string, type: 'lecture' | 'tut' | 'lab') => {
        const parsedSlots = parseSlotString(slotStr);
        for (const parsedSlot of parsedSlots) {
          if (
            parsedSlot.letter === slotLetter &&
            (parsedSlot.numbers.includes(occurrenceNumber) || slotStr === slotLetter)
          ) {coursesInSlot.push({ courseCode: course.courseCode, venue: venue, type: type });
            break;
          }
        }
      };

      // Check all types of slots
      checkSlot(course.lectureSlot, course.lectureVenue, 'lecture');
      checkSlot(course.tutorialSlot, course.tutorialVenue, 'tut');
      checkSlot(course.labSlot, course.labVenue, 'lab');
    });
      }
  return coursesInSlot;
}


export const parseCSV = (file: File): Promise<TimeTableParsedCourse[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const courses: TimeTableParsedCourse[] = results.data.map((row: any) => {
          const [lectureSlot, lectureVenue] = row['Slot Lecture\\Venue']?.split('\\') || ['NA', 'NA'];
          const [tutorialSlot, tutorialVenue] = row['Tutorial Slot\\Venue']?.split('\\') || ['NA', 'NA'];
          const [labSlot, labVenue] = row['Lab slot\\Venue']?.split('\\') || ['NA', 'NA'];

          return {
            courseCode: row['Course Code'],
            courseName: row['Course Name'],
            ltp: row['L-T-P'],
            credits: parseInt(row['Credits']),
            discipline: row['Discipline'],
            program: row['Program'],
            lectureSlot,
            tutorialSlot,
            labSlot,
            instructor: row['Instructor'],
            lectureVenue,
            tutorialVenue,
            labVenue
          };
        });
        resolve(courses);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};