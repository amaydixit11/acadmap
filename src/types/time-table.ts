import { Course } from "./courses";
export interface TimeTableParsedCourseRaw {
  'Course Code': string;
  'Course Name': string;
  'L-T-P': string;
  'Credits': string;
  'Discipline': string;
  'Program': string;
  'Slot Lecture\\Venue'?: string;
  'Tutorial Slot\\Venue'?: string;
  'Lab slot\\Venue'?: string;
  'Instructor'?: string;
}

export interface TimeTableCourse{
  code: string
  title: string
  ltp: string
  credits: Number
  discipline: string
  program: string
  lectureSlot: string
  tutorialSlot: string
  labSlot: string
  instructor: string
}
  
  export interface TimeTableCourseSlot {
    slot: string;
    venue: string;
  }
  
  export interface TimeTableParsedCourse extends TimeTableCourse {
    lectureVenue: string;
    tutorialVenue: string;
    labVenue: string;
  }
  
  export interface TimeTableTimeSlot {
    day: string;
    time: string;
    slots: string[];
  }
  
  export interface TimeTableSlotInfo {
    courseCode: string;
    venue: string;
    type: 'lecture' | 'tut' | 'lab';
  }

  export const timeTableSlots: TimeTableTimeSlot[] = [
    { day: 'Monday', time: '08:30-09:25', slots: ['A'] },
    { day: 'Monday', time: '09:30-10:25', slots: ['B', 'N'] },
    { day: 'Monday', time: '10:30-11:25', slots: ['C', 'N'] },
    { day: 'Monday', time: '11:30-12:25', slots: ['E', 'N'] },
    { day: 'Monday', time: '12:30-13:25', slots: ['G'] },
    { day: 'Monday', time: '14:30-15:25', slots: ['K', 'O'] },
    { day: 'Monday', time: '15:30-16:25', slots: ['L', 'O'] },
    { day: 'Monday', time: '16:30-17:25', slots: ['I', 'O'] },
  
    { day: 'Tuesday', time: '08:30-09:25', slots: ['B'] },
    { day: 'Tuesday', time: '09:30-10:25', slots: ['D', 'V'] },
    { day: 'Tuesday', time: '10:30-11:25', slots: ['C', 'V'] },
    { day: 'Tuesday', time: '11:30-12:25', slots: ['X', 'V'] },
    { day: 'Tuesday', time: '12:30-13:25', slots: ['H'] },
    { day: 'Tuesday', time: '14:30-15:25', slots: ['L', 'W'] },
    { day: 'Tuesday', time: '15:30-16:25', slots: ['J', 'W'] },
    { day: 'Tuesday', time: '16:30-17:25', slots: ['M', 'W'] },
  
    { day: 'Wednesday', time: '08:30-09:25', slots: ['E'] },
    { day: 'Wednesday', time: '09:30-10:25', slots: ['A', 'P'] },
    { day: 'Wednesday', time: '10:30-11:25', slots: ['D', 'P'] },
    { day: 'Wednesday', time: '11:30-12:25', slots: ['F', 'P'] },
    { day: 'Wednesday', time: '12:30-13:25', slots: ['G'] },
    { day: 'Wednesday', time: '14:30-15:25', slots: ['K', 'Q'] },
    { day: 'Wednesday', time: '15:30-16:25', slots: ['M', 'Q'] },
    { day: 'Wednesday', time: '16:30-17:25', slots: ['I', 'Q'] },
  
    { day: 'Thursday', time: '08:30-09:25', slots: ['F'] },
    { day: 'Thursday', time: '09:30-10:25', slots: ['B', 'R'] },
    { day: 'Thursday', time: '10:30-11:25', slots: ['C', 'R'] },
    { day: 'Thursday', time: '11:30-12:25', slots: ['E', 'R'] },
    { day: 'Thursday', time: '12:30-13:25', slots: ['H'] },
    { day: 'Thursday', time: '14:30-15:25', slots: ['L', 'S'] },
    { day: 'Thursday', time: '15:30-16:25', slots: ['M', 'S'] },
    { day: 'Thursday', time: '16:30-17:25', slots: ['J', 'S'] },
  
    { day: 'Friday', time: '08:30-09:25', slots: ['G'] },
    { day: 'Friday', time: '09:30-10:25', slots: ['A', 'T'] },
    { day: 'Friday', time: '10:30-11:25', slots: ['D', 'T'] },
    { day: 'Friday', time: '11:30-12:25', slots: ['F', 'T'] },
    { day: 'Friday', time: '12:30-13:25', slots: ['H'] },
    { day: 'Friday', time: '14:30-15:25', slots: ['K', 'U'] },
    { day: 'Friday', time: '15:30-16:25', slots: ['J', 'U'] },
    { day: 'Friday', time: '16:30-17:25', slots: ['I', 'U'] },
  ] as const;