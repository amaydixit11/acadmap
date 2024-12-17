import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ResourceType, resourceTypes } from '@/types/resource';
import { motion } from 'framer-motion';
import { useUploadContext } from '@/context/UploadContext';


export const ResourceTypeSelector = () => {
  const { selectedType, setSelectedType } = useUploadContext();

  return (
    <div className="space-y-4">
      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Select Resource Type</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(resourceTypes).map(([key, value]) => {
          const Icon = value.icon;
          const isSelected = selectedType === key;

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
                  ${!isSelected ? 'hover:bg-gray-100 hover:border-gray-300 dark:hover:bg-gray-700 dark:hover:border-gray-600' : ''}
                  group
                `}
                onClick={() => setSelectedType(key as ResourceType)}
              >
                <div className={`
                  p-2 rounded-full transition-all duration-300 ease-in-out
                  ${isSelected 
                    ? 'bg-white/20 dark:bg-white/10' 
                    : `${value.color} bg-opacity-10 group-hover:bg-opacity-20 dark:bg-opacity-10 dark:group-hover:bg-opacity-20`
                  }
                `}>
                  <Icon className={`
                    h-6 w-6 
                    ${isSelected ? 'text-white' : value.color}
                    transition-colors duration-300 ease-in-out
                    dark:${isSelected ? 'text-white' : 'text-gray-300'}
                  `} />
                </div>
                <span className={`
                  text-sm font-medium 
                  ${isSelected ? 'text-white' : 'text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white'}
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

export default ResourceTypeSelector;
