"use client";

import { cn } from "@/lib/utils";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilters } from "@/context/FiltersContext";

import { Department } from "@/types/courses";

const levels = [
    "100 Level",
    "200 Level", 
    "300 Level", 
    "400 Level", 
    "500 Level", 
    "600 Level"
  ];

export const FilterContent = () => {
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
    return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {/* Department Filter */}
        <AccordionItem value="department">
          <AccordionTrigger 
            className={cn(
              "hover:bg-gray-50 rounded-md px-2",
              "dark:hover:bg-gray-800"
            )}
          >
            <span 
              className={cn(
                "text-gray-800",
                "dark:text-white"
              )}
            >
              Department
            </span>
            {filters.departments.length > 0 && (
              <span 
                className={cn(
                  "ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full",
                  "dark:bg-primary/20 dark:text-primary-foreground"
                )}
              >
                {filters.departments.length}
              </span>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div 
              className={cn(
                "grid grid-cols-2 lg:grid-cols-1 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto overflow-x-hidden"
              )}
            >
              {Object.entries(Department).map(([short, full]) => (
                <div key={short} className="flex items-center space-x-2">
                  <Checkbox
                    id={short}
                    checked={filters.departments.includes(short as keyof typeof Department)}
                    onCheckedChange={() => 
                      handleCheckboxChange("department", short)
                    }
                  />
                  <Label 
                    htmlFor={short} 
                    className={cn(
                      "flex flex-col cursor-pointer",
                      "text-gray-800",
                      "dark:text-gray-200"
                    )}
                  >
                    <span className="text-sm font-medium">{short}</span>
                    <span 
                      className={cn(
                        "text-xs text-gray-500 break-words",
                        "dark:text-gray-400"
                      )}
                    >
                      {full}
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Level Filter */}
        <AccordionItem value="level">
          <AccordionTrigger 
            className={cn(
              "hover:bg-gray-50 rounded-md px-2",
              "dark:hover:bg-gray-800"
            )}
          >
            <span 
              className={cn(
                "text-gray-800",
                "dark:text-white"
              )}
            >
              Level
            </span>
            {filters.levels.length > 0 && (
              <span 
                className={cn(
                  "ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full",
                  "dark:bg-primary/20 dark:text-primary-foreground"
                )}
              >
                {filters.levels.length}
              </span>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 lg:grid-cols-1 sm:grid-cols-3 gap-2">
              {levels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={level}
                    checked={filters.levels.includes(level)}
                    onCheckedChange={() => 
                      handleCheckboxChange("level", level)
                    }
                  />
                  <Label 
                    htmlFor={level} 
                    className={cn(
                      "cursor-pointer text-sm",
                      "text-gray-800",
                      "dark:text-gray-200"
                    )}
                  >
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};