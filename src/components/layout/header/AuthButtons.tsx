import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import SignInWithGoogleButton from "./SignInWithGoogleButton";

export const AuthButtons = () => (
  <>
    <div className="hidden sm:flex space-x-2">
      {/* <Link href="/sign-up">
        <Button size="sm">Sign Up</Button>
      </Link> */}
      <SignInWithGoogleButton text = "Sign Up" size="sm"/>
    </div>
    <Link href="/sign-in" className="sm:hidden">
      <Button variant="ghost" size="icon">
        <User className="h-5 w-5" />
      </Button>
    </Link>
  </>
);