"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Share2, 
  Download 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Hero() {

  return (
      <div className="space-y-6">
        <Badge variant="secondary" className="px-3 py-1">
          <Share2 className="mr-2 h-4 w-4 text-green-500" />
          By Students, For Students
        </Badge>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          Unlock Collective 
          <span className="block text-blue-600">Learning Resources</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-xl">
          A student-driven platform where peers share course materials, notes, and insights to help each other succeed.
        </p>
        
        <div className="flex space-x-4">
          <Button size="lg" asChild>
            <Link href="/resources">
              Browse Resources
              <Download className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/upload">
              Contribute Materials
            </Link>
          </Button>
        </div>
      </div>
  );
}