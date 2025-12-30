"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Upload, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  Users,
  FileText,
  Clock,
  Sparkles,
  Search,
  GraduationCap,
  Megaphone,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { GlobalSearchDialog } from "@/components/search/GlobalSearchDialog";
import { AnimatedCounter } from "@/components/home/AnimatedCounter";
import { useSearch } from "@/context/SearchContext";

const quickLinks = [
  { 
    title: "Browse Courses", 
    description: "Explore all available courses",
    href: "/courses", 
    icon: BookOpen,
    color: "bg-blue-500"
  },
  { 
    title: "Resources", 
    description: "PYQs, Notes, Tutorials",
    href: "/resources", 
    icon: FileText,
    color: "bg-emerald-500"
  },
  { 
    title: "Timetable", 
    description: "Plan your schedule",
    href: "/time-table", 
    icon: Calendar,
    color: "bg-purple-500"
  },
  { 
    title: "Upload", 
    description: "Share your resources",
    href: "/upload", 
    icon: Upload,
    color: "bg-amber-500"
  },
];

const popularCourses = [
  { code: "CSL101", name: "Data Structures", resources: 45 },
  { code: "CSL201", name: "Algorithms", resources: 38 },
  { code: "MAT101", name: "Linear Algebra", resources: 32 },
  { code: "PHY101", name: "Physics I", resources: 28 },
  { code: "CSL301", name: "Operating Systems", resources: 25 },
];

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const [greeting, setGreeting] = useState("Welcome");
  const [showBanner, setShowBanner] = useState(true);
  const { setIsOpen } = useSearch();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const firstName = user?.user_metadata?.full_name?.split(' ')[0];

  return (
    <div className={cn("min-h-screen")}>
      
      {/* 📣 Announcement Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 text-white relative overflow-hidden"
          >
            <div className="container mx-auto px-4 py-3 max-w-7xl flex items-center justify-between text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                  New
                </Badge>
                <span className="font-medium">
                  Check out the Saving and Editing Timetables features.
                </span>
              </div>
              <button 
                onClick={() => setShowBanner(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Compact branding */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge 
              variant="secondary" 
              className="mb-4 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/40"
            >
              <GraduationCap className="mr-1.5 h-3.5 w-3.5" />
              IIT Bhilai
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                AcadMap
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Tired of chasing seniors for previous year questions? 
              <span className="block sm:inline"> AcadMap makes finding and sharing academic resources effortless.</span>
            </p>

            {/* ✨ Search Bar in Hero */}
            <div className="max-w-xl mx-auto mb-8 relative group">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <Button 
                variant="outline" 
                className={cn(
                  "relative z-10 w-full h-12 md:h-14 justify-start text-muted-foreground border-2 rounded-full px-6 shadow-sm hover:shadow-md transition-all",
                  "bg-white dark:bg-black/40 dark:border-white/10"
                )}
                onClick={() => setIsOpen(true)}
              >
                <Search className="mr-2 h-5 w-5 md:h-6 md:w-6 text-blue-500" />
                <span className="text-base md:text-lg">Search courses, resources, users...</span>
                <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground/60 bg-muted/50 px-2 py-1 rounded-md">
                   <span className="text-xs">⌘</span>K
                </div>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
                <Link href="/upload">
                  Want to contribute? <span className="underline ml-1">Upload Resource</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Section */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Personalized Greeting for logged-in users */}
        {isAuthenticated && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {greeting}{firstName ? `, ${firstName}` : ''}! 👋
            </h2>
          </motion.div>
        )}

        {/* Quick Actions Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className={cn(
                "h-full hover:shadow-lg transition-all duration-200 cursor-pointer",
                "hover:scale-[1.02] hover:border-gray-300 dark:hover:border-gray-600",
                "bg-white dark:bg-neutral-900"
              )}>
                <CardContent className="p-4 sm:p-6">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                    link.color
                  )}>
                    <link.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {link.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Popular Courses */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white dark:bg-neutral-900">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    Popular Courses
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/courses" className="text-sm">
                      View all <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="divide-y dark:divide-gray-800">
                  {popularCourses.map((course) => (
                    <Link 
                      key={course.code}
                      href={`/courses/${course.code.toLowerCase()}`}
                      className="flex items-center justify-between py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-4 px-4 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono">
                          {course.code}
                        </Badge>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {course.name}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {course.resources} resources
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* 🔢 Stats Card with Animations */}
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Sparkles className="w-24 h-24" />
              </div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-medium">Platform Stats</span>
                </div>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <div className="text-3xl font-bold flex items-baseline">
                      <AnimatedCounter value={500} suffix="+" />
                    </div>
                    <div className="text-sm text-white/80">Resources</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold flex items-baseline">
                      <AnimatedCounter value={50} suffix="+" />
                    </div>
                    <div className="text-sm text-white/80">Courses</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold flex items-baseline">
                      <AnimatedCounter value={100} suffix="+" />
                    </div>
                    <div className="text-sm text-white/80">Contributors</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">Free</div>
                    <div className="text-sm text-white/80">Forever</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Quick Actions */}
            {isAuthenticated ? (
              <Card className="bg-white dark:bg-neutral-900">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/bookmarks">
                      <BookOpen className="mr-2 h-4 w-4" />
                      My Bookmarks
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/time-table">
                      <Calendar className="mr-2 h-4 w-4" />
                      My Timetables
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/profile">
                      <Users className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white dark:bg-neutral-900">
                <CardContent className="p-6 text-center">
                  <Users className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Join the Community
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Sign in to bookmark resources, save timetables, and contribute.
                  </p>
                  <Button className="w-full" asChild>
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}