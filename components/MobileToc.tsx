"use client";

import React, { useState } from "react";
import { TocItem } from "@/lib/toc";
import { List, X, ChevronRight } from "lucide-react";

interface MobileTocProps {
  items: TocItem[];
}

export function MobileToc({ items }: MobileTocProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="xl:hidden my-6 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-amber-500" />
          <span>Table of Contents ({items.length} sections)</span>
        </div>
        <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400">
          {isOpen ? "Close" : "Expand"}
        </span>
      </button>

      {isOpen && (
        <ul className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-1.5 text-xs">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? "pl-3 text-[11px]" : ""}>
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                className="w-full text-left py-1 px-2 rounded-md hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors flex items-center justify-between"
              >
                <span className="truncate">{item.title}</span>
                <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
