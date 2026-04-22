"use client"

import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { UserMenu } from "./UserMenu";
import { AuthButtons } from "./AuthButtons";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "../Logo";
import StarThisProject from "./StarThisProject";
import { GlobalSearchDialog } from "@/components/search/GlobalSearchDialog";
import { cn } from "@/lib/utils";

export default function Header() {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      "bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-6 max-w-7xl">
          <Logo />
        <div className="flex items-center">
          <DesktopNavigation className="hidden lg:flex px-8" />
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="hidden sm:block mr-2">
            <GlobalSearchDialog />
          </div>
          <div className="hidden xl:block">
            <StarThisProject />
          </div>

          {isAuthenticated ? (
            <UserMenu handleSignOut={signOut} />
          ) : (
            <AuthButtons />
          )}
          <ModeToggle />
          <div className="lg:hidden">
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}