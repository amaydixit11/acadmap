import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <Link 
    href="/" 
    className={cn("flex items-center space-x-3 group transition-all", className)}
    aria-label="AcadMap Home"
  >
    <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
      <img 
        src="/logo_icon.png" 
        alt="AcadMap" 
        className="h-full w-full object-contain" 
      />
    </div>
    <span className="font-black text-2xl tracking-tighter text-foreground uppercase transition-colors group-hover:opacity-70">
      AcadMap
    </span>
  </Link>
);