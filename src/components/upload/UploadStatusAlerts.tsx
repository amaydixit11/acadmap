// src/components/upload/UploadStatusAlert.tsx
import React from 'react';
import { FileText, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadStatus } from '@/types/upload';

interface UploadStatusAlertProps {
  uploadStatus: UploadStatus;
}

export const UploadStatusAlert: React.FC<UploadStatusAlertProps> = ({ uploadStatus }) => {
  if (!uploadStatus.type) return null;

  return (
    <Alert variant={uploadStatus.type === 'success' ? 'default' : 'destructive'}>
      {uploadStatus.type === 'success' ? (
        <FileText className="h-5 w-5 text-green-600" />
      ) : (
        <AlertTriangle className="h-5 w-5 text-red-600" />
      )}
      <AlertTitle>{uploadStatus.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
      <AlertDescription>{uploadStatus.message}</AlertDescription>
    </Alert>
  );
};