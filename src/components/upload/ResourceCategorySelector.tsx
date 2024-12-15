import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { resourceCategories, ResourceCategory } from '@/types/resource';
import { motion } from 'framer-motion';

interface ResourceCategorySelectorProps {
  selectedCategory: ResourceCategory;
  onCategoryChange: (category: ResourceCategory) => void;
}

export const ResourceCategorySelector: React.FC<ResourceCategorySelectorProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-semibold text-gray-700">Select Resource Category</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                  h-24 w-full flex flex-col justify-center items-center gap-3
                  transition-all duration-300 ease-in-out
                  ${!isSelected ? 'hover:bg-gray-100 hover:border-gray-300' : ''}
                  group
                `}
                onClick={() => onCategoryChange(key as ResourceCategory)}
              >
                <div className={`
                  p-2 rounded-full transition-all duration-300 ease-in-out
                  ${isSelected 
                    ? 'bg-white/20' 
                    : 'bg-gray-100 bg-opacity-50 group-hover:bg-opacity-70'
                  }
                `}>
                  <Icon className={`
                    h-6 w-6 
                    ${isSelected ? 'text-white' : 'text-gray-600'}
                    transition-colors duration-300 ease-in-out
                    group-hover:text-gray-800
                  `} />
                </div>
                <span className={`
                  text-sm font-medium 
                  ${isSelected ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}
                  transition-colors duration-300 ease-in-out
                `}>
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