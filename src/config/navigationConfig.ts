import { FileText, Users, Share2, Search, Calendar } from "lucide-react";
import { NavigationItem } from "@/types/navigation";

export const navigationConfig: NavigationItem[] = [
  {
    title: "Courses",
    href: "/courses",
    icon: FileText,
  },
  {
    title: "Resources",
    href: "/resources",
    icon: FileText,
  },
  {
    title: "Groups",
    href: "/groups",
    icon: Search,
  },
  {
    title: "Contributors",
    href: "/contributors",
    icon: Users,
  },
  {
    title: "Timetable",
    href: "/time-table",
    icon: Calendar,
  },
  {
    title: "Upload",
    href: "/upload",
    icon: Share2,
  },
];