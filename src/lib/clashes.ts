import { TimeTableParsedCourse, TimeTableTimeSlot, timeTableSlots } from '@/types/time-table';

export interface SlotClash {
  slot: string;
  occurrence: number; // Which occurrence of the slot (1, 2, 3, etc.)
  day: string;
  time: string;
  courses: TimeTableParsedCourse[];
  type: 'hard' | 'soft';
}

export interface VirtualTemplate {
  courseCode: string;
  courseName: string;
  currentSlots: {
    lecture: string;
    tutorial: string;
    lab: string;
  };
  scenarios: Array<{
    id: string;
    description: string;
    changes: {
      courseCode: string;
      fromSlot: string;
      toSlot: string;
      type: 'lecture' | 'tut' | 'lab';
    }[];
    resultingClashes: number;
    clashFree: boolean;
  }>;
}

export interface VirtualSchedule {
  courseCode: string;
  courseName: string;
  currentSlot: string;
  alternateSlots: Array<{
    slot: string;
    day: string;
    time: string;
    available: boolean;
    reason?: string;
  }>;
}

/**
 * Parses slot strings like "A", "B2", "C1+C2", "D2,E1" 
 */
function parseSlotString(slotStr: string): Array<{letter: string, occurrence?: number}> {
  if (!slotStr || slotStr === 'NA' || slotStr === 'TBA') {
    return [];
  }

  const slots: Array<{letter: string, occurrence?: number}> = [];
  const parts = slotStr.split(/[+,]/).map(s => s.trim());
  
  parts.forEach(part => {
    const match = part.match(/^([A-Z])(\d?)$/);
    if (match) {
      const letter = match[1];
      const occurrence = match[2] ? parseInt(match[2]) : undefined;
      slots.push({ letter, occurrence });
    }
  });

  return slots;
}

/**
 * Gets the occurrence number of a slot on a specific day/time
 */
function getSlotOccurrenceForTime(slotLetter: string, day: string, time: string): number {
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

/**
 * Gets all occurrences of a slot letter across the week
 */
function getSlotOccurrences(slotLetter: string): Array<{day: string, time: string, occurrence: number}> {
  const occurrences: Array<{day: string, time: string, occurrence: number}> = [];
  let occurrence = 0;
  
  for (const slot of timeTableSlots) {
    if (slot.slots.includes(slotLetter)) {
      occurrence++;
      occurrences.push({
        day: slot.day,
        time: slot.time,
        occurrence
      });
    }
  }
  
  return occurrences;
}

/**
 * Checks if two specific slot occurrences clash
 */
function doSlotOccurrencesClash(
  slot1: {letter: string, occurrence?: number},
  dayTime1: {day: string, time: string, occurrence: number},
  slot2: {letter: string, occurrence?: number},
  dayTime2: {day: string, time: string, occurrence: number}
): boolean {
  // Same slot letter and time/day means clash
  if (slot1.letter === slot2.letter && dayTime1.day === dayTime2.day && dayTime1.time === dayTime2.time) {
    // If either has a specific occurrence, check it
    if (slot1.occurrence !== undefined && slot2.occurrence !== undefined) {
      return slot1.occurrence === slot2.occurrence;
    }
    return true; // No specific occurrence means it's all occurrences
  }
  return false;
}

/**
 * Detects detailed clashes between selected courses, considering specific slot occurrences
 */
export function detectClashes(courses: TimeTableParsedCourse[]): SlotClash[] {
  const clashes: Map<string, SlotClash> = new Map();

  // Check each pair of courses
  for (let i = 0; i < courses.length; i++) {
    for (let j = i + 1; j < courses.length; j++) {
      const course1 = courses[i];
      const course2 = courses[j];

      // Get all slots for both courses
      const slots1 = [
        ...(parseSlotString(course1.lectureSlot).map(s => ({...s, type: 'lecture' as const, venue: course1.lectureVenue}))),
        ...(parseSlotString(course1.tutorialSlot).map(s => ({...s, type: 'tut' as const, venue: course1.tutorialVenue}))),
        ...(parseSlotString(course1.labSlot).map(s => ({...s, type: 'lab' as const, venue: course1.labVenue}))),
      ];

      const slots2 = [
        ...(parseSlotString(course2.lectureSlot).map(s => ({...s, type: 'lecture' as const, venue: course2.lectureVenue}))),
        ...(parseSlotString(course2.tutorialSlot).map(s => ({...s, type: 'tut' as const, venue: course2.tutorialVenue}))),
        ...(parseSlotString(course2.labSlot).map(s => ({...s, type: 'lab' as const, venue: course2.labVenue}))),
      ];

      // Check for clashes between slot occurrences
      slots1.forEach(slot1 => {
        const occurrences1 = getSlotOccurrences(slot1.letter);
        
        slots2.forEach(slot2 => {
          const occurrences2 = getSlotOccurrences(slot2.letter);

          // Check each occurrence
          occurrences1.forEach(occ1 => {
            occurrences2.forEach(occ2 => {
              if (doSlotOccurrencesClash(slot1, occ1, slot2, occ2)) {
                const clashKey = `${slot1.letter}-${occ1.occurrence}-${occ1.day}-${occ1.time}`;
                
                if (!clashes.has(clashKey)) {
                  clashes.set(clashKey, {
                    slot: slot1.letter,
                    occurrence: occ1.occurrence,
                    day: occ1.day,
                    time: occ1.time,
                    courses: [],
                    type: 'hard',
                  });
                }

                const clash = clashes.get(clashKey)!;
                if (!clash.courses.find(c => c.code === course1.code)) {
                  clash.courses.push(course1);
                }
                if (!clash.courses.find(c => c.code === course2.code)) {
                  clash.courses.push(course2);
                }
              }
            });
          });
        });
      });
    }
  }

  return Array.from(clashes.values()).filter(c => c.courses.length > 1);
}

/**
 * Gets all unique slots from timetable
 */
function getAllSlots(): string[] {
  const slots = new Set<string>();
  timeTableSlots.forEach(ts => {
    ts.slots.forEach(s => slots.add(s));
  });
  return Array.from(slots).sort();
}

/**
 * Generates virtual templates for clash resolution
 */
export function generateVirtualTemplates(
  clashes: SlotClash[],
  allCourses: TimeTableParsedCourse[],
  selectedCourses: TimeTableParsedCourse[]
): VirtualTemplate[] {
  const templates: VirtualTemplate[] = [];
  const processedCourses = new Set<string>();

  if (clashes.length === 0) return [];

  clashes.forEach(clash => {
    clash.courses.forEach(course => {
      if (processedCourses.has(course.code)) return;
      processedCourses.add(course.code);

      const availableSlots = getAllSlots();
      const scenarios: VirtualTemplate['scenarios'] = [];

      // Generate scenarios for each slot type
      ['lecture', 'tutorial', 'lab'].forEach((type: 'lecture' | 'tutorial' | 'lab') => {
        const slotKey = type === 'lecture' ? 'lectureSlot' : 
                        type === 'tutorial' ? 'tutorialSlot' : 'labSlot';
        const venueKey = type === 'lecture' ? 'lectureVenue' : 
                         type === 'tutorial' ? 'tutorialVenue' : 'labVenue';
        const currentSlot = course[slotKey as keyof TimeTableParsedCourse] as string;

        if (currentSlot === 'NA') return;

        availableSlots.forEach(newSlot => {
          if (currentSlot.startsWith(newSlot)) return; // Skip if already using this slot

          // Create virtual course with new slot
          const virtualCourse = {
            ...course,
            [slotKey]: newSlot,
          };

          // Check clashes with only selected courses
          const updatedCourses = selectedCourses.map(c => 
            c.code === course.code ? virtualCourse : c
          );
          
          const newClashes = detectClashes(updatedCourses);
          const scenarioId = `${course.code}-${type}-to-${newSlot}`;
          
          scenarios.push({
            id: scenarioId,
            description: `Move ${type} from ${currentSlot} to ${newSlot}`,
            changes: [{
              courseCode: course.code,
              fromSlot: currentSlot,
              toSlot: newSlot,
              type: type as 'lecture' | 'tut' | 'lab',
            }],
            resultingClashes: newClashes.length,
            clashFree: newClashes.length === 0,
          });
        });
      });

      // Sort scenarios: clash-free first, then by fewest clashes
      scenarios.sort((a, b) => {
        if (a.clashFree !== b.clashFree) return a.clashFree ? -1 : 1;
        return a.resultingClashes - b.resultingClashes;
      });

      templates.push({
        courseCode: course.code,
        courseName: course.title,
        currentSlots: {
          lecture: course.lectureSlot,
          tutorial: course.tutorialSlot,
          lab: course.labSlot,
        },
        scenarios: scenarios.slice(0, 8), // Top 8 scenarios
      });
    });
  });

  return templates;
}

/**
 * Calculates clash severity score
 */
export function calculateClashSeverity(clashes: SlotClash[]): number {
  return clashes.reduce((score, clash) => {
    return score + (clash.courses.length - 1) * (clash.type === 'hard' ? 2 : 1);
  }, 0);
}