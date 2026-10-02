"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied code to clipboard" : "Copy code to clipboard"}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-all duration-200 border cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
        copied
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
          : "bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 border-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 dark:text-zinc-300 dark:border-zinc-700/60"
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500 animate-in zoom-in-75 duration-150" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
