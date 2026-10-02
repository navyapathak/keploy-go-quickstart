"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Terminal, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon } from "./GithubIcon";
import { ThemeToggle } from "./ThemeToggle";
import { ProgressIndicator } from "./ProgressIndicator";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ProgressIndicator />
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-xs"
            : "bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xs border-b border-zinc-200/40 dark:border-zinc-800/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-lg p-1"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
                <span className="font-bold text-sm tracking-tighter">🐰</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  keploy
                </span>
                <span className="text-zinc-300 dark:text-zinc-700 font-mono">/</span>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                  Go Quickstart
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Right Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a
              href="#what-youll-build"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Overview
            </a>
            <a
              href="#step-1-get-the-go-sample-application"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Quickstart Steps
            </a>
            <a
              href="#what-just-happened"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#troubleshooting-guide"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Troubleshooting
            </a>
            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
            <a
              href="https://keploy.io/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Docs</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="https://github.com/navyapathak/keploy-go-quickstart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
            <ThemeToggle />
          </nav>

          {/* Mobile Right */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
            <a
              href="#what-youll-build"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-amber-500"
            >
              Overview
            </a>
            <a
              href="#step-1-get-the-go-sample-application"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-amber-500"
            >
              Quickstart Steps
            </a>
            <a
              href="#what-just-happened"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-amber-500"
            >
              How It Works
            </a>
            <a
              href="#troubleshooting-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-amber-500"
            >
              Troubleshooting
            </a>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-sm">
              <a
                href="https://keploy.io/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400"
              >
                <BookOpen className="w-4 h-4" /> Docs
              </a>
              <a
                href="https://github.com/navyapathak/keploy-go-quickstart"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400"
              >
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
