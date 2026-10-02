import React from "react";
import Link from "next/link";
import { BookOpen, Globe, Heart, Sparkles, ExternalLink } from "lucide-react";
import { GithubIcon } from "./GithubIcon";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/50 py-12 px-4 sm:px-6 lg:px-8 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand info */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Keploy × Go Quickstart
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              DevRel Assignment
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center md:text-left">
            An original, hands-on developer experience tutorial created for the Keploy DevRel evaluation.
          </p>
        </div>

        {/* Center / Right Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <a
            href="https://keploy.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>keploy.io</span>
          </a>
          <a
            href="https://keploy.io/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Documentation</span>
          </a>
          <a
            href="https://github.com/navyapathak/keploy-go-quickstart"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </a>
          <a
            href="https://github.com/navyapathak"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>@navyapathak</span>
          </a>
          <a
            href="https://github.com/keploy/samples-go"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>samples-go</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 gap-2">
        <p>© {new Date().getFullYear()} Keploy Open Source Community. Apache 2.0 License.</p>
        <p className="flex items-center gap-1">
          Designed with precision for developer empathy.
        </p>
      </div>
    </footer>
  );
}
