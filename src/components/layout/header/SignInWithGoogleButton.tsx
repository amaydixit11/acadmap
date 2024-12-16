import { OAuthAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

type SignInWithGoogleButtonProps = {
  text?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children?: React.ReactNode;
  className?: string;  // Allows custom styling
  onError?: (error: any) => void;  // Callback for error handling
};

const SignInWithGoogleButton: React.FC<SignInWithGoogleButtonProps> = ({
  text,
  size = 'lg',
  children,
  className,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOAuth = async () => {
    setIsLoading(true);
    try {
      await OAuthAction();
    } catch (error) {
      console.error('OAuth sign-in failed:', error);
      setIsLoading(false);
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <Button
      className={`transition-all ${className ?? ''}`}
      onClick={handleOAuth}
      size={size}
      aria-label="Sign in with Google"
      disabled={isLoading}
    >
      {isLoading ? 'Signing in...' : children ?? text ?? 'Sign up with Google'}
    </Button>
  );
};

export default SignInWithGoogleButton;
