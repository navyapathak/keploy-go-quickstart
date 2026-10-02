"use client";

import React, { useState } from "react";
import { CopyButton } from "./CopyButton";
import { Terminal, FileCode, Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  filename?: string;
  raw?: string;
}

export function CodeBlock({ children, className = "", filename, raw }: CodeBlockProps) {
  // Extract language from className (e.g., "language-bash" -> "bash")
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  // Extract raw text from children if raw not provided directly
  let codeString = raw || "";
  if (!codeString && typeof children === "string") {
    codeString = children;
  } else if (!codeString && React.isValidElement(children) && (children.props as any)?.children) {
    codeString = String((children.props as any).children);
  }

  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-[#0d1117] text-zinc-100 shadow-sm group">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-zinc-800/80 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          {filename ? (
            <>
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-zinc-200 font-medium">{filename}</span>
            </>
          ) : (
            <>
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span className="uppercase text-[11px] tracking-wider text-zinc-400 font-bold">
                {language || "code"}
              </span>
            </>
          )}
        </div>
        <CopyButton text={codeString.trim()} />
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-zinc-200">
        {children}
      </div>
    </div>
  );
}
