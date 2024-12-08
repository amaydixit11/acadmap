"use client";

import { OAuthAction, signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { Button } from "@/components/ui/button";

export default function SignupClient({ searchParams }: { searchParams: Message }) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await signUpAction(formData);
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
      {("success" in searchParams || "error" in searchParams || "message" in searchParams) && (
        <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
          <FormMessage message={searchParams} />
        </div>
      )}
        <form className="flex flex-col min-w-64 max-w-64 mx-auto" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-medium">Sign up</h1>
            <p className="text-sm text text-foreground">
            Already have an account?{" "}
            <Link className="text-primary font-medium underline" href="/sign-in">
                Sign in
            </Link>
            </p>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <Label htmlFor="password">Password</Label>
            <Input
                type="password"
                name="password"
                placeholder="Your password"
                minLength={6}
                required
            />
            <SubmitButton pendingText="Signing up...">
                Sign up
            </SubmitButton>
            
            </div>
        </form>
        <Button className="min-w-64 max-w-64 mx-auto" onClick={handleOAuth}>
            Sign up with Google
        </Button>
      {/* <SmtpMessage /> */}
    </>
  );
}
