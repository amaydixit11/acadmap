"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ICON_SIZE = 16;

const ThemeIcons: Record<string, JSX.Element> = {
  light: <Sun size={ICON_SIZE} className="text-muted-foreground" />,
  dark: <Moon size={ICON_SIZE} className="text-muted-foreground" />,
  system: <Laptop size={ICON_SIZE} className="text-muted-foreground" />,
};

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensures client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {ThemeIcons[theme || "system"]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="start">
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          {Object.entries(ThemeIcons).map(([key, Icon]) => (
            <DropdownMenuRadioItem key={key} value={key} className="flex gap-2">
              {Icon} <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
