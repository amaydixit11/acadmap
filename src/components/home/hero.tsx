import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Share2, 
  ArrowRight, 
  Upload, 
  Sparkles,
  BookOpen,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, useAnimationControls } from "framer-motion";
// import PDFViewer from "../pdf-viewer";
// import CourseDropdown from "./CourseDropdown";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={cn("relative flex flex-col justify-center")}>
      {/* Decorative background elements */}
      <div className={cn("absolute inset-0 -z-10")}>
        <div className={cn(
          "absolute inset-0",
          // "bg-gradient-to-br from-blue-100/20 to-purple-100/20",
          // "dark:from-blue-900/20 dark:to-purple-900/20",
          "rounded-3xl"
        )} />
        <div className={cn(
          "absolute top-10 left-10 w-20 h-20",
          "bg-blue-200/30 dark:bg-blue-800/30",
          "rounded-full blur-2xl"
        )} />
        <div className={cn(
          "absolute bottom-10 right-10 w-32 h-32",
          // "bg-purple-200/30 dark:bg-purple-800/30",
          "rounded-full blur-3xl"
        )} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "relative z-10 space-y-8",
          "text-center lg:text-left",
          "p-6 sm:p-8"
        )}
      >
        {/* Enhanced Badge */}
        <motion.div variants={itemVariants}>
          <Badge 
            variant="secondary" 
            className={cn(
              "inline-flex items-center px-4 py-2",
              "text-sm font-medium cursor-default",
              "transition-all duration-300",
              "hover:bg-blue-50 hover:scale-105",
              "dark:hover:bg-blue-900/30",
              "shadow-sm"
            )}
          >
            <Share2 className={cn("mr-2 h-4 w-4 text-green-500 animate-pulse")} />
            Created by Students, for Students
          </Badge>
        </motion.div>

        {/* Enhanced Typography */}
        <motion.div 
          variants={itemVariants}
          className="space-y-4"
        >
          <h1 className={cn(
            "text-5xl md:text-6xl lg:text-7xl",
            "font-extrabold tracking-tight leading-[1.1]",
            "bg-clip-text text-transparent",
            "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800",
            "dark:from-white dark:via-gray-200 dark:to-gray-300"
          )}>
            AcadMap
            <motion.span 
              className={cn(
                "block text-4xl md:text-5xl lg:text-6xl mt-2",
                "bg-clip-text text-transparent",
                "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600",
                "dark:from-blue-400 dark:via-purple-400 dark:to-blue-400",
                "bg-[length:200%_auto] animate-gradient"
              )}
            >
              Your Academic Compass
            </motion.span>
          </h1>

          <p className={cn(
            "text-xl md:text-2xl",
            "text-gray-600 dark:text-gray-300",
            "max-w-2xl leading-relaxed font-medium"
          )}>
            Tired of asking your mentor for previous year questions?  <br />
            AcadMap makes it easy to find and share academic resources effortlessly.
          </p>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        {/* <CourseDropdown /> */}

        <motion.div 
          variants={itemVariants}
          className={cn(
            "flex flex-col sm:flex-row",
            "justify-center lg:justify-start",
            "items-center gap-4 pt-8"
          )}
        >
          <Button 
            size="lg" 
            className={cn(
              "group relative w-full sm:w-auto overflow-hidden",
              "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600",
              "hover:from-blue-700 hover:via-purple-700 hover:to-blue-700",
              "text-white shadow-lg hover:shadow-xl",
              "transition-all duration-300",
              "bg-[length:200%_auto] animate-gradient"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            asChild
          >
            <Link href="/courses" className={cn("flex items-center justify-center")}>
              <span className={cn("relative z-10 flex items-center")}>
                Explore Courses
                <ArrowRight className={cn(
                  "ml-2 h-4 w-4",
                  "transition-transform group-hover:translate-x-1"
                )} />
              </span>
            </Link>
          </Button>

          <Button 
            size="lg" 
            variant="outline" 
            className={cn(
              "group w-full sm:w-auto",
              "border-2 hover:border-blue-500",
              "hover:bg-blue-50 dark:hover:bg-blue-950/30",
              "backdrop-blur-sm",
              "shadow-sm hover:shadow-md",
              "transition-all duration-300"
            )}
            asChild
          >
            <Link href="/upload" className={cn("flex items-center justify-center")}>
              <Upload className={cn(
                "mr-2 h-4 w-4",
                "group-hover:text-blue-600",
                "transition-transform group-hover:scale-110"
              )} />
              Share Resources
            </Link>
          </Button>
        </motion.div>
      </motion.div>
      {/* <iframe 
        src="https://raw.githubusercontent.com/acadmap/CSL252-2025/main/lecture/Algorithm_tutorial_problem.pdf" 
        width="100%" 
        height="600px">
      </iframe> */}

    </div>
  );
}