"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Palette,
  Bell,
  Shield,
  Trash2,
  LogOut,
  Loader2,
  Moon,
  Sun,
  Monitor,
  User as UserIcon,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-[#0b0c10] pb-20">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Settings
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium ml-16">
            Configure your academic environment and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Sidebar */}
          <div className="md:col-span-1 space-y-2">
             {[
               { id: 'account', label: 'Account', icon: Shield },
               { id: 'appearance', label: 'Appearance', icon: Palette },
               { id: 'notifications', label: 'Notifications', icon: Bell },
               { id: 'danger', label: 'Security', icon: Trash2 },
             ].map((nav) => (
               <button 
                key={nav.id}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all hover:bg-white dark:hover:bg-slate-900 shadow-sm hover:shadow-md border border-transparent hover:border-slate-100 dark:hover:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-emerald-400"
               >
                 <nav.icon className="w-4 h-4" />
                 {nav.label}
               </button>
             ))}
          </div>

          {/* Settings Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Account Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-sm overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-black tracking-tight">Account Profile</CardTitle>
                      <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Basic Information</CardDescription>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                       <UserIcon className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-2">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Primary Email</Label>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {user?.email}
                      </p>
                    </div>
                    <Badge className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-0 font-black text-[10px] uppercase px-2 py-1 rounded-md">
                      {user?.app_metadata?.provider || "Verified"}
                    </Badge>
                  </div>

                  <Link href="/profile" className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl transition-colors group cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                          <Sparkles className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">Public Profile</p>
                          <p className="text-xs text-slate-500 font-medium">Manage how you appear to others</p>
                       </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Appearance Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-sm overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-black tracking-tight">Appearance</CardTitle>
                  <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Interface Customization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-2">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "light", label: "Light", icon: Sun },
                      { id: "dark", label: "Dark", icon: Moon },
                      { id: "system", label: "System", icon: Monitor },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setTheme(mode.id)}
                        className={cn(
                          "flex flex-col items-center justify-center gap-3 p-4 rounded-3xl border-2 transition-all",
                          theme === mode.id 
                            ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-600 text-indigo-600 dark:text-indigo-400" 
                            : "bg-slate-50 dark:bg-slate-800/50 border-transparent text-slate-500"
                        )}
                      >
                        <mode.icon className="w-5 h-5" />
                        <span className="text-xs font-black uppercase tracking-widest">{mode.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Notifications Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-sm overflow-hidden opacity-60">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-black tracking-tight">Notifications</CardTitle>
                  <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1 text-indigo-600">Coming Soon</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Email alerts</p>
                      <p className="text-xs text-slate-500 font-medium">Get notified when new course materials are uploaded</p>
                    </div>
                    <Switch disabled />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Security Section (Danger Zone) */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-white dark:bg-slate-900 border-red-100 dark:border-red-900/30 rounded-[2.5rem] shadow-sm overflow-hidden">
                <CardHeader className="bg-red-50/50 dark:bg-red-950/20 border-b border-red-100 dark:border-red-900/30 pb-6 px-8">
                  <CardTitle className="text-xl font-black tracking-tight text-red-600">Danger Zone</CardTitle>
                  <CardDescription className="text-xs font-bold uppercase tracking-widest text-red-400 mt-1">Irreversible Actions</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white">Sign Out</p>
                      <p className="text-xs text-slate-500 font-medium">Terminate your current session</p>
                    </div>
                    <Button 
                      variant="destructive" 
                      onClick={handleSignOut}
                      className="rounded-xl px-6 h-12 font-black uppercase tracking-widest text-xs"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Sign Out
                    </Button>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-50">
                    <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white">Delete Account</p>
                      <p className="text-xs text-slate-500 font-medium">This will permanently delete your contributions</p>
                    </div>
                    <Button variant="destructive" size="sm" disabled className="rounded-xl px-6 h-12 font-black uppercase tracking-widest text-xs">
                      <Trash2 className="h-4 w-4 mr-2" /> Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
