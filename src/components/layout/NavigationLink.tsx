import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavigationItem } from "@/types/navigation";

interface NavigationLinkProps {
  item: NavigationItem;
  className?: string;
}

export const NavigationLink = ({ item, className }: NavigationLinkProps) => {
  const Icon = item.icon;
  
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center rounded-md text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="ml-2">{item.title}</span>
    </Link>
  );
};