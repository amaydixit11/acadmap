import { Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { uploadResource } from "@/lib/resources";
import UploadResourcesButton from "./UploadResourcesButton";

interface NoResourcesProps {
  courseCode: string;
  user?: User | null;
  selectedResourceType: string;
  resourceTypes: Array<{ value: string; label: string; }>;
  year: string;
}

export function NoResources({courseCode, user, selectedResourceType, resourceTypes, year }: NoResourcesProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl">
      <Filter className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
      <p className="text-muted-foreground mb-4 text-center">
        No resources found for the selected filters
      </p>
      {user ? (
        <UploadResourcesButton 
          onClick={() => uploadResource({resourceType: selectedResourceType, courseCode: courseCode, year: year})}
          text={`Upload ${resourceTypes.find(t => t.value === selectedResourceType)?.label}`}
        />
      ) : (
        <p className="text-muted-foreground text-sm">Sign In To Upload</p>
      )}
    </div>
  );
}