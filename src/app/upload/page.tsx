"use client"

import { LoginPrompt } from "@/components/upload/LoginPrompt";
import { UploadPageContent } from "@/components/upload/UploadPageContent";
import { getUserData } from "@/utils/getUserData";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";


export default function UploadPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const data = await getUserData();
      setUser(data?.user || null);
      setIsLoggedIn(!!data?.user);
    };

    checkLoginStatus();
  }, []);

  if (!isLoggedIn || !user) {
    return <LoginPrompt />;
  }
  
  return <UploadPageContent user={user}/>;
}