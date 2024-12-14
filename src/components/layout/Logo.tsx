import Link from "next/link";
import { Share2 } from "lucide-react";

export const Logo = () => (
  <Link 
    href="/" 
    className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
    aria-label="Student Resource Hub"
  >
    <Share2 className="h-6 w-6" />
    <span className="font-bold text-lg tracking-tight">Student Resources</span>
  </Link>
);