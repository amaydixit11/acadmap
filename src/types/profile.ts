import {
    User,
    Mail,
    Phone,
    Building2,
    Edit2,
    Save,
    GraduationCap,
    AlertCircle,
    Linkedin,
    ImagePlus,
    X,
    LucideProps,
  } from "lucide-react";
  import { ProfileModel } from "@/models/profile";
import { Department } from "./courses";

export interface ProfileField {
    icon: React.FC<LucideProps>; 
    label: string;
    key: keyof ProfileModel;
    type?: string;
    required?: boolean;
    validation?: (value: string) => boolean;
    component?: "input" | "textarea" | "select";
    options?: string[];
  }


export const profileFields: ProfileField[] = [
    { 
      key: "name", 
      icon: User, 
      label: "Full Name",
      required: true,
      validation: (value) => value.length >= 2
    },
    { 
      key: "email", 
      icon: Mail, 
      label: "Email",
      type: "email",
      required: true,
      validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },
    { 
      key: "role", 
      icon: GraduationCap, 
      label: "Role",
      component: "select",
      required: true,
      // options: ['student', 'external', 'alumni']
      options: []
    },
    { 
      key: "mobile", 
      icon: Phone, 
      label: "Mobile Number",
      type: "tel",
      validation: (value) => /^\+?[\d\s-]{10,}$/.test(value)
    },
    { 
      key: "department", 
      icon: Building2, 
      label: "Department",
      component: "select",
      options: Object.values(Department).sort()
    },
    { 
      key: "batch", 
      icon: GraduationCap, 
      label: "Graduation Batch",
      component: "select",
      options: [...Array.from({ length: new Date().getFullYear() + 6 - 2020 + 1 }, (_, index) => (2020 + index).toString())]
    },
    {
      key: "linkedin_url",
      icon: Linkedin,
      label: "LinkedIn Profile",
      type: "url",
      validation: (value) => value ? /^https:\/\/[a-zA-Z0-9-]+\.linkedin\.com/.test(value) : true
    },
    {
      key: "bio",
      icon: User,
      label: "Bio",
      component: "textarea"
    }
  ];