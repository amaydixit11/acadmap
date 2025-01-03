"use client"

import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/Footer";
import { FilterProvider } from "@/context/FiltersContext";
import { ToastProvider } from "@/context/ToastContext";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const defaultUrl = process.env.NEXT_PUBLIC_ORIGIN ?? "http://localhost:3000";

// export const metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: "AcadMap - Your Academic Journey Simplified",
//   description: "Navigate your academic path with AcadMap - A comprehensive platform for academic planning and course management",
//   keywords: "academic planning, course management, education, learning platform",
//   authors: [{ name: "AcadMap Team" }],
//   openGraph: {
//     title: "AcadMap - Your Academic Journey Simplified",
//     description: "Navigate your academic path with AcadMap - A comprehensive platform for academic planning and course management",
//     url: defaultUrl,
//     siteName: "AcadMap",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "AcadMap - Your Academic Journey Simplified",
//     description: "Navigate your academic path with AcadMap - A comprehensive platform for academic planning and course management",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle scroll to top visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
    <html 
      lang="en" 
      className={`${GeistSans.className} antialiased`} 
      suppressHydrationWarning
    >
      <body>
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-blue-500 dark:bg-blue-400 z-50 origin-left"
          style={{ scaleX }}
        />
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <FilterProvider>
                <Header />
                      {children}
                <Footer />
            </FilterProvider>
          </ToastProvider>
        </ThemeProvider>

        {/* Performance optimized analytics */}
        <Analytics />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 
              bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      </body>
    </html>
  );
}
