// src/components/FileUploader.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ResourceType, resourceTypes } from '@/types/resource';


interface FileUploaderProps {
  resourceType: ResourceType;
  onFilesChange: (files: File[]) => void;
  failedFiles?: File[];
  onClearFailed?: () => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  resourceType,
  onFilesChange,
  failedFiles = [],
  onClearFailed
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      
      const validFiles = selectedFiles.filter(file => file.size <= 100 * 1024 * 1024);
      
      if (validFiles.length !== selectedFiles.length) {
        setUploadError('Some files exceed the 100MB size limit and were not added.');
      }
      
      setFiles(validFiles);
      onFilesChange(validFiles);
    }
  };

  const removeFile = (indexToRemove: number) => {
    const newFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
          multiple
          accept={resourceTypes[resourceType].accept}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer space-y-4 block"
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <div className="space-y-2">
            <h3 className="font-medium">Drop files here or click to browse</h3>
            <p className="text-sm text-muted-foreground">
              Maximum file size: 100MB
            </p>
          </div>
        </label>
      </div>

      {uploadError && (
        <div className="text-red-500 text-sm">{uploadError}</div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <Label>Selected Files</Label>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-md">
                <FileText className="h-4 w-4" />
                <span className="text-sm flex-1">{file.name}</span>
                <Badge variant="secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {failedFiles.length > 0 && (
        <div className="space-y-2 pt-4">
          <div className="flex items-center justify-between">
            <Label className="text-red-500">Failed Uploads</Label>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs text-red-500 hover:text-red-600"
              onClick={onClearFailed}
            >
              Clear All
            </Button>
          </div>
          <div className="space-y-2">
            {failedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm flex-1 text-red-600 dark:text-red-400">{file.name}</span>
                <Badge variant="destructive" className="text-[10px]">${(file.size / 1024 / 1024).toFixed(2)} MB</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};