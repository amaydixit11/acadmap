"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Sample Data
const departments = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Chemical Engineering",
  "Mathematics",
  "Physics",
];

const levels = [
  "100 Level",
  "200 Level",
  "300 Level",
  "400 Level",
  "Graduate",
];

const semesters = [
  "Fall 2024",
  "Spring 2024",
  "Fall 2023",
  "Spring 2023",
];

export function CourseFilters() {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedSemesters, setSelectedSemesters] = useState<string[]>([]);

  const handleCheckboxChange = (category: string, item: string) => {
    const setter = {
      department: setSelectedDepartments,
      level: setSelectedLevels,
      semester: setSelectedSemesters,
    }[category];

    if (!setter) return;

    setter((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item); // Unselect
      } else {
        return [...prev, item]; // Select
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedDepartments([]);
    setSelectedLevels([]);
    setSelectedSemesters([]);
  };

  return (
    <div className="border rounded-lg p-4">
      <h2 className="font-semibold mb-4">Filters</h2>
      <Accordion type="single" collapsible className="w-full">
        {/* Department Filter */}
        <AccordionItem value="department">
          <AccordionTrigger>Department</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {departments.map((dept) => (
                <div key={dept} className="flex items-center space-x-2">
                  <Checkbox
                    id={dept}
                    checked={selectedDepartments.includes(dept)}
                    onChange={() => handleCheckboxChange("department", dept)}
                  />
                  <Label htmlFor={dept}>{dept}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Level Filter */}
        <AccordionItem value="level">
          <AccordionTrigger>Level</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {levels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={level}
                    checked={selectedLevels.includes(level)}
                    onChange={() => handleCheckboxChange("level", level)}
                  />
                  <Label htmlFor={level}>{level}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Semester Filter */}
        <AccordionItem value="semester">
          <AccordionTrigger>Semester</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {semesters.map((semester) => (
                <div key={semester} className="flex items-center space-x-2">
                  <Checkbox
                    id={semester}
                    checked={selectedSemesters.includes(semester)}
                    onChange={() => handleCheckboxChange("semester", semester)}
                  />
                  <Label htmlFor={semester}>{semester}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Clear Filters Button */}
      <div className="mt-4">
        <Button onClick={handleClearFilters} variant="outline" className="w-full">
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
