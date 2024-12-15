"use client";

import Link from "next/link";
import { Logo } from "../Logo";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Branding */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <Logo 
            //   className="h-8 w-8"
               />
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Empowering students with the tools and resources they need to succeed.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Quick Links</h4>
              <nav className="space-y-2">
                <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Home
                </Link>
                <Link href="/courses" className="text-sm text-gray-600 hover:text-blue-600 transition-colors block">
                  Courses
                </Link>
                <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors block">
                  About Us
                </Link>
              </nav>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Legal</h4>
              <nav className="space-y-2">
                <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors block">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="text-sm text-gray-600 hover:text-blue-600 transition-colors block">
                  Terms of Service
                </Link>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors block">
                  Contact
                </Link>
              </nav>
            </div>
          </div>

          {/* Social and Newsletter */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <Link href="https://github.com/amaydixit11" target="_blank" className="text-gray-600 hover:text-gray-800 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://www.linkedin.com/in/amay-dixit-462113284/" target="_blank" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/amaydixit05/" target="_blank" className="text-gray-600 hover:text-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Student Resources. All rights reserved.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-center text-xs text-gray-500">
          Crafted with ❤️ by Amay Dixit
        </div>
      </div>
    </footer>
  );
}