"use client";

import { FeatureCards, BottomHighlights, Hero } from "@/components/home";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <Hero />
          <FeatureCards />
        </div>
      </div>
      <BottomHighlights />
    </div>
  );
}
