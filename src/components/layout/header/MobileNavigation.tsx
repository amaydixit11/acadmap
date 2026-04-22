import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Share2 } from "lucide-react";
import { NavigationLink } from "./NavigationLink";
import { navigationConfig } from "@/config/navigationConfig";
import StarThisProject from "./StarThisProject";
  
export const MobileNavigation = () => (
  <Sheet>
    <SheetTrigger asChild className="lg:hidden">
      <Button variant="ghost" size="icon" aria-label="Open menu">
        <Menu className="h-6 w-6" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-64 flex flex-col">
      <SheetHeader className="border-b pb-4">
        <SheetTitle className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/logo_icon.png" alt="Logo" className="h-full w-full object-contain" />
          </div>
          <span className="font-black tracking-tight text-xl uppercase">AcadMap</span>
        </SheetTitle>
      </SheetHeader>
      <nav className="mt-6 flex flex-col gap-2 flex-grow">
        {navigationConfig.map((item) => (
          <NavigationLink key={item.href} item={item} className="px-4 py-2" />
        ))}
      </nav>
      <SheetFooter className="mt-auto">
        <StarThisProject />
      </SheetFooter>
    </SheetContent>
  </Sheet>
);
