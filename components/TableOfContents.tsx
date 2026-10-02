"use client";

import React, { useEffect, useState } from "react";
import { AlignLeft, ChevronRight } from "lucide-react";

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = items
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      const scrollPosition = window.scrollY + 100;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveId(el.id);
          return;
        }
      }

      if (headingElements.length > 0 && window.scrollY < 200) {
        setActiveId(headingElements[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollToHeading = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  return (
    <nav className="space-y-3" aria-label="Table of contents">
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        <AlignLeft className="w-3.5 h-3.5 text-amber-500" />
        <span>On This Page</span>
      </div>

      <ul className="space-y-1.5 text-xs font-medium border-l border-zinc-200/80 dark:border-zinc-800/80 pl-2">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={`transition-colors ${
                item.level === 3 ? "pl-3 text-[11px]" : ""
              }`}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToHeading(e, item.id)}
                className={`block py-1 px-2 rounded-md transition-all truncate ${
                  isActive
                    ? "text-amber-800 dark:text-amber-400 bg-amber-500/10 font-semibold border-l-2 -ml-[9px] border-amber-500"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40"
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
