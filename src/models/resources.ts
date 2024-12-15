export interface ResourceModel { 
    resourceId: string;
    course_code: string;
    title: string;
    type: 'document' | 'video' | 'image' | 'archive' | 'link' | 'other';
    category: 'lecture' | 'tutorial' | 'assignment' | 'pyq' | 'lab' | 'unclassified'
    url: string;
    uploadedBy: string;
    description ?: string;
    year: number;
  } 