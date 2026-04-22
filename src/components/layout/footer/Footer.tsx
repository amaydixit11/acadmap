"use client";

import Link from "next/link";
import { Logo } from "../Logo";
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50/50 dark:bg-slate-900/50 border-t border-border mt-12 transition-colors">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Branding */}
          <div className="flex flex-col space-y-6 col-span-1 md:col-span-1">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The Intellectual Curator for IIT Bhilai. Empowering students with precision-curated academic archives.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/amaydixit11"
                target="_blank"
                className="w-10 h-10 rounded-lg bg-card flex items-center justify-center border border-border text-muted-foreground hover:text-primary transition-all shadow-sm"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/amay-dixit-462113284/"
                target="_blank"
                className="w-10 h-10 rounded-lg bg-card flex items-center justify-center border border-border text-muted-foreground hover:text-primary transition-all shadow-sm"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/amaydixit05/"
                target="_blank"
                className="w-10 h-10 rounded-lg bg-card flex items-center justify-center border border-border text-muted-foreground hover:text-primary transition-all shadow-sm"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Platform</h4>
            <nav className="flex flex-col space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Courses", href: "/courses" },
                { label: "Resources", href: "/resources" },
                { label: "Study Groups", href: "/groups" },
                { label: "Contributors", href: "/contributors" },
                { label: "Timetable", href: "/time-table" }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Legal</h4>
            <nav className="flex flex-col space-y-3">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Support", href: "/support" }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Community</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Join our growing community of student contributors. Help others excel.
            </p>
            <Link 
              href="/upload" 
              className="inline-flex items-center text-sm font-bold text-primary hover:underline decoration-2 underline-offset-4"
            >
              Upload Material →
            </Link>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AcadMap. The Intellectual Curator. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with precision by <span className="text-foreground font-medium">Amay Dixit</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
