import React from 'react'
import { Button } from '../ui/button'
import { Upload } from 'lucide-react';

interface UploadButtonProps{
    isDisabled: boolean;
    onClick: (e: React.FormEvent) => Promise<void>
}

const UploadButton = ({isDisabled, onClick}: UploadButtonProps) => {
  return (
    <Button 
        type="submit" 
        className="w-full"
        disabled={isDisabled}
        onClick={onClick}
    >
        {isDisabled ? (
        <span className="flex items-center">
            <Upload className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
        </span>
        ) : (
        <span className="flex items-center">
            <Upload className="mr-2 h-4 w-4" />
            Upload Resource
        </span>
        )}
    </Button>
  )
}

export default UploadButton
