"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage or system preference
    const stored = localStorage.getItem("keploy-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = stored === "dark" || (!stored && prefersDark);
    
    setIsDark(initialDark);
    applyTheme(initialDark);
  }, []);

  const applyTheme = (dark: boolean) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  };

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem("keploy-theme", nextDark ? "dark" : "light");
    applyTheme(nextDark);
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100/90 hover:bg-zinc-200 dark:bg-zinc-800/90 dark:hover:bg-zinc-700 border border-zinc-200/80 dark:border-zinc-700/80 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-2xs"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 rotate-0 scale-100" />
      ) : (
        <Moon className="w-4 h-4 text-zinc-700 transition-transform duration-200 rotate-0 scale-100" />
      )}
    </button>
  );
}
