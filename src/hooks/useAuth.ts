"use client"

import { useState, useEffect } from "react";
import { isUserLoggedIn } from "@/utils/ifLoggedIn";
import { signOutAction } from "@/app/actions";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const loggedIn = await isUserLoggedIn();
      setIsAuthenticated(loggedIn);
    };
    checkAuthStatus();
  }, []);

  const handleSignOut = async () => {
    setIsAuthenticated(false);
    await signOutAction();
  };

  return { isAuthenticated, handleSignOut };
};