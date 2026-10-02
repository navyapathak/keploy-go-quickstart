import React from "react";
import { CopyButton } from "./CopyButton";
import { Terminal, CheckCircle, HelpCircle } from "lucide-react";

interface StepProps {
  number: string;
  title: string;
  badge?: string;
  command?: string;
  rationale?: string;
  expectedOutput?: string;
  children?: React.ReactNode;
}

export function Step({
  number,
  title,
  badge,
  command,
  rationale,
  expectedOutput,
  children,
}: StepProps) {
  return (
    <div className="relative my-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-5 sm:p-6 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono font-bold text-sm border border-amber-500/20">
            {number}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {title}
          </h3>
        </div>
        {badge && (
          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
            {badge}
          </span>
        )}
      </div>

      {children && <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">{children}</div>}

      {/* Command Box */}
      {command && (
        <div className="my-3 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100">
          <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900/90 border-b border-zinc-800/80 text-xs text-zinc-400 font-mono">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>terminal</span>
            </div>
            <CopyButton text={command} />
          </div>
          <div className="p-3.5 font-mono text-xs sm:text-sm overflow-x-auto text-emerald-400">
            <code>$ {command}</code>
          </div>
        </div>
      )}

      {/* Rationale & Expected Output Grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {rationale && (
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-zinc-700 dark:text-zinc-300">
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Why this matters</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {rationale}
            </p>
          </div>
        )}

        {expectedOutput && (
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-zinc-700 dark:text-zinc-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>What you should see</span>
            </div>
            <pre className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap overflow-x-auto">
              {expectedOutput}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
