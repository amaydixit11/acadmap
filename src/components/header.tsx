"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ModeToggle } from "@/components/mode-toggle";
import { 
  Search, 
  BookOpen, 
  Menu, 
  User, 
  GraduationCap, 
  CalendarDays, 
  LibraryBig 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationConfig = [
  {
    title: "Courses",
    href: "/courses",
    icon: <GraduationCap className="mr-2 h-4 w-4" />,
  },
  {
    title: "Resources",
    href: "/resources",
    icon: <LibraryBig className="mr-2 h-4 w-4" />,
  },
  {
    title: "Study Groups",
    href: "/study-groups",
    icon: <User className="mr-2 h-4 w-4" />,
  },
  {
    title: "Events",
    href: "/events",
    icon: <CalendarDays className="mr-2 h-4 w-4" />,
  }
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          aria-label="IIT Bhilai Home"
        >
          <BookOpen className="h-6 w-6" />
          <span className="font-bold text-lg">IIT Bhilai</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-1">
          {navigationConfig.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                "disabled:pointer-events-none disabled:opacity-50"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="icon" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-4">
              {navigationConfig.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={cn(
                    "flex items-center rounded-md px-4 py-2 text-sm font-medium",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "transition-colors"
                  )}
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Dialog */}
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-accent"
                aria-label="Search courses and resources"
              >
                <Search className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Search</DialogTitle>
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <Input 
                  placeholder="Search courses, resources..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                  aria-label="Search input"
                />
                <Button type="submit">Search</Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Theme Toggle */}
          <ModeToggle />

          {/* Sign In Button */}
          <Button variant="default" className="hidden sm:inline-flex">
            <User className="mr-2 h-4 w-4" />
            Sign In
          </Button>
          <Button variant="ghost" size="icon" className="sm:hidden">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}