"use client";

import { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Department } from "@/models/courses";

const levels = [
  "100 Level",
  "200 Level", 
  "300 Level", 
  "400 Level", 
  "500 Level", 
  "600 Level"
];

export function CourseFilters({ 
  onFilterChange 
}: { 
  onFilterChange: (filters: {
    departments: (keyof typeof Department)[],
    levels: string[],
    searchQuery: string
  }) => void 
}) {
  const [selectedDepartments, setSelectedDepartments] = useState<(keyof typeof Department)[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleCheckboxChange = (category: string, item: string) => {
    let updatedSelection: string[];
    switch (category) {
      case "department":
        updatedSelection = selectedDepartments.includes(item as keyof typeof Department)
          ? selectedDepartments.filter(d => d !== item)
          : [...selectedDepartments, item as keyof typeof Department];
        setSelectedDepartments(updatedSelection as (keyof typeof Department)[]);
        break;
      case "level":
        updatedSelection = selectedLevels.includes(item)
          ? selectedLevels.filter(l => l !== item)
          : [...selectedLevels, item];
        setSelectedLevels(updatedSelection);
        break;
      default:
        updatedSelection = [];
    }

    // Notify parent component about filter changes
    onFilterChange({
      departments: category === "department" 
        ? updatedSelection as (keyof typeof Department)[]
        : selectedDepartments,
      levels: category === "level" ? updatedSelection : selectedLevels,
      searchQuery
    });
  };

  const handleClearFilters = () => {
    setSelectedDepartments([]);
    setSelectedLevels([]);
    setSearchQuery("");

    // Notify parent component about cleared filters
    onFilterChange({
      departments: [] as (keyof typeof Department)[],
      levels: [],
      searchQuery: ""
    });
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
              {Object.entries(Department).map(([short, full]) => (
                <div key={short} className="flex items-center space-x-2">
                  <Checkbox
                    id={short}
                    checked={selectedDepartments.includes(short as keyof typeof Department)}
                    onCheckedChange={() => 
                      handleCheckboxChange("department", short)
                    }
                  />
                  <Label htmlFor={short} className="flex items-center">
                    <span className="mr-2">{short}</span>
                    <span className="text-xs text-gray-500 truncate">{full}</span>
                  </Label>
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
                    onCheckedChange={() => 
                      handleCheckboxChange("level", level)
                    }
                  />
                  <Label htmlFor={level}>{level}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Clear Filters Button */}
      <div className="mt-4">
        <Button 
          onClick={handleClearFilters} 
          variant="outline" 
          className="w-full"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
