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

export default function Header() {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <header className="mb-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
          <Logo />
        <div className="flex items-center space-x-4">
          <DesktopNavigation className="hidden lg:flex" />
        </div>
        
        <div className="flex items-center space-x-2">
          <GlobalSearchDialog />
          <StarThisProject className="hidden lg:flex" />

          {isAuthenticated ? (
            <UserMenu handleSignOut={signOut} />
          ) : (
            <AuthButtons />
          )}
          <ModeToggle />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}