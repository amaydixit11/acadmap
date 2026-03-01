import { BranchCurriculum } from "@/types/curriculum";
import { Department } from "@/types/courses";

export const curriculumData: BranchCurriculum[] = [
  {
    branch: Department.CSE,
    degree: 'BTech',
    semesters: [
      {
        semester: 1,
        totalCredits: 18,
        courses: [
          { code: "CSL100", name: "Introduction to programming", ltpc: "2-1-3-4.5", category: "IC", credits: 4.5 },
          { code: "CYP102/PHP102", name: "Chemistry lab/ Physics lab", ltpc: "0-0-3-1.5", category: "IC", credits: 1.5 },
          { code: "MAL100", name: "Mathematics-I", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "CYL100", name: "Applied Chemistry", ltpc: "3-0-0-3", category: "IC", credits: 3 },
          { code: "PHL101", name: "Physics for Engineers", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "CYL101", name: "Environmental Science", ltpc: "1-0-0-1", category: "IC", credits: 1 },
          { code: "NCN100", name: "Practices for Comprehensive wellbeing", ltpc: "-", category: "NC", credits: 0 }
        ]
      },
      {
        semester: 2,
        totalCredits: 19.5,
        courses: [
          { code: "MEP102", name: "Digital fabrication", ltpc: "1-0.5-3-3", category: "IC", credits: 3 },
          { code: "EEL101", name: "Basic Electrical Engineering", ltpc: "3-0-2-4", category: "IC", credits: 4 },
          { code: "PHP102/CYP102", name: "Physics lab/ Chemistry lab", ltpc: "0-0-3-1.5", category: "IC", credits: 1.5 },
          { code: "MAL101", name: "Mathematics-II", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "ECL101", name: "Basic Electronics Engineering", ltpc: "3-0-2-4", category: "IC", credits: 4 },
          { code: "BML101", name: "Biology for Engineers", ltpc: "3-0-0-3", category: "IC", credits: 3 },
          { code: "LAN103", name: "Professional Ethics", ltpc: "-", category: "NC", credits: 0 }
        ]
      },
      {
        semester: 3,
        totalCredits: 19,
        courses: [
          { code: "MAL403", name: "Probability and Statistics", ltpc: "3-1-0-4", category: "PL", credits: 4 },
          { code: "CSL201", name: "Discrete Mathematics", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "CSL202", name: "Data Structures", ltpc: "2-1-2-4", category: "PC", credits: 4 },
          { code: "CSP203", name: "Software Tool & Technologies Lab", ltpc: "1-0-4-3", category: "PC", credits: 3 },
          { code: "LAL100", name: "Introduction to Communication Skills", ltpc: "1-1-0-2", category: "IC", credits: 2 },
          { code: "LAXXX", name: "LA Courses", ltpc: "X-X-X-2", category: "LA", credits: 2 }
        ]
      },
      {
        semester: 4,
        totalCredits: 17,
        courses: [
          { code: "CSL251", name: "Computer Organization and Architecture", ltpc: "3-0-2-4", category: "PC", credits: 4 },
          { code: "CSL252", name: "Design and Analysis of Algorithms", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "CSL253", name: "Theory of Computation", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "LAL101", name: "Introduction to Finance", ltpc: "1-0-0-1", category: "IC", credits: 1 },
          { code: "LAXXX", name: "LA Courses", ltpc: "X-X-X-4", category: "LA", credits: 4 }
        ]
      },
      {
        semester: 5,
        totalCredits: 18,
        courses: [
          { code: "CSL301", name: "Operating Systems", ltpc: "3-0-2-4", category: "PC", credits: 4 },
          { code: "CSL302", name: "Compiler Design", ltpc: "3-0-2-4", category: "PC", credits: 4 },
          { code: "CSL303", name: "Database Management Systems", ltpc: "3-0-2-4", category: "PC", credits: 4 },
          { code: "CSL304", name: "Artificial Intelligence", ltpc: "3-0-2-4", category: "PC", credits: 4 },
          { code: "LAXXX", name: "LA Courses", ltpc: "X-X-X-2", category: "LA", credits: 2 }
        ]
      },
      {
        semester: 6,
        totalCredits: 18,
        courses: [
          { code: "CSL351", name: "Computer Networks", ltpc: "3-0-2-4", category: "PC", credits: 4 },
          { code: "CSLXXX", name: "Program Elective", ltpc: "X-X-X-6", category: "PE", credits: 6 },
          { code: "CSLXXX", name: "Open Elective", ltpc: "X-X-X-3", category: "OE", credits: 3 },
          { code: "UGQ301", name: "Interdisciplinary Undergraduate Project", ltpc: "0-0-6-3", category: "PC", credits: 3 },
          { code: "LAXXX", name: "LA Courses", ltpc: "X-X-X-2", category: "LA", credits: 2 }
        ]
      },
      {
        semester: 7,
        totalCredits: 17.5,
        courses: [
          { code: "CSQ401", name: "BTech Project-I", ltpc: "0-0-6-3", category: "PC", credits: 3 },
          { code: "CSLXXX", name: "Program Elective", ltpc: "X-X-X-8.5", category: "PE", credits: 8.5 },
          { code: "CSLXXX", name: "Open Elective", ltpc: "X-X-X-6", category: "OE", credits: 6 }
        ]
      },
      {
        semester: 8,
        totalCredits: 17,
        courses: [
          { code: "CSQ402", name: "BTech Project-II", ltpc: "0-0-6-3", category: "PC", credits: 3 },
          { code: "CSLXXX", name: "Program Elective", ltpc: "X-X-X-8", category: "PE", credits: 8 },
          { code: "CSLXXX", name: "Open Elective", ltpc: "X-X-X-6", category: "OE", credits: 6 }
        ]
      }
    ]
  },
  {
    branch: Department.DSAI,
    degree: 'BTech',
    semesters: [
      {
        semester: 1,
        totalCredits: 18,
        courses: [
          { code: "CSL100", name: "Introduction to programming", ltpc: "2-1-3-4.5", category: "IC", credits: 4.5 },
          { code: "CYP102/PHP102", name: "Chemistry lab/ Physics lab", ltpc: "0-0-3-1.5", category: "IC", credits: 1.5 },
          { code: "MAL100", name: "Mathematics-I", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "CYL100", name: "Applied Chemistry", ltpc: "3-0-0-3", category: "IC", credits: 3 },
          { code: "PHL101", name: "Physics for Engineers", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "CYL101", name: "Environmental Science", ltpc: "1-0-0-1", category: "IC", credits: 1 },
          { code: "NCN100", name: "Practices for Comprehensive wellbeing", ltpc: "-", category: "NC", credits: 0 }
        ]
      },
      {
        semester: 2,
        totalCredits: 19.5,
        courses: [
          { code: "MEP102", name: "Digital fabrication", ltpc: "1-0.5-3-3", category: "IC", credits: 3 },
          { code: "EEL101", name: "Basic Electrical Engineering", ltpc: "3-0-2-4", category: "IC", credits: 4 },
          { code: "PHP102/CYP102", name: "Physics lab/ Chemistry lab", ltpc: "0-0-3-1.5", category: "IC", credits: 1.5 },
          { code: "MAL101", name: "Mathematics-II", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "ECL101", name: "Basic Electronics Engineering", ltpc: "3-0-2-4", category: "IC", credits: 4 },
          { code: "BML101", name: "Biology for Engineers", ltpc: "3-0-0-3", category: "IC", credits: 3 },
          { code: "LAN103", name: "Professional Ethics", ltpc: "-", category: "NC", credits: 0 }
        ]
      },
      {
        semester: 3,
        totalCredits: 19,
        courses: [
          { code: "MAL403", name: "Probability and Statistics", ltpc: "3-1-0-4", category: "PL", credits: 4 },
          { code: "CSL201", name: "Discrete Mathematics", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "CSL202", name: "Data Structures", ltpc: "2-1-2-4", category: "PC", credits: 4 },
          { code: "DSL201", name: "Mathematical Foundations for Data Science", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "LAL100", name: "Introduction to Communication Skills", ltpc: "1-1-0-2", category: "IC", credits: 2 },
          { code: "LAXXX", name: "LA Course", ltpc: "X-X-X-1", category: "LA", credits: 1 }
        ]
      },
      {
        semester: 4,
        totalCredits: 18,
        courses: [
          { code: "CSL251", name: "Computer Organization and Architecture", ltpc: "3-0-2-4", category: "PC", credits: 4 },
          { code: "CSL252", name: "Design and Analysis of Algorithms", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "DSL251", name: "Data Analytics and Visualization", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "DSP252", name: "Data Analytics and Visualization Lab", ltpc: "0-0-2-1", category: "PC", credits: 1 },
          { code: "DSL253", name: "Statistical Programming", ltpc: "1-0-2-2", category: "PC", credits: 2 },
          { code: "LAL101", name: "Introduction to Finance", ltpc: "1-0-0-1", category: "IC", credits: 1 },
          { code: "LAXXX", name: "LA Courses", ltpc: "X-X-X-3", category: "LA", credits: 3 }
        ]
      },
      {
        semester: 5,
        totalCredits: 18.5,
        courses: [
          { code: "DSP301", name: "AI and ML Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "CSL303", name: "Database Management Systems", ltpc: "3-0-2-4", category: "PC", credits: 4 },
          { code: "CSL304", name: "Artificial Intelligence", ltpc: "3-0-2-4", category: "PC", credits: 4 },
          { code: "DSPE", name: "Program Elective", ltpc: "X-X-X-7", category: "PE", credits: 7 },
          { code: "LAXXX", name: "LA Courses", ltpc: "X-X-X-2", category: "LA", credits: 2 }
        ]
      },
      {
        semester: 6,
        totalCredits: 18,
        courses: [
          { code: "DSL351", name: "Bigdata Analytics", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "DSP352", name: "Big Data Analytics Lab", ltpc: "0-0-2-1", category: "PC", credits: 1 },
          { code: "DSL353", name: "Information Security", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "DSQ401", name: "BTech Project-I", ltpc: "0-0-6-3", category: "PC", credits: 3 },
          { code: "UGQ301", name: "Interdisciplinary Undergraduate Project", ltpc: "0-0-6-3", category: "PC", credits: 3 },
          { code: "DSPE", name: "Program Elective", ltpc: "X-X-X-3", category: "PE", credits: 3 },
          { code: "LAXXX", name: "LA Courses", ltpc: "X-X-X-2", category: "LA", credits: 2 }
        ]
      },
      {
        semester: 7,
        totalCredits: 17,
        courses: [
          { code: "DSQ402", name: "BTech Project-II", ltpc: "0-0-6-3", category: "PC", credits: 3 },
          { code: "DSPE", name: "Program Elective", ltpc: "X-X-X-8", category: "PE", credits: 8 },
          { code: "DSOE", name: "Open Elective", ltpc: "X-X-X-6", category: "OE", credits: 6 }
        ]
      },
      {
        semester: 8,
        totalCredits: 17,
        courses: [
          { code: "DSPE", name: "Program Elective", ltpc: "X-X-X-5", category: "PE", credits: 5 },
          { code: "DSOE", name: "Open Elective", ltpc: "X-X-X-9", category: "OE", credits: 9 },
          { code: "LAXXX", name: "LA Courses", ltpc: "X-X-X-3", category: "LA", credits: 3 }
        ]
      }
    ]
  },
  {
    branch: Department.EE,
    degree: 'BTech',
    semesters: [
      {
        semester: 1,
        totalCredits: 18,
        courses: [
          { code: "CSL100", name: "Introduction to programming", ltpc: "2-1-3-4.5", category: "IC", credits: 4.5 },
          { code: "CYP102/PHP102", name: "Chemistry lab/ Physics lab", ltpc: "0-0-3-1.5", category: "IC", credits: 1.5 },
          { code: "MAL100", name: "Mathematics-I", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "CYL100", name: "Applied Chemistry", ltpc: "3-0-0-3", category: "IC", credits: 3 },
          { code: "PHL101", name: "Physics for Engineers", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "CYL101", name: "Environmental Science", ltpc: "1-0-0-1", category: "IC", credits: 1 },
          { code: "NCN100", name: "Practices for Comprehensive wellbeing", ltpc: "-", category: "NC", credits: 0 }
        ]
      },
      {
        semester: 2,
        totalCredits: 19.5,
        courses: [
          { code: "MEP102", name: "Digital fabrication", ltpc: "1-0.5-3-3", category: "IC", credits: 3 },
          { code: "EEL101", name: "Basic Electrical Engineering", ltpc: "3-0-2-4", category: "IC", credits: 4 },
          { code: "PHP102/CYP102", name: "Physics lab/ Chemistry lab", ltpc: "0-0-3-1.5", category: "IC", credits: 1.5 },
          { code: "MAL101", name: "Mathematics-II", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "ECL101", name: "Basic Electronics Engineering", ltpc: "3-0-2-4", category: "IC", credits: 4 },
          { code: "BML101", name: "Biology for Engineers", ltpc: "2-0-0-2", category: "IC", credits: 2 },
          { code: "LAN103", name: "Professional Ethics", ltpc: "-", category: "NC", credits: 0 }
        ]
      },
      {
        semester: 3,
        totalCredits: 18,
        courses: [
          { code: "EEL201", name: "Circuit and System", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "EEL202", name: "Analog Circuits", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "EEL203", name: "Digital Circuits", ltpc: "2-0-0-2", category: "PC", credits: 2 },
          { code: "EEL204", name: "Engineering Electromagnetics", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MAL403", name: "Probability and Statistics", ltpc: "2-1-0-3", category: "PL", credits: 3 },
          { code: "LAL100", name: "Introduction to Communication Skills", ltpc: "1-1-0-2", category: "IC", credits: 2 }
        ]
      },
      {
        semester: 4,
        totalCredits: 18,
        courses: [
          { code: "EEL205", name: "Control Systems", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "EEL206", name: "Electrical Machines-I", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "EEL207", name: "Power System Analysis", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "EEL208", name: "Sensors and Instrumentation", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "EEP209", name: "Device and Circuit Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "EEP210", name: "Digital Electronics Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "LAL101", name: "Introduction to Finance", ltpc: "1-0-0-1", category: "IC", credits: 1 },
          { code: "LAXXX", name: "LA Courses", ltpc: "X-X-X-1", category: "LA", credits: 1 }
        ]
      },
      {
        semester: 5,
        totalCredits: 18,
        courses: [
          { code: "EEL301", name: "Electrical Machines-II", ltpc: "2-0-0-2", category: "PC", credits: 2 },
          { code: "EEL302", name: "Digital Control", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "EEL303", name: "Power Electronics", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "EEP304", name: "Sensor Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "EEP305", name: "Power System Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "OE", name: "Open Elective", ltpc: "x-x-x-3", category: "OE", credits: 3 },
          { code: "LAXXX", name: "LA Courses", ltpc: "X-X-X-3", category: "LA", credits: 3 }
        ]
      },
      {
        semester: 6,
        totalCredits: 18,
        courses: [
          { code: "EEP306", name: "Machines Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "EEP307", name: "Instrumentation Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "EEP308", name: "Control Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "EEP309", name: "Power electronics Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-6", category: "PE", credits: 6 },
          { code: "UGQ301", name: "Interdisciplinary Undergraduate Project", ltpc: "0-0-6-3", category: "PC", credits: 3 },
          { code: "OE", name: "Open Elective", ltpc: "X-X-X-3", category: "OE", credits: 3 }
        ]
      },
      {
        semester: 7,
        totalCredits: 17.5,
        courses: [
          { code: "EEQ401", name: "Minor Project", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "EELXXX", name: "Program Elective", ltpc: "X-X-X-9", category: "PE", credits: 9 },
          { code: "OE", name: "Open Elective", ltpc: "X-X-X-3", category: "OE", credits: 3 },
          { code: "LAXXX", name: "LA Courses", ltpc: "X-X-X-4", category: "LA", credits: 4 }
        ]
      },
      {
        semester: 8,
        totalCredits: 17,
        courses: [
          { code: "EELXXX", name: "Program Elective", ltpc: "X-X-X-9", category: "PE", credits: 9 },
          { code: "OE", name: "Open Elective", ltpc: "X-X-X-6", category: "OE", credits: 6 },
          { code: "LAXXX", name: "LA Courses", ltpc: "X-X-X-2", category: "LA", credits: 2 }
        ]
      }
    ]
  },
  {
    branch: Department.ECE,
    degree: 'BTech',
    semesters: [
      {
        semester: 1,
        totalCredits: 18,
        courses: [
          { code: "CSL100", name: "Introduction to programming", ltpc: "2-1-3-4.5", category: "IC", credits: 4.5 },
          { code: "CYP102/PHP102", name: "Chemistry lab/ Physics lab", ltpc: "0-0-3-1.5", category: "IC", credits: 1.5 },
          { code: "MAL100", name: "Mathematics-I", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "CYL100", name: "Applied Chemistry", ltpc: "3-0-0-3", category: "IC", credits: 3 },
          { code: "PHL101", name: "Physics for Engineers", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "CYL101", name: "Environmental Science", ltpc: "1-0-0-1", category: "IC", credits: 1 },
          { code: "NCN100", name: "Practices for Comprehensive wellbeing", ltpc: "-", category: "NC", credits: 0 }
        ]
      },
      {
        semester: 2,
        totalCredits: 19.5,
        courses: [
          { code: "MEP102", name: "Digital fabrication", ltpc: "1-0.5-3-3", category: "IC", credits: 3 },
          { code: "EEL101", name: "Basic Electrical Engineering", ltpc: "3-0-2-4", category: "IC", credits: 4 },
          { code: "PHP102/CYP102", name: "Physics lab/ Chemistry lab", ltpc: "0-0-3-1.5", category: "IC", credits: 1.5 },
          { code: "MAL101", name: "Mathematics-II", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "ECL101", name: "Basic Electronics Engineering", ltpc: "3-0-2-4", category: "IC", credits: 4 },
          { code: "BML101", name: "Biology for Engineers", ltpc: "2-0-0-2", category: "IC", credits: 2 },
          { code: "LAN103", name: "Professional Ethics", ltpc: "-", category: "NC", credits: 0 }
        ]
      },
      {
        semester: 3,
        totalCredits: 19,
        courses: [
          { code: "ECL201", name: "Digital Design", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "ECL202", name: "Signals and Systems", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "ECL203", name: "Introduction to Electronics", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "ECL204", name: "Network Theory", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "LAXXX", name: "LA Courses", ltpc: "x-x-x-1", category: "LA", credits: 1 },
          { code: "MAL403", name: "Probability and Statistics", ltpc: "3-1-0-4", category: "PL", credits: 4 },
          { code: "LAL100", name: "Introduction to Communication Skills", ltpc: "1-1-0-2", category: "IC", credits: 2 }
        ]
      },
      {
        semester: 4,
        totalCredits: 17,
        courses: [
          { code: "ECL211", name: "Microcontroller and Embedded Systems", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "ECL212", name: "Digital Signal Processing", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "ECL213", name: "Communication Systems", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "ECL214", name: "Solid State Devices", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "LAXXX", name: "LA Courses", ltpc: "x-x-x-1", category: "LA", credits: 1 },
          { code: "ECP211", name: "Microcontroller and Embedded Systems Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "LAL101", name: "Introduction to Finance", ltpc: "1-0-0-1", category: "IC", credits: 1 },
          { code: "ECP212", name: "Digital Signal Processing lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 }
        ]
      },
      {
        semester: 5,
        totalCredits: 18,
        courses: [
          { code: "ECL301", name: "Digital Communication", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "ECL302", name: "Electromagnetic Theory", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "ECL303", name: "Control System Engineering", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "ECL304", name: "Analog Electronic Circuits", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "LAXXX", name: "LA Courses", ltpc: "x-x-x-2", category: "LA", credits: 2 },
          { code: "ECP304", name: "Analog Electronics Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "ECP301", name: "Communication Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "ECP305", name: "Digital Electronics Lab", ltpc: "0-0-2-1", category: "PC", credits: 1 }
        ]
      },
      {
        semester: 6,
        totalCredits: 18,
        courses: [
          { code: "ECL311", name: "VLSI Technology", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "ECL312", name: "FPGA for Digital Design", ltpc: "2-0-2-3", category: "PC", credits: 3 },
          { code: "ECLXXX", name: "Program Elective", ltpc: "x-x-x-3", category: "PE", credits: 3 },
          { code: "UGQ301", name: "Interdisciplinary Undergraduate Project", ltpc: "0-0-6-3", category: "PC", credits: 3 },
          { code: "LAXXX", name: "LA Courses", ltpc: "x-x-x-3", category: "LA", credits: 3 },
          { code: "OE", name: "Open Elective", ltpc: "x-x-x-3", category: "OE", credits: 3 }
        ]
      },
      {
        semester: 7,
        totalCredits: 17.5,
        courses: [
          { code: "ECP411", name: "Device Fabrication and VLSI Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "ECLXXX", name: "Program Elective", ltpc: "x-x-x-9", category: "PE", credits: 9 },
          { code: "LAXXX", name: "LA Courses", ltpc: "x-x-x-1", category: "LA", credits: 1 },
          { code: "OE", name: "Open Elective", ltpc: "x-x-x-6", category: "OE", credits: 6 }
        ]
      },
      {
        semester: 8,
        totalCredits: 17,
        courses: [
          { code: "ECLXXX", name: "Program Elective", ltpc: "x-x-x-9", category: "PE", credits: 9 },
          { code: "LAXXX", name: "LA Courses", ltpc: "x-x-x-2", category: "LA", credits: 2 },
          { code: "OE", name: "Open Elective", ltpc: "x-x-x-6", category: "OE", credits: 6 }
        ]
      }
    ]
  },
  {
    branch: Department.MSME,
    degree: 'BTech',
    semesters: [
      {
        semester: 1,
        totalCredits: 18,
        courses: [
          { code: "CSL100", name: "Introduction to programming", ltpc: "2-1-3-4.5", category: "IC", credits: 4.5 },
          { code: "CYP102/PHP102", name: "Chemistry lab/ Physics lab", ltpc: "0-0-3-1.5", category: "IC", credits: 1.5 },
          { code: "MAL100", name: "Mathematics-I", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "CYL100", name: "Applied Chemistry", ltpc: "3-0-0-3", category: "IC", credits: 3 },
          { code: "PHL101", name: "Physics for Engineers", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "CYL101", name: "Environmental Science", ltpc: "1-0-0-1", category: "IC", credits: 1 },
          { code: "NCN100", name: "Practices for Comprehensive wellbeing", ltpc: "-", category: "NC", credits: 0 }
        ]
      },
      {
        semester: 2,
        totalCredits: 19.5,
        courses: [
          { code: "MEP102", name: "Digital fabrication", ltpc: "1-0.5-3-3", category: "IC", credits: 3 },
          { code: "EEL101", name: "Basic Electrical Engineering", ltpc: "3-0-2-4", category: "IC", credits: 4 },
          { code: "PHP102/CYP102", name: "Physics lab/ Chemistry lab", ltpc: "0-0-3-1.5", category: "IC", credits: 1.5 },
          { code: "MAL101", name: "Mathematics-II", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "ECL101", name: "Basic Electronics Engineering", ltpc: "3-0-2-4", category: "IC", credits: 4 },
          { code: "BML101", name: "Biology for Engineers", ltpc: "2-0-0-2", category: "IC", credits: 2 },
          { code: "LAN103", name: "Professional Ethics", ltpc: "-", category: "NC", credits: 0 }
        ]
      },
      {
        semester: 3,
        totalCredits: 18,
        courses: [
          { code: "MML201", name: "Thermodynamics of Materials", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MML202", name: "Structure of Materials", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MEL251", name: "Casting, Forming and Welding", ltpc: "3-0-0-3", category: "PL", credits: 3 },
          { code: "MML204", name: "Properties and phase transformation of Materials", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MML205", name: "Principles of Extractive metallurgy", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "LAL100", name: "Introduction to Communication Skills", ltpc: "1-1-0-2", category: "IC", credits: 2 },
          { code: "LALXXX", name: "LA Courses", ltpc: "X-X-X-1", category: "LA", credits: 1 }
        ]
      },
      {
        semester: 4,
        totalCredits: 18.5,
        courses: [
          { code: "MML251", name: "Physical Properties of Materials", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MML252", name: "Materials Characterization- Scattering and Imaging", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MML253", name: "Computational Materials Science and Engineering", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MML254", name: "Mechanical behavior of Materials", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MMP251", name: "Chemical synthesis and characterization lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "MML203", name: "Chemical Synthesis of Materials", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "LAL101", name: "Introduction to Finance", ltpc: "1-0-0-1", category: "IC", credits: 1 },
          { code: "LALXXX", name: "LA Courses", ltpc: "X-X-X-1", category: "LA", credits: 1 }
        ]
      },
      {
        semester: 5,
        totalCredits: 17.5,
        courses: [
          { code: "MML301", name: "Materials Characterization – spectroscopy and other analytical tools", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MML302", name: "Iron making And Steelmaking", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MML303", name: "Polymeric Materials and Engineering", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MMP301", name: "Computational Materials Science and Engineering lab", ltpc: "0-0-2-1", category: "PC", credits: 1 },
          { code: "MMP302", name: "Industrial exposure to metals processing", ltpc: "0-0-2-1", category: "PC", credits: 1 },
          { code: "MMP303", name: "Metallurgical/Metallography Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-3", category: "PE", credits: 3 },
          { code: "LA", name: "LA Courses", ltpc: "X-X-X-2", category: "LA", credits: 2 }
        ]
      },
      {
        semester: 6,
        totalCredits: 18.5,
        courses: [
          { code: "MML351", name: "Technologies of Thin-film Fabrication", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MML401", name: "Environmental Degradation of Materials", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-3", category: "PE", credits: 3 },
          { code: "OE", name: "Open Elective", ltpc: "X-X-X-3", category: "OE", credits: 3 },
          { code: "UGP301", name: "Interdisciplinary Undergraduate Project", ltpc: "0-0-6-3", category: "PC", credits: 3 },
          { code: "LA", name: "LA Courses", ltpc: "X-X-X-2", category: "LA", credits: 2 },
          { code: "MMP401", name: "Thin film fabrication and characterization Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 }
        ]
      },
      {
        semester: 7,
        totalCredits: 17,
        courses: [
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-3", category: "PE", credits: 3 },
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-6", category: "PE", credits: 6 },
          { code: "OE", name: "Open Elective", ltpc: "X-X-X-6", category: "OE", credits: 6 },
          { code: "LALXXX", name: "LA Courses", ltpc: "X-X-X-2", category: "LA", credits: 2 }
        ]
      },
      {
        semester: 8,
        totalCredits: 17,
        courses: [
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-9", category: "PE", credits: 9 },
          { code: "OE", name: "Open Elective", ltpc: "X-X-X-6", category: "OE", credits: 6 },
          { code: "LA", name: "LA Courses", ltpc: "X-X-X-2", category: "LA", credits: 2 }
        ]
      }
    ]
  },
  {
    branch: Department.ME,
    degree: 'BTech',
    semesters: [
      {
        semester: 1,
        totalCredits: 18,
        courses: [
          { code: "CSL100", name: "Introduction to programming", ltpc: "2-1-3-4.5", category: "IC", credits: 4.5 },
          { code: "CYP102/ PHP102", name: "Chemistry lab/ Physics lab", ltpc: "0-0-3-1.5", category: "IC", credits: 1.5 },
          { code: "MAL100", name: "Mathematics-I", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "CYL100", name: "Applied Chemistry", ltpc: "3-0-0-3", category: "IC", credits: 3 },
          { code: "PHL101", name: "Physics for Engineers", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "CYL101", name: "Environmental Science", ltpc: "1-0-0-1", category: "IC", credits: 1 },
          { code: "NCN100", name: "Practices for Comprehensive wellbeing", ltpc: "-", category: "NC", credits: 0 }
        ]
      },
      {
        semester: 2,
        totalCredits: 19.5,
        courses: [
          { code: "MEP102", name: "Digital fabrication", ltpc: "1-0.5-3-3", category: "IC", credits: 3 },
          { code: "EEL101", name: "Basic Electrical Engineering", ltpc: "3-0-2-4", category: "IC", credits: 4 },
          { code: "PHP102/ CYP102", name: "Physics lab/ Chemistry lab", ltpc: "0-0-3-1.5", category: "IC", credits: 1.5 },
          { code: "MAL101", name: "Mathematics-II", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "ECL101", name: "Basic Electronics Engineering", ltpc: "3-0-2-4", category: "IC", credits: 4 },
          { code: "BML101", name: "Biology for Engineers", ltpc: "3-0-0-3", category: "IC", credits: 3 },
          { code: "LAN103", name: "Professional Ethics", ltpc: "-", category: "NC", credits: 0 }
        ]
      },
      {
        semester: 3,
        totalCredits: 18,
        courses: [
          { code: "MEL231", name: "Engineering Mechanics", ltpc: "2-1-0-3", category: "PC", credits: 3 },
          { code: "MEL211", name: "Thermodynamics", ltpc: "2-1-0-3", category: "PC", credits: 3 },
          { code: "MML204", name: "Properties and phase transformation of Materials", ltpc: "3-0-0-3", category: "PL", credits: 3 },
          { code: "MEL251", name: "Casting, forming & Welding", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "LAL100", name: "Introduction to Communication Skills", ltpc: "1-1-0-2", category: "IC", credits: 2 },
          { code: "LA Courses", name: "LA Courses", ltpc: "X-X-X-4", category: "LA", credits: 4 }
        ]
      },
      {
        semester: 4,
        totalCredits: 18,
        courses: [
          { code: "MEL232", name: "Mechanics of Solids", ltpc: "2-1-0-3", category: "PC", credits: 3 },
          { code: "MEL214", name: "Applied Thermal Engineering", ltpc: "2-1-0-3", category: "PC", credits: 3 },
          { code: "MEL212", name: "Fluid Mechanics", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "MEL252", name: "Fundamentals of Industrial Engineering", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "LAL101", name: "Introduction to Finance", ltpc: "1-0-0-1", category: "IC", credits: 1 },
          { code: "LA Courses", name: "LA Courses", ltpc: "X-X-X-1", category: "LA", credits: 1 },
          { code: "OE", name: "Open Elective", ltpc: "X-X-X-3", category: "OE", credits: 3 }
        ]
      },
      {
        semester: 5,
        totalCredits: 18,
        courses: [
          { code: "MEL333", name: "Design of Machine Elements", ltpc: "3-0.5-0-3.5", category: "PC", credits: 3.5 },
          { code: "MEL313", name: "Heat and Mass Transfer", ltpc: "3-0.5-0-3.5", category: "PC", credits: 3.5 },
          { code: "MEL351", name: "Machining and Machine Tools", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MEP381", name: "Manufacturing and Metrology Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "MEP371", name: "Thermal and Fluid Engineering Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "PE/OE", name: "PE/OE", ltpc: "X-X-X-3", category: "PE", credits: 3 },
          { code: "LA Courses", name: "LA Courses", ltpc: "X-X-X-2", category: "LA", credits: 2 }
        ]
      },
      {
        semester: 6,
        totalCredits: 17.5,
        courses: [
          { code: "MEL334", name: "Theory of Mechanisms and Machines", ltpc: "3-0.5-0-3.5", category: "PC", credits: 3.5 },
          { code: "EEL208", name: "Sensors and Instrumentation", ltpc: "3-0-0-3", category: "PL", credits: 3 },
          { code: "MEL304", name: "Applied Numerical Methods", ltpc: "3-0-1-3.5", category: "PC", credits: 3.5 },
          { code: "MEP302", name: "Engineering and Machine Drawing", ltpc: "0-0-4-2", category: "PC", credits: 2 },
          { code: "MEP376", name: "Solid Mechanics and Dynamics Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "UGQ301", name: "Interdisciplinary Undergraduate Project", ltpc: "0-0-6-3", category: "PC", credits: 3 },
          { code: "LA Courses", name: "LA Courses", ltpc: "X-X-X-1", category: "LA", credits: 1 }
        ]
      },
      {
        semester: 7,
        totalCredits: 18,
        courses: [
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-6", category: "PE", credits: 6 },
          { code: "PE/OE", name: "PE/OE", ltpc: "X-X-X-12", category: "PE", credits: 12 }
        ]
      },
      {
        semester: 8,
        totalCredits: 17,
        courses: [
          { code: "PE/OE", name: "PE/OE", ltpc: "X-X-X-15", category: "PE", credits: 15 },
          { code: "LA Courses", name: "LA Courses", ltpc: "X-X-X-2", category: "LA", credits: 2 }
        ]
      }
    ]
  },
  {
    branch: Department.MT,
    degree: 'BTech',
    semesters: [
      {
        semester: 1,
        totalCredits: 18,
        courses: [
          { code: "CSL100", name: "Introduction to programming", ltpc: "2-1-3-4.5", category: "IC", credits: 4.5 },
          { code: "CYP102/ PHP102", name: "Chemistry lab/ Physics lab", ltpc: "0-0-3-1.5", category: "IC", credits: 1.5 },
          { code: "MAL100", name: "Mathematics-I", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "CYL100", name: "Applied Chemistry", ltpc: "3-0-0-3", category: "IC", credits: 3 },
          { code: "PHL101", name: "Physics for Engineers", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "CYL101", name: "Environmental Science", ltpc: "1-0-0-1", category: "IC", credits: 1 },
          { code: "NCN100", name: "Practices for Comprehensive wellbeing", ltpc: "-", category: "NC", credits: 0 }
        ]
      },
      {
        semester: 2,
        totalCredits: 19.5,
        courses: [
          { code: "MEP102", name: "Digital fabrication", ltpc: "1-0.5-3-3", category: "IC", credits: 3 },
          { code: "EEL101", name: "Basic Electrical Engineering", ltpc: "3-0-2-4", category: "IC", credits: 4 },
          { code: "PHP102/ CYP102", name: "Physics lab/ Chemistry lab", ltpc: "0-0-3-1.5", category: "IC", credits: 1.5 },
          { code: "MAL101", name: "Mathematics-II", ltpc: "3-1-0-4", category: "IC", credits: 4 },
          { code: "ECL101", name: "Basic Electronics Engineering", ltpc: "3-0-2-4", category: "IC", credits: 4 },
          { code: "BML101", name: "Biology for Engineers", ltpc: "3-0-0-3", category: "IC", credits: 3 },
          { code: "LAN103", name: "Professional Ethics", ltpc: "-", category: "NC", credits: 0 }
        ]
      },
      {
        semester: 3,
        totalCredits: 18,
        courses: [
          { code: "EEL201", name: "Circuit and System", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "MEL231", name: "Engineering Mechanics", ltpc: "2-1-0-3", category: "PC", credits: 3 },
          { code: "MTL201", name: "Fluid Power System", ltpc: "3-0-2-4", category: "PC", credits: 4 },
          { code: "MAL403", name: "Probability and statistics", ltpc: "3-1-0-4", category: "PL", credits: 4 },
          { code: "LAL100", name: "Introduction to Communication Skills", ltpc: "1-1-0-2", category: "IC", credits: 2 },
          { code: "LA Courses", name: "LA Courses", ltpc: "X-X-X-1", category: "LA", credits: 1 }
        ]
      },
      {
        semester: 4,
        totalCredits: 17.5,
        courses: [
          { code: "EEL205", name: "Control Systems", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "MEL232", name: "Mechanics of Solids", ltpc: "2-1-0-3", category: "PC", credits: 3 },
          { code: "MEL334", name: "Theory of Mechanisms and Machine", ltpc: "3-0.5-0-3.5", category: "PC", credits: 3.5 },
          { code: "MTL202", name: "Industry 4.0", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "EEL208", name: "Sensors and Instrumentation", ltpc: "3-0-0-3", category: "PL", credits: 3 },
          { code: "LAL101", name: "Introduction to Finance", ltpc: "1-0-0-1", category: "IC", credits: 1 }
        ]
      },
      {
        semester: 5,
        totalCredits: 18.5,
        courses: [
          { code: "MEL333", name: "Design of Machine Elements", ltpc: "3-0.5-0-3.5", category: "PC", credits: 3.5 },
          { code: "EEL302", name: "Digital Control", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "MTL301", name: "Fundamental of Robotics", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "CSL304", name: "Artificial Intelligence", ltpc: "3-0-2-4", category: "PC", credits: 4 },
          { code: "OE", name: "Open Elective", ltpc: "X-X-X-3", category: "OE", credits: 3 },
          { code: "LA Courses", name: "LA Courses", ltpc: "X-X-X-1", category: "LA", credits: 1 }
        ]
      },
      {
        semester: 6,
        totalCredits: 18,
        courses: [
          { code: "MTP302", name: "Mechatronics Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "MTP301", name: "Mechanism Lab", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-9", category: "PE", credits: 9 },
          { code: "UGQ301", name: "Interdisciplinary Undergraduate Project", ltpc: "0-0-6-3", category: "PC", credits: 3 },
          { code: "LA Courses", name: "LA Courses", ltpc: "X-X-X-3", category: "LA", credits: 3 }
        ]
      },
      {
        semester: 7,
        totalCredits: 17.5,
        courses: [
          { code: "MTQ401", name: "Minor Project", ltpc: "0-0-3-1.5", category: "PC", credits: 1.5 },
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-12", category: "PE", credits: 12 },
          { code: "LA Courses", name: "LA Courses", ltpc: "X-X-X-4", category: "LA", credits: 4 }
        ]
      },
      {
        semester: 8,
        totalCredits: 17,
        courses: [
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-4", category: "PE", credits: 4 },
          { code: "OE", name: "Open Elective", ltpc: "X-X-X-12", category: "OE", credits: 12 },
          { code: "LA Courses", name: "LA Courses", ltpc: "X-X-X-1", category: "LA", credits: 1 }
        ]
      }
    ]
  },
  {
    branch: Department.CHE,
    degree: 'MSc',
    semesters: [
      {
        semester: 1,
        totalCredits: 18,
        courses: [
          { code: "CYL500", name: "Quantum Chemistry", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "CYL400", name: "Chemical Kinetics and Surface Science", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "CYL401", name: "Coordination Chemistry", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "CYL501", name: "Stereochemistry and Reaction Mechanism", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "CYP502", name: "Organic and Inorganic Laboratory", ltpc: "0-0-6-3", category: "PC", credits: 3 },
          { code: "CYP503", name: "Physical and Computational Laboratory", ltpc: "0-0-6-3", category: "PC", credits: 3 }
        ]
      },
      {
        semester: 2,
        totalCredits: 18,
        courses: [
          { code: "CYL504", name: "Thermodynamics and Statistical Mechanics", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "CYL505", name: "Organic Reactions and Reagents", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "CYL506", name: "Bioinorganic Chemistry", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-9", category: "PE", credits: 9 }
        ]
      },
      {
        semester: 3,
        totalCredits: 18,
        courses: [
          { code: "CYL600", name: "Advanced Organic Chemistry", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "CYL601", name: "Organometallic Chemistry", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "CYT699", name: "Thesis", ltpc: "X-X-X-6", category: "PC", credits: 6 },
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-6", category: "PE", credits: 6 }
        ]
      },
      {
        semester: 4,
        totalCredits: 18,
        courses: [
          { code: "CYT699", name: "Thesis", ltpc: "X-X-X-18", category: "PC", credits: 18 }
        ]
      }
    ]
  },
  {
    branch: Department.MAT,
    degree: 'MSc',
    semesters: [
      {
        semester: 1,
        totalCredits: 18,
        courses: [
          { code: "MAL400", name: "Introduction to Programming", ltpc: "2-1-3-4.5", category: "PC", credits: 4.5 },
          { code: "MAL401", name: "Linear Algebra", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MAL402", name: "Real Analysis", ltpc: "3-0.5-0-3.5", category: "PC", credits: 3.5 },
          { code: "MAL403", name: "Probability and Statistics", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "MAL404", name: "Modern Algebra", ltpc: "3-0-0-3", category: "PC", credits: 3 }
        ]
      },
      {
        semester: 2,
        totalCredits: 18,
        courses: [
          { code: "MAL405", name: "Differential Equations", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "MAL406", name: "Numerical Analysis", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "MAL500", name: "Topology", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MAL501", name: "Complex Analysis", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MAL502", name: "Functional Analysis", ltpc: "3-1-0-4", category: "PC", credits: 4 }
        ]
      },
      {
        semester: 3,
        totalCredits: 18,
        courses: [
          { code: "MAL503", name: "Discrete Mathematics", ltpc: "3-1-0-4", category: "PC", credits: 4 },
          { code: "MAL504", name: "Data Structure", ltpc: "2-1-2-4", category: "PC", credits: 4 },
          { code: "MAL505", name: "Database Management Systems", ltpc: "3-0-2-4", category: "PC", credits: 4 },
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-3", category: "PE", credits: 3 },
          { code: "PE/OE", name: "Program Elective/Open Elective", ltpc: "X-X-X-3", category: "OE", credits: 3 }
        ]
      },
      {
        semester: 4,
        totalCredits: 18,
        courses: [
          { code: "MAQ699", name: "Project/PE/OE", ltpc: "X-X-X-18", category: "PC", credits: 18 }
        ]
      }
    ]
  },
  {
    branch: Department.PHY,
    degree: 'MSc',
    semesters: [
      {
        semester: 1,
        totalCredits: 18,
        courses: [
          { code: "PHL501", name: "Classical Mechanics", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "PHL502", name: "Quantum Mechanics", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "PHL403", name: "Mathematical Physics", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "PHL404", name: "Electronics", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "PHL505", name: "Electrodynamics", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "PHP506", name: "Electronics Laboratory", ltpc: "0-0-6-3", category: "PC", credits: 3 }
        ]
      },
      {
        semester: 2,
        totalCredits: 18,
        courses: [
          { code: "PHL507", name: "Statistical Mechanics", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "PHL508", name: "Solid State Physics", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "PHL509", name: "Nuclear and Particle Physics", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "PHL110", name: "Atomic and Molecular Physics", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "PHP511", name: "General Physics Laboratory", ltpc: "0-0-6-3", category: "PC", credits: 3 },
          { code: "PE", name: "Program Elective", ltpc: "3-0-0-3", category: "PE", credits: 3 }
        ]
      },
      {
        semester: 3,
        totalCredits: 18,
        courses: [
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-12", category: "PE", credits: 12 },
          { code: "PHT699", name: "Thesis", ltpc: "X-X-X-6", category: "PC", credits: 6 }
        ]
      },
      {
        semester: 4,
        totalCredits: 18,
        courses: [
          { code: "PHT699", name: "Thesis", ltpc: "X-X-X-18", category: "PC", credits: 18 }
        ]
      }
    ]
  },
  {
    branch: Department.CSE,
    degree: 'MTech',
    semesters: [
      {
        semester: 1,
        totalCredits: 12,
        courses: [
          { code: "CSL502", name: "Foundation of Computer Science", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "CSL503", name: "Computer Systems Engineering", ltpc: "2-0-2-3", category: "PC", credits: 3 },
          { code: "CSL606", name: "Advance Data Structures and Algorithms", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "CSL605", name: "Computer Networks and Cyber Security", ltpc: "2-0-2-3", category: "PC", credits: 3 }
        ]
      },
      {
        semester: 2,
        totalCredits: 12,
        courses: [
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-9", category: "PE", credits: 9 },
          { code: "PE/OE", name: "Program Elective/Open Elective", ltpc: "X-X-X-3", category: "OE", credits: 3 }
        ]
      },
      {
        semester: 3,
        totalCredits: 15,
        courses: [
          { code: "PE/OE/Thesis", name: "PE/OE/Thesis", ltpc: "X-X-X-6", category: "PE", credits: 6 },
          { code: "CST799", name: "Thesis", ltpc: "X-X-X-9", category: "PC", credits: 9 }
        ]
      },
      {
        semester: 4,
        totalCredits: 15,
        courses: [
          { code: "CST799", name: "Thesis", ltpc: "X-X-X-15", category: "PC", credits: 15 }
        ]
      }
    ]
  },
  {
    branch: Department.DSAI,
    degree: 'MTech',
    semesters: [
      {
        semester: 1,
        totalCredits: 12,
        courses: [
          { code: "DSL502", name: "Basic Mathematics for Data Science and Artificial Intelligence", ltpc: "2-1-0-3", category: "PC", credits: 3 },
          { code: "DSP505", name: "Programming Lab for Data Science and Artificial Intelligence", ltpc: "1-0-2-2", category: "PC", credits: 2 },
          { code: "DSL501", name: "Machine Learning", ltpc: "3-0-2-4", category: "PC", credits: 4 },
          { code: "CSL606", name: "Advance Data structures and Algorithm", ltpc: "3-0-0-3", category: "PC", credits: 3 }
        ]
      },
      {
        semester: 2,
        totalCredits: 12,
        courses: [
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-9", category: "PE", credits: 9 },
          { code: "PE/OE", name: "Program Elective/Open Elective", ltpc: "X-X-X-3", category: "OE", credits: 3 }
        ]
      },
      {
        semester: 3,
        totalCredits: 15,
        courses: [
          { code: "PE/OE/Thesis", name: "PE/OE/Thesis", ltpc: "X-X-X-3", category: "PE", credits: 3 },
          { code: "DST799", name: "Thesis", ltpc: "X-X-X-12", category: "PC", credits: 12 }
        ]
      },
      {
        semester: 4,
        totalCredits: 15,
        courses: [
          { code: "DST799", name: "Thesis", ltpc: "X-X-X-15", category: "PC", credits: 15 }
        ]
      }
    ]
  },
  {
    branch: Department.MSME,
    degree: 'MTech',
    semesters: [
      {
        semester: 1,
        totalCredits: 15,
        courses: [
          { code: "MML501", name: "Characterization and Testing of Materials", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "MML551", name: "Thermodynamics and Phase Equilibria", ltpc: "2-0-0-2", category: "PC", credits: 2 },
          { code: "MML552", name: "Fundamentals of Crystallography", ltpc: "1-0-0-1", category: "PC", credits: 1 },
          { code: "MML553", name: "Material Synthesis and Processing", ltpc: "2-0-0-2", category: "PC", credits: 2 },
          { code: "MMP553", name: "Material Fabrication Laboratory", ltpc: "0-0-4-2", category: "PC", credits: 2 },
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-5", category: "PE", credits: 5 }
        ]
      },
      {
        semester: 2,
        totalCredits: 15,
        courses: [
          { code: "MMP501", name: "Material characterization laboratory", ltpc: "0-0-4-2", category: "PC", credits: 2 },
          { code: "MML554", name: "Computational Methods in Materials Science", ltpc: "3-0-0-3", category: "PC", credits: 3 },
          { code: "PE", name: "Program Elective", ltpc: "X-X-X-7", category: "PE", credits: 7 },
          { code: "PE/OE/Thesis", name: "PE/OE/Thesis", ltpc: "X-X-X-3", category: "OE", credits: 3 }
        ]
      },
      {
        semester: 3,
        totalCredits: 12,
        courses: [
          { code: "MMT799", name: "Thesis", ltpc: "X-X-X-12", category: "PC", credits: 12 }
        ]
      },
      {
        semester: 4,
        totalCredits: 12,
        courses: [
          { code: "MMT799", name: "Thesis", ltpc: "X-X-X-12", category: "PC", credits: 12 }
        ]
      }
    ]
  }
];
