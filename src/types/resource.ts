import { Book, File, FileQuestion, FileText, GraduationCap, LinkIcon, Pencil, Video, Image, Paperclip, Microscope } from "lucide-react";

// src/types/resource.ts
export const resourceTypes = {
    document: { 
      label: "Document", 
      icon: FileText, 
      color: "text-blue-500", 
      accept: ".pdf,.xlsx,.xls,.ppt,.pptx,.doc,.docx,.txt,.csv,.rtf,.odt,.html"
    },
    image: { label: "Image Content", icon: Image, color: "text-yellow-500", accept: ".png,.jpg,.jpeg,.webp,.bmp,.tiff,.svg," },
    video: { label: "Video Content", icon: Video, color: "text-green-500", accept: ".mp4,.avi,.mov" },
    link: { label: "External Link", icon: LinkIcon, color: "text-purple-500", accept: "" },
    archive: { label: "Archive File", icon: File, color: "text-red-500", accept: ".zip,.rar,.7z" },
    other: { label: "Other Resource", icon: File, color: "text-gray-500", accept: "*" }
  };
  
  export const resourceCategories = {
    lecture: { label: "Lecture Materials", icon: Book },
    assignment: { label: "Assignment Resources", icon: Pencil },
    tutorial: { label: "Tutorial Content", icon: GraduationCap },
    pyq: { label: "Previous Year Questions", icon: FileQuestion },
    lab: { label: "Labs", icon:  Microscope},
    unclassified: { label: "Unclassified", icon: Paperclip },
  };
  
  export type ResourceType = keyof typeof resourceTypes;
  export type ResourceCategory = keyof typeof resourceCategories;