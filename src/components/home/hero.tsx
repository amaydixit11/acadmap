"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Share2, ArrowRight, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <div className="relative container mx-auto px-4 py-16 md:py-24 flex flex-col justify-center">

      <div className="relative z-10 space-y-6 text-center md:text-left max-w-4xl mx-auto">
        {/* Badge with Subtle Hover Effect */}
        <Badge 
          variant="secondary" 
          className="inline-flex items-center px-3 py-1 transition-all duration-300 
          hover:bg-blue-50 hover:shadow-sm dark:hover:bg-blue-900/30"
        >
          <Share2 className="mr-2 h-4 w-4 text-green-500" />
          By the Students, For the Students
        </Badge>

        {/* Headline with Refined Typography */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight 
          text-gray-900 dark:text-white leading-[1.1]">
          AcadMap{" "}
          <span className="text-3xl md:text-4xl lg:text-5xl block text-blue-600 dark:text-blue-400">
            Your Academic GPS
          </span>
        </h1>

        {/* Subheading with Improved Readability */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 
          max-w-2xl mx-auto md:mx-0 leading-relaxed">
          A student-driven platform where peers share course materials, notes, and insights 
          to help each other navigate the academic journey with confidence.
        </p>

        {/* Action Buttons with Enhanced Interaction */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-start 
          items-center sm:space-x-4 space-y-4 sm:space-y-0 pt-6">
          <Button 
            size="lg" 
            className="group w-full sm:w-auto" 
            asChild
          >
            <Link href="/courses" className="flex items-center justify-center">
              Browse Courses
              <ArrowRight 
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" 
              />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="group w-full sm:w-auto" 
            asChild
          >
            <Link href="/upload" className="flex items-center justify-center">
              <Upload className="mr-2 h-4 w-4 text-gray-500 group-hover:text-blue-600" />
              Contribute Materials
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}