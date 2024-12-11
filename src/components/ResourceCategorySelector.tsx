// src/components/ResourceCategorySelector.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { resourceCategories, ResourceCategory } from '@/types/resource';

interface ResourceCategorySelectorProps {
  selectedCategory: ResourceCategory;
  onCategoryChange: (category: ResourceCategory) => void;
}

export const ResourceCategorySelector: React.FC<ResourceCategorySelectorProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="space-y-2">
      <Label>Resource Category</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {Object.entries(resourceCategories).map(([key, value]) => {
          const Icon = value.icon;
          return (
            <Button
              key={key}
              type="button"
              variant={selectedCategory === key ? "default" : "outline"}
              className="h-24 flex flex-col gap-2"
              onClick={() => onCategoryChange(key as ResourceCategory)}
            >
              <Icon className="h-6 w-6" />
              <span className="text-sm">{value.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};