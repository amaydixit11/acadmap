"use client"

import { OAuthAction, signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginClient() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await signInAction(formData);
  };

  const handleOAuth = async () => {
    try {
      await OAuthAction();
    } catch (error) {
      console.error("OAuth sign-in failed:", error);
    }
  };

  return (
    <>
        {/* <form className="flex-1 flex flex-col min-w-64" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-medium">Sign in</h1>
            <p className="text-sm text-foreground">
                Don't have an account?{" "}
                <Link className="text-foreground font-medium underline" href="/sign-up">
                Sign up
                </Link>
            </p>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required />
                <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                    className="text-xs text-foreground underline"
                    href="/forgot-password"
                >
                    Forgot Password?
                </Link>
                </div>
                <Input
                type="password"
                name="password"
                placeholder="Your password"
                required
                />
                <SubmitButton pendingText="Signing In...">
                Sign in
                </SubmitButton>
            </div>
        </form> */}
        <Button className="min-w-64 max-w-64 mx-auto" onClick={handleOAuth}>
            Sign In with Google
        </Button>
    </>
  );
}