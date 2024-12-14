
import { navigationConfig } from "@/config/navigationConfig";
import { NavigationLink } from "./NavigationLink";

export const DesktopNavigation = () => (
  <nav className="hidden lg:flex space-x-1">
    {navigationConfig.map((item) => (
      <NavigationLink
        key={item.href}
        item={item}
        className="inline-flex justify-center px-4 py-2"
      />
    ))}
  </nav>
);