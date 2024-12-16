import { OAuthAction } from '@/app/actions';
import { Button } from '@/components/ui/button'
import React from 'react'

const SignInWithGoogleButton = ({text, size}: {text?: string, size?: "default" | "sm" | "lg" | "icon"}) => {
    const handleOAuth = async () => {
        try {
          await OAuthAction();
        } catch (error) {
          console.error("OAuth sign-in failed:", error);
        }
      };
  return (
    <Button className="" onClick={handleOAuth} size={size ?? "lg"}>
        {text ?? `Sign up with Google`}
    </Button>
  )
}

export default SignInWithGoogleButton
