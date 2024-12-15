import { UploadFormData } from "@/types/upload"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { FileUploader } from "./FileUploader";
import { ResourceType } from "@/types/resource";

interface ResourceDataProps{
    formData: UploadFormData;
    selectedType: ResourceType;
    updateFormData: (updates: Partial<UploadFormData>) => void;
    onFilesChange: (files: File[]) => void;
}

const ResourceData = ({formData, updateFormData, selectedType, onFilesChange}: ResourceDataProps) => {
  return (
    <>
        <div className="space-y-2">
            <Label htmlFor="title">Resource Title</Label>
            <Input
                id="title"
                value={formData.title}
                onChange={e => updateFormData({ title: e.target.value })}
                placeholder="e.g., Week 1 Lecture Notes"
                required
            />
        </div>

        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
                id="description"
                value={formData.description}
                onChange={e => updateFormData({ description: e.target.value })}
                placeholder="Briefly describe what's included in these materials..."
                className="min-h-[100px]"
            />
        </div>

        <div className="space-y-2">
            <Label>Academic Year</Label>
            <Input 
                type="number"
                value={formData.year}
                onChange={e => updateFormData({ year: e.target.value })}
                min={2000}
                max={new Date().getFullYear()}
            />
        </div>

        {selectedType === 'link' ? (
        <div className="space-y-2">
            <Label htmlFor="url">Resource URL</Label>
            <Input
            id="url"
            type="url"
            value={formData.url}
            onChange={e => updateFormData({ url: e.target.value })}
            placeholder="https://"
            required
            />
        </div>
        ) : (
        <FileUploader 
            resourceType={selectedType}
            onFilesChange={onFilesChange}
        />
        )}
    </>
  )
}

export default ResourceData
