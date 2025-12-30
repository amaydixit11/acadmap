import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  LogOut,
  UserCircle,
  Bookmark,
  Calendar,
} from "lucide-react";

interface UserMenuProps {
  handleSignOut: () => void;
}

export const UserMenu = ({ handleSignOut }: UserMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="rounded-full">
        <UserCircle className="h-6 w-6" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuItem asChild>
        <Link href="/profile" className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          Profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/bookmarks" className="flex items-center">
          <Bookmark className="mr-2 h-4 w-4" />
          Bookmarks
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/time-table" className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          My Timetables
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/settings" className="flex items-center">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
        <LogOut className="mr-2 h-4 w-4" />
        Sign out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);