"use client"

import { cn } from "@/lib/utils";
import { FeatureCards, Hero } from "@/components/home";
import { BottomHighlights } from "@/components/home/BottomHighlights";
import { CommunitySection } from "@/components/home/CommunitySection";
import { OpenSourceSection } from "@/components/home/OpenSource";
import { motion } from "framer-motion";
import CourseDropdown from "@/components/home/CourseDropdown";

export default function HomePage() {
  return (
    <div className={cn("relative")}>
      <div className={cn("relative min-h-screen overflow-hidden")}>
        {/* Main content */}
        <div className="relative">
          {/* Hero Section */}
          <section className={cn("relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20")}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={cn("grid gap-12 lg:gap-16 lg:grid-cols-2 items-center")}
            >
              <Hero />
              <FeatureCards />
            </motion.div>
          </section>

          {/* Feature Sections */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <OpenSourceSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CommunitySection />
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn("relative mt-20")}
          >
            <BottomHighlights />
          </motion.div>
        </div>
      </div>
    </div>
  );
}