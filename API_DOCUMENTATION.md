# AcadMap Public API Documentation

Welcome to the AcadMap Public API. This API provides programmatic access to AcadMap's course catalog, timetable, curriculum, and department data.

## Base URL
All API requests should be made to:
`http://localhost:3000/api` (or the deployed base URL)

---

## Endpoints

### 1. Course Catalog
Fetches the complete list of courses available in the database (as seen on the Courses page).

**URL**: `/courses`
**Method**: `GET`
**Response Format**: JSON

#### Example Response
```json
[
  {
    "id": "csl201",
    "code": "CSL201",
    "title": "Discrete Mathematics",
    "department": "Computer Science and Engineering",
    "credits": 4,
    "prerequisites": "None",
    "syllabus": ["Logic", "Sets", "Functions"...],
    "schedule": {
      "lectures": "C1",
      "tutorials": "C2",
      "labs": "L1"
    }
  },
  ...
]
```

---

### 2. Timetable Data
Fetches the current semester's timetable courses from the source CSV file.

**URL**: `/timetable`
**Method**: `GET`
**Response Format**: JSON

#### Example Response
```json
[
  {
    "code": "CSL100",
    "title": "Introduction to programming",
    "ltp": "2-1-3",
    "credits": 4.5,
    "discipline": "CSE",
    "program": "BTech",
    "lectureSlot": "D",
    "lectureVenue": "O23",
    "tutorialSlot": "NA",
    "tutorialVenue": "NA",
    "labSlot": "V23",
    "labVenue": "LHC-1",
    "instructor": "Dr. Anand M. Baswade"
  },
  ...
]
```

---

### 3. Full Curriculum
Returns the entire academic curriculum structure for all branches and degrees.

**URL**: `/curriculum`
**Method**: `GET`
**Response Format**: JSON

#### Example Response
```json
[
  {
    "branch": "Computer Science and Engineering",
    "degree": "BTech",
    "semesters": [
      {
        "semester": 1,
        "totalCredits": 18,
        "courses": [
          { "code": "CSL100", "name": "Introduction to programming", "credits": 4.5, "category": "IC" },
          ...
        ]
      },
      ...
    ]
  },
  ...
]
```

---

### 4. Branch Curriculum
Returns the curriculum for a specific academic branch.

**URL**: `/curriculum/[branch]`
**Method**: `GET`
**Path Parameters**:
- `branch`: The name or short code of the branch (e.g., `CSE`, `Electrical Engineering`).

#### Example Request
`GET /api/curriculum/CSE`

#### Example Response
```json
[
  {
    "branch": "Computer Science and Engineering",
    "degree": "BTech",
    "semesters": [...]
  }
]
```

---

### 5. Departments List
Returns a list of all supported academic branches and their full names.

**URL**: `/departments`
**Method**: `GET`
**Response Format**: JSON

#### Example Response
```json
[
  { "shortName": "CSE", "fullName": "Computer Science and Engineering" },
  { "shortName": "EE", "fullName": "Electrical Engineering" },
  { "shortName": "ECE", "fullName": "Electronics and Communication Engineering" },
  ...
]
```

---

## Error Handling
The API uses standard HTTP status codes:
- `200 OK`: Request succeeded.
- `404 Not Found`: Resource (e.g., branch) not found.
- `500 Internal Server Error`: Unexpected server error.

Errors are returned in the following format:
```json
{
  "error": "Detailed error message"
}
```
