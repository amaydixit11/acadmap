/**
 * Calculates the current academic semester based on graduation year and program.
 * 
 * Logic:
 * - mid-Dec to May: Even sem
 * - July to mid-Dec: Odd sem
 * - June: Summer break (returns 0 or null)
 * 
 * @param graduationYear The year the student will graduate
 * @param program The degree program (BTech, MSc, MTech, PhD)
 * @param currentDate The current date (defaults to today)
 * @returns The semester number (1-8) or 0 if in summer break
 */
export function calculateCurrentSemester(
  graduationYear: number,
  program: string,
  currentDate: Date = new Date()
): number {
  const month = currentDate.getMonth(); // 0-indexed (0 = Jan, 11 = Dec)
  const year = currentDate.getFullYear();
  
  let programDuration = 4; // Default BTech
  if (program === 'MSc' || program === 'MTech') {
    programDuration = 2;
  } else if (program === 'PhD') {
    programDuration = 5; // Assumption
  }

  const startYear = graduationYear - programDuration;
  const yearsSinceStart = year - startYear;
  
  // Determine if it's the first or second half of the academic year
  // Academic year typically starts in July (Sem 1, 3, 5, 7)
  // Second half starts in Jan/Feb (Sem 2, 4, 6, 8)
  
  let semester = 0;
  
  if (month >= 6 && month <= 11) {
    // July to Dec: Odd semester (1, 3, 5, 7)
    semester = (yearsSinceStart * 2) + 1;
  } else if (month <= 4) {
    // Jan to May: Even semester (2, 4, 6, 8)
    // We are in the calendar year following the start of the academic year
    semester = (yearsSinceStart * 2);
  } else if (month === 11 && currentDate.getDate() > 15) {
      // Mid-Dec to end of Dec: technically start of even sem prep or break
      // But user said mid-dec to may is even
      semester = (yearsSinceStart * 2);
  } else if (month === 5) {
    // June: Summer break
    return 0;
  }

  // Boundary check
  const maxSem = programDuration * 2;
  if (semester < 1) return 1;
  if (semester > maxSem) return maxSem;

  return semester;
}
