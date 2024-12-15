"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-max flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center max-w-2xl px-6">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-muted rounded-full">
            <Lightbulb className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold sm:text-5xl">
          You've Discovered a Missing Page!
        </h1>
        <p className="mt-4 text-gray-600 text-lg sm:text-xl">
          Looks like you've stumbled upon something that doesn’t exist... yet. 
          Who knows, maybe this space will be filled with something exciting in the future! 🚀
        </p>
        <p className="mt-2 text-gray-500">
          But for now, let’s get you back to familiar territory.
        </p>
        <div className="mt-6">
          <Link href="/">
            <Button className="px-6 py-3">Take Me Home</Button>
          </Link>
        </div>
      </div>
      {/* <div className="mt-12">
        <img
          src="/sneak-peek-illustration.svg" // Replace with your own image or illustration
          alt="Sneak Peek illustration"
          className="w-full max-w-lg mx-auto"
        />
      </div> */}
    </div>
  );
}
