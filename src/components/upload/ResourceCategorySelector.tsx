import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { resourceCategories, ResourceCategory } from "@/types/resource";
import { motion } from "framer-motion";

interface ResourceCategorySelectorProps {
  selectedCategory: ResourceCategory;
  onCategoryChange: (category: ResourceCategory) => void;
}

export const ResourceCategorySelector: React.FC<ResourceCategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Select Resource Category
      </Label>
      <div
        className="
          grid gap-3
          grid-cols-2
          sm:grid-cols-3 
          lg:grid-cols-3 
          xl:grid-cols-3
          2xl:grid-cols-3
        "
      >
        {Object.entries(resourceCategories).map(([key, value]) => {
          const Icon = value.icon;
          const isSelected = selectedCategory === key;

          return (
            <motion.div
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                type="button"
                variant={isSelected ? "default" : "outline"}
                className={`
                  h-20 w-full flex flex-col justify-center items-center gap-2
                  sm:h-24 md:h-28
                  transition-all duration-300 ease-in-out
                  ${!isSelected ? "hover:bg-gray-100 hover:border-gray-300 dark:hover:bg-gray-700 dark:hover:border-gray-600" : ""}
                  group
                `}
                onClick={() => onCategoryChange(key as ResourceCategory)}
              >
                <div
                  className={`
                    p-2 rounded-full transition-all duration-300 ease-in-out
                    ${isSelected 
                      ? "bg-white/20 dark:bg-white/10" 
                      : "bg-gray-100 bg-opacity-50 group-hover:bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-50 dark:group-hover:bg-opacity-70"
                    }
                  `}
                >
                  <Icon
                    className={`
                      h-6 w-6 
                      sm:h-8 sm:w-8
                      ${isSelected ? "text-white" : "text-gray-600 dark:text-gray-300"}
                      transition-colors duration-300 ease-in-out
                      group-hover:text-gray-800 dark:group-hover:text-white
                    `}
                  />
                </div>
                <span
                  className={`
                    text-xs sm:text-sm font-medium 
                    ${isSelected 
                      ? "text-white" 
                      : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                    }
                    transition-colors duration-300 ease-in-out
                  `}
                >
                  {value.label}
                </span>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ResourceCategorySelector;
