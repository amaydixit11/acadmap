import { BookOpen, ChevronRight, Home } from 'lucide-react';
import { cn } from "@/lib/utils";
import Link from 'next/link';

const CoursePageHeader = () => {
  return (
    <header className="mb-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Catalog</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Course Catalog
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
            Discover peer-reviewed resources for all IIT Bhilai departments. 
            A curated archive for high-performance students.
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-card p-1.5 rounded-xl border border-border shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-3">Sort by</span>
          <select className="bg-transparent border-none focus:ring-0 text-sm font-bold text-primary cursor-pointer pr-8">
            <option>Most Resources</option>
            <option>Course Code</option>
            <option>Recent</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default CoursePageHeader;