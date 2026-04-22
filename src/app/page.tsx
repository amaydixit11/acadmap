"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  X,
  ChevronRight,
  Monitor,
  Layout,
  BookMarked,
  ArrowUpRight,
  User,
  Zap,
  Layers,
  SearchCode
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { AnimatedCounter } from "@/components/home/AnimatedCounter";
import { useSearch } from "@/context/SearchContext";
import { getResourceCategoryIcon } from "@/lib/resources";
import { useResources } from "@/hooks/useResources";
import { FeaturedCourseCard } from "@/components/home/FeaturedCourseCard";

const quickActions = [
  { 
    title: "Courses", 
    description: "Browse curated syllabus breakdowns and module guides.",
    href: "/courses", 
    icon: BookMarked,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  { 
    title: "Resources", 
    description: "Access 500+ premium study materials and PDFs.",
    href: "/resources", 
    icon: Layers,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
  },
  { 
    title: "Timetable", 
    description: "Plan your academic sprint with our dynamic scheduler.",
    href: "/time-table", 
    icon: Calendar,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
  },
  { 
    title: "Upload", 
    description: "Contribute to the vault and earn intellectual badges.",
    href: "/upload", 
    icon: Upload,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
  },
];

const trendingUploads = [
  { title: "Algorithms PYQ 2023", uploader: "Dr. Miller", time: "2 HOURS AGO", icon: FileText, color: "text-blue-500" },
  { title: "OS Kernel Notes - Vol 1", uploader: "S. Chen", time: "5 HOURS AGO", icon: SearchCode, color: "text-emerald-500" },
  { title: "Macroeconomics Cheat Sheet", uploader: "L. Parker", time: "1 DAY AGO", icon: BookOpen, color: "text-amber-500" },
  { title: "Statistics Lab Report #4", uploader: "M. Rossi", time: "1 DAY AGO", icon: TrendingUp, color: "text-purple-500" },
];

import { useSiteStats } from "@/hooks/useSiteStats";
import { useCourses } from "@/hooks/useCourses";

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const [greeting, setGreeting] = useState("Welcome");
  const [showBanner, setShowBanner] = useState(true);
  const { setIsOpen } = useSearch();
  const { totalResources, totalCourses, totalContributors } = useSiteStats();
  const { courses } = useCourses();
  const { resources: allResources } = useResources();
  const featuredCourse = courses[0];
  const realTrendingUploads = allResources.slice(0, 4);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const firstName = user?.user_metadata?.full_name?.split(' ')[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      
      {/* 📣 Announcement Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary text-primary-foreground relative overflow-hidden"
          >
            <div className="container mx-auto px-4 py-3 max-w-7xl flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Badge className="bg-white/20 text-white border-0 hover:bg-white/30 transition-colors">
                  New
                </Badge>
                <span className="font-medium">
                  Check out the Saving and Editing Timetables features.
                </span>
              </div>
              <button 
                onClick={() => setShowBanner(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="space-y-24 pb-24">
        {/* 2. Hero Section */}
        <section className="relative pt-24 px-4 max-w-7xl mx-auto overflow-hidden">
          {/* Background Decorative Blobs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] -z-10" />
          <div className="absolute top-48 -left-24 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[80px] -z-10" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge 
              variant="outline" 
              className="mb-8 px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full bg-muted/50 backdrop-blur-sm border-border text-muted-foreground"
            >
              Academic Excellence Refined
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8">
              <span className="text-primary">
                Your Academic Blueprint.
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto mb-12">
              A curated digital archive designed for high-performance students. 
              Share, discover, and organize elite academic resources with surgical precision.
            </p>

            {/* 3. Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1f108e] to-[#10b981] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className={cn(
                      "w-full h-16 justify-start text-slate-400 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 shadow-xl transition-all",
                      "bg-white dark:bg-slate-950 hover:bg-white dark:hover:bg-slate-900 font-normal outline-none focus-visible:ring-0"
                    )}
                    onClick={() => setIsOpen(true)}
                  >
                    <Search className="mr-4 h-6 w-6 text-muted-foreground" />
                    <span className="text-lg">Search for courses, notes, or contributors...</span>
                    <div className="ml-auto hidden sm:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                       <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">CMD</span>
                       <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">K</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 4. Quick Action Grid */}
        <section className="px-4 max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {quickActions.map((action, idx) => (
              <motion.div key={action.title} variants={itemVariants}>
                <Link href={action.href} className="group">
                  <div className={cn(
                    "h-full p-8 rounded-xl border border-border transition-all duration-300",
                    "bg-card relative overflow-hidden",
                    "hover:shadow-lg hover:border-primary/20"
                  )}>
                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500",
                      action.color
                    )}>
                      <action.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 dark:text-white">
                      {action.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 5. Stats Section */}
        <section className="px-4 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-px bg-border rounded-xl"
          >
            <div className="bg-card rounded-xl p-12 md:p-16 flex flex-col md:flex-row justify-around items-center text-center gap-12 text-foreground">
              <div className="space-y-2">
                <div className="text-6xl font-black tracking-tighter text-primary">
                  <AnimatedCounter value={totalResources} suffix="+" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Curated Resources</div>
              </div>
              <div className="hidden md:block w-px h-20 bg-border" />
              <div className="space-y-2">
                <div className="text-6xl font-black tracking-tighter text-primary">
                  <AnimatedCounter value={totalCourses} suffix="+" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Courses</div>
              </div>
              <div className="hidden md:block w-px h-20 bg-border" />
              <div className="space-y-2">
                <div className="text-6xl font-black tracking-tighter text-primary">
                  <AnimatedCounter value={totalContributors} suffix="+" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Contributors</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 6. Trending Activity */}
        <section className="px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Featured Course */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-4xl font-bold tracking-tight mb-3 dark:text-white">Trending Courses</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg">Most active academic pathways this week.</p>
                </div>
                <Button variant="link" className="text-primary font-bold group h-auto p-0" asChild>
                  <Link href="/courses">
                    Explore all <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
              
              {featuredCourse ? (
                <FeaturedCourseCard course={featuredCourse} />
              ) : (
                <div className="h-[500px] rounded-[3rem] bg-slate-100 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 flex items-center justify-center">
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Initializing Pathways...</p>
                </div>
              )}
            </motion.div>

            {/* Right: Recent Uploads */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black tracking-tight dark:text-white">Live Chronicles</h2>
                <Link href="/resources" className="text-xs font-black uppercase tracking-widest text-primary hover:underline">Archive ↗</Link>
              </div>
              <div className="space-y-4">
                {realTrendingUploads.length > 0 ? realTrendingUploads.map((item, idx) => {
                  const CategoryIcon = getResourceCategoryIcon(item.category);
                  return (
                    <Link key={item.resourceId} href={item.url} target="_blank" className="block group">
                      <div className={cn(
                        "flex gap-5 p-5 rounded-xl border border-transparent transition-all duration-300",
                        "hover:bg-card hover:border-border hover:shadow-lg"
                      )}>
                        <div className="w-14 h-14 bg-muted rounded-xl flex-shrink-0 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          <CategoryIcon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-1">
                             <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tighter px-1.5 py-0 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
                               {item.course_code || 'IITB'}
                             </Badge>
                             <h4 className="text-sm font-bold truncate dark:text-white">{item.title}</h4>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                            <span>Contribution by <span className="text-slate-900 dark:text-white font-black">{item.uploadedBy}</span></span>
                            <span>•</span>
                            <span>{new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                }) : (
                  <div className="py-12 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
                     <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Awaiting Archives...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 7. Community CTA */}
        {!isAuthenticated && (
          <section className="px-4 max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-xl overflow-hidden bg-primary p-12 md:p-20 text-center"
            >
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl opacity-50" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl opacity-50" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <Users className="h-16 w-16 mx-auto mb-8 text-indigo-100/50" />
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Join the Community</h2>
                <p className="text-xl text-indigo-100 mb-12 font-medium opacity-80">
                  Sign in to bookmark resources, save timetables, and contribute to the collective knowledge of IIT Bhilai.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-background text-primary hover:bg-muted rounded-xl h-14 px-10 text-lg font-bold shadow-xl border-0" asChild>
                    <Link href="/sign-in">Sign In Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 rounded-xl h-14 px-10 text-lg font-bold" asChild>
                    <Link href="/courses">Browse First</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Authenticated User Quick Access */}
        {isAuthenticated && (
          <section className="px-4 max-w-7xl mx-auto">
             <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-xl shadow-indigo-500/5">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-border flex items-center justify-center p-px transition-colors">
                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden border border-border">
                       <User className="h-10 w-10 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold dark:text-white">
                      {greeting}{firstName ? `, ${firstName}` : ''}! 👋
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Ready for your next academic sprint?</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button variant="outline" className="rounded-xl h-12" asChild>
                    <Link href="/bookmarks" className="gap-2">
                       <BookMarked className="h-4 w-4" /> My Bookmarks
                    </Link>
                  </Button>
                  <Button variant="outline" className="rounded-xl h-12" asChild>
                    <Link href="/time-table" className="gap-2">
                       <Layout className="h-4 w-4" /> My Timetables
                    </Link>
                  </Button>
                  <Button variant="outline" className="rounded-xl h-12" asChild>
                    <Link href="/profile" className="gap-2">
                       <User className="h-4 w-4" /> My Profile
                    </Link>
                  </Button>
                </div>
             </div>
          </section>
        )}
      </main>
    </div>
  );
}