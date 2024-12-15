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
        "active:scale-95 group", // Add slight press effect
        className
      )}
      aria-label={item.title}
    >
      <Icon className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" />
      <span className="ml-2 truncate max-w-[150px]">{item.title}</span>
    </Link>
  );
};