import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Share2 } from "lucide-react";
import { NavigationLink } from "./NavigationLink";
import { navigationConfig } from "@/config/navigationConfig";
  
export const MobileNavigation = () => (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center space-x-2">
            <Share2 className="h-5 w-5" />
            <span>Student Resources</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-2">
          {navigationConfig.map((item) => (
            <NavigationLink
              key={item.href}
              item={item}
              className="px-4 py-2"
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );