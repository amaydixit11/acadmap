
import { navigationConfig } from "@/config/navigationConfig";
import { NavigationLink } from "./NavigationLink";
import { cn } from "@/lib/utils";

interface DesktopNavigationProps {
  className?: string;
}

export const DesktopNavigation = ({ className }: DesktopNavigationProps) => (
  <nav className={cn("space-x-1", className)}>
    {navigationConfig.map((item) => (
      <NavigationLink
        key={item.href}
        item={item}
        className="inline-flex justify-center px-3 py-2 text-sm"
      />
    ))}
  </nav>
);