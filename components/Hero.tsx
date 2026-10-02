import React from "react";
import { ArrowDown, CheckCircle2, Clock, Cpu, Sparkles, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-zinc-200/70 dark:border-zinc-800/70 bg-gradient-to-b from-zinc-50/50 to-transparent dark:from-zinc-900/20 dark:to-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          KEPLOY × GO
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.15]">
          Getting Started with Keploy and Go
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
          A beginner-friendly walkthrough for recording real HTTP traffic and replaying deterministic API tests with automated database mocks—zero mock code required.
        </p>

        {/* Metadata Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-600 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Beginner friendly
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60">
            <Cpu className="w-3.5 h-3.5 text-cyan-500" />
            Go 1.22+ & Gin
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60">
            <Terminal className="w-3.5 h-3.5 text-amber-500" />
            Keploy v3.8+
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            ~12 min read
          </span>
        </div>

        {/* Action Button & Architecture Teaser */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50">
          <a
            href="#what-youll-build"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 transition-all shadow-xs hover:shadow-md cursor-pointer group"
          >
            <span>Start tutorial</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          {/* Minimal Flow Preview */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100/70 dark:bg-zinc-900/60 px-3 py-1.5 rounded-md border border-zinc-200/50 dark:border-zinc-800/50">
            <span className="text-zinc-900 dark:text-zinc-200 font-semibold">Live Traffic</span>
            <span>→</span>
            <span className="text-amber-600 dark:text-amber-400">Keploy Record</span>
            <span>→</span>
            <span className="text-zinc-900 dark:text-zinc-200 font-semibold">YAML Mocks</span>
            <span>→</span>
            <span className="text-emerald-600 dark:text-emerald-400">Offline Replay</span>
          </div>
        </div>
      </div>
    </section>
  );
}
