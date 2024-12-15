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
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
        <div className="flex items-center space-x-4">
          <DesktopNavigation className="hidden lg:flex" />
        </div>
        
        <div className="flex items-center space-x-2">
          <SearchDialog
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            handleSearch={handleSearch}
          />
          <ModeToggle />
          {isAuthenticated ? (
            <UserMenu handleSignOut={handleSignOut} />
          ) : (
            <AuthButtons />
          )}
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}