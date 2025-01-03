import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import SignInWithGoogleButton from "./SignInWithGoogleButton";

export const AuthButtons = () => (
  <>
    <div className="hidden sm:flex space-x-2">
      <SignInWithGoogleButton text = "Sign Up" size="sm"/>
    </div>
    <SignInWithGoogleButton size="icon" className="sm:hidden">
      <User className="h-5 w-5" />
    </SignInWithGoogleButton>
  </>
);