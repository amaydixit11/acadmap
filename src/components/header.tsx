"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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

const navigationConfig = [
  {
    title: "Courses",
    href: "/courses",
    icon: <GraduationCap className="mr-2 h-4 w-4" />,
    description: "Explore our comprehensive course offerings"
  },
  {
    title: "Resources",
    href: "/resources",
    icon: <LibraryBig className="mr-2 h-4 w-4" />,
    description: "Access study materials and learning resources"
  },
  {
    title: "Study Groups",
    href: "/study-groups",
    icon: <User className="mr-2 h-4 w-4" />,
    description: "Connect with fellow students and collaborate"
  },
  {
    title: "Events",
    href: "/events",
    icon: <CalendarDays className="mr-2 h-4 w-4" />,
    description: "Upcoming academic and campus events"
  }
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="font-bold text-lg">IIT Bhilai</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            {navigationConfig.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuTrigger className="bg-transparent">
                  <div className="flex items-center">
                    {item.icon}
                    {item.title}
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className="block p-4 hover:bg-accent">
                      <div className="flex items-center">
                        {item.icon}
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
          <NavigationMenuViewport />
        </NavigationMenu>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="mt-6 grid gap-4">
              {navigationConfig.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="flex items-center p-2 rounded-md hover:bg-accent"
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className="flex items-center space-x-2">
                <Input 
                  placeholder="Search courses, resources..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button>Search</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Theme Toggle */}
          <ModeToggle />

          {/* Sign In Button */}
          <Button>
            <User className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}