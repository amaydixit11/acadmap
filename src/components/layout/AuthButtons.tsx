import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export const AuthButtons = () => (
  <>
    <div className="hidden sm:flex space-x-2">
      <Link href="/sign-in">
        <Button variant="ghost">Sign In</Button>
      </Link>
      <Link href="/sign-up">
        <Button variant="default">Sign Up</Button>
      </Link>
    </div>
    <Link href="/sign-in" className="sm:hidden">
      <Button variant="ghost" size="icon">
        <User className="h-5 w-5" />
      </Button>
    </Link>
  </>
);