import { FileText, Users, Share2 } from "lucide-react";
import { NavigationItem } from "@/types/navigation";

export const navigationConfig: NavigationItem[] = [
  {
    title: "Courses",
    href: "/courses",
    icon: FileText,
  },
  {
    title: "Contributors",
    href: "/contributors",
    icon: Users,
  },
  {
    title: "Upload",
    href: "/upload",
    icon: Share2,
  },
];