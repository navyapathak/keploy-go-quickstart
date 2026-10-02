"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

type Theme = "light" | "dark" | "system";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("keploy-theme") as Theme | null;
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      applyTheme("system");
    }
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    const isDark =
      t === "dark" ||
      (t === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  };

  const cycleTheme = () => {
    let next: Theme = "light";
    if (theme === "light") next = "dark";
    else if (theme === "dark") next = "system";
    else next = "light";

    setTheme(next);
    localStorage.setItem("keploy-theme", next);
    applyTheme(next);
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
    );
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Current theme: ${theme}. Click to switch theme.`}
      title={`Theme: ${theme.toUpperCase()} (Click to toggle)`}
      className="relative flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100/80 hover:bg-zinc-200/80 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 border border-zinc-200/60 dark:border-zinc-700/60 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50"
    >
      {theme === "light" && <Sun className="w-4 h-4 text-amber-500 animate-in spin-in-90 duration-200" />}
      {theme === "dark" && <Moon className="w-4 h-4 text-indigo-400 animate-in spin-in-90 duration-200" />}
      {theme === "system" && <Laptop className="w-4 h-4 text-zinc-500 dark:text-zinc-400 animate-in zoom-in-75 duration-150" />}
    </button>
  );
}
