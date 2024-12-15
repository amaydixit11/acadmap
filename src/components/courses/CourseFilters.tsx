"use client";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Department } from "@/types/courses";
import { Filter } from "lucide-react";
import { useFilters } from "@/context/FiltersContext";

const levels = [
  "100 Level",
  "200 Level", 
  "300 Level", 
  "400 Level", 
  "500 Level", 
  "600 Level"
];

export function CourseFilters() {
  const {filters, dispatch} = useFilters();

  const handleCheckboxChange = (category: string, item: string) => {
    switch (category) {
      case "department":
        dispatch({
          type: 'UPDATE_FILTER', 
          key: "departments",
          value: filters.departments.includes(item as keyof typeof Department)
          ? filters.departments.filter(d => d !== item)
          : [...filters.departments, item as keyof typeof Department]})
        break;
      case "level":
        dispatch({ 
          type: 'UPDATE_FILTER', 
          key: "levels",
          value: filters.levels.includes(item)
          ? filters.levels.filter(l => l !== item)
          : [...filters.levels, item]})
        break;
    }
  };
  const handleClearFilters = () => {
    dispatch({ type: 'RESET_FILTERS'})
  };

  return (
    <aside className="w-full">
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 sticky top-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          Filters
        </h2>
      </div>
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
                    checked={filters.departments.includes(short as keyof typeof Department)}
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
                    checked={filters.levels.includes(level)}
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
    </div>
    </aside>
  );
}
