import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import SignInWithGoogleButton from "../layout/header/SignInWithGoogleButton";


export const LoginPrompt = () => (
    <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <LogIn className="h-6 w-6" />
            Login Required
          </CardTitle>
          <CardDescription>
            Please log in to upload course resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInWithGoogleButton />
          {/* <Link href="/sign-in">
            <Button className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </Button>
          </Link> */}
        </CardContent>
      </Card>
    </div>
  );