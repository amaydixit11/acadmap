"use client";

import {FeatureCards, BottomHighlights, Hero} from "@/components/home"

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Hero />
          <FeatureCards />
        </div>
      </div>
      <BottomHighlights />
    </div>
  );
}