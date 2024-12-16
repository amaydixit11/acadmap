"use client"

import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { SearchDialog } from "./SearchDialog";
import { UserMenu } from "./UserMenu";
import { AuthButtons } from "./AuthButtons";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/hooks/useAuth";
import { useSearch } from "@/hooks/useSearch";
import { Logo } from "../Logo";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import StarThisProject from "./StarThisProject";

export default function Header() {
  const { isAuthenticated, handleSignOut } = useAuth();
  const {
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setIsSearchOpen,
    handleSearch,
  } = useSearch();


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
          <Logo />
        <div className="flex items-center space-x-4">
          <DesktopNavigation className="hidden lg:flex" />
        </div>
        
        <div className="flex items-center space-x-2">
          {/* <SearchDialog
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            handleSearch={handleSearch}
          /> */}
          <StarThisProject className="hidden lg:flex" />

          {isAuthenticated ? (
            <UserMenu handleSignOut={handleSignOut} />
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