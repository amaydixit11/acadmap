// src/components/ResourceTypeSelector.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ResourceType, resourceTypes } from '@/types/resource';


interface ResourceTypeSelectorProps {
  selectedType: ResourceType;
  onTypeChange: (type: ResourceType) => void;
}

export const ResourceTypeSelector: React.FC<ResourceTypeSelectorProps> = ({ 
  selectedType, 
  onTypeChange 
}) => {
  return (
    <div className="space-y-2">
      <Label>Resource Type</Label>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {Object.entries(resourceTypes).map(([key, value]) => {
          const Icon = value.icon;
          return (
            <Button
              key={key}
              type="button"
              variant={selectedType === key ? "default" : "outline"}
              className="h-20 flex flex-col gap-2"
              onClick={() => onTypeChange(key as ResourceType)}
            >
              {/* <Icon className={`h-5 w-5 ${value.color}`} /> */}
              <span className="text-xs">{value.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};