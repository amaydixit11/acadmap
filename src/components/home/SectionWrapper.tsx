import { ReactNode } from "react";

// Common section wrapper component
export const SectionWrapper = ({ 
  children, 
  className = "", 
  gradientFrom = "", 
  gradientTo = "" 
}: { 
  children?: ReactNode, 
  className?: string, 
  gradientFrom?: string,
  gradientTo?: string
}) => (
  <section className={`relative py-16 lg:py-24 overflow-hidden ${className}`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo}`} />
    <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </section>
);
