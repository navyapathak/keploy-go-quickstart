import React from "react";
import fs from "fs";
import path from "path";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { TableOfContents } from "@/components/TableOfContents";
import { MobileToc } from "@/components/MobileToc";
import { renderMDX } from "@/lib/mdx";
import { extractHeadings } from "@/lib/toc";
import { GithubIcon } from "@/components/GithubIcon";
import { BookOpen, ExternalLink, MessageSquare, Terminal, ChevronRight } from "lucide-react";

export default async function Page() {
  const mdxPath = path.join(process.cwd(), "content", "keploy-go-quickstart.mdx");
  const rawMdx = fs.readFileSync(mdxPath, "utf-8");

  // Extract table of contents items
  const tocItems = extractHeadings(rawMdx);

  // Render the MDX content into React elements
  const content = await renderMDX(rawMdx);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 font-sans">
      <Header />
      <Hero />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between gap-10">
          {/* Left Sidebar (Desktop Navigation & Steps) */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Documentation
                </span>
                <div className="space-y-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  <a
                    href="#what-youll-build"
                    className="flex items-center justify-between py-1.5 px-2 rounded-md hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <span>Overview</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  </a>
                  <a
                    href="#what-is-keploy"
                    className="flex items-center justify-between py-1.5 px-2 rounded-md hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <span>Architecture</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  </a>
                  <a
                    href="#prerequisites"
                    className="flex items-center justify-between py-1.5 px-2 rounded-md hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <span>Prerequisites</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Tutorial Steps
                </span>
                <div className="space-y-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <a
                    href="#step-1-get-the-go-sample-application"
                    className="block py-1 px-2 rounded-md hover:text-amber-600 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    01. Clone Sample App
                  </a>
                  <a
                    href="#step-2-install-the-keploy-cli"
                    className="block py-1 px-2 rounded-md hover:text-amber-600 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    02. Install Keploy CLI
                  </a>
                  <a
                    href="#step-3-create-network-and-start-mongodb"
                    className="block py-1 px-2 rounded-md hover:text-amber-600 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    03. Network & MongoDB
                  </a>
                  <a
                    href="#step-4-record-your-first-test-cases"
                    className="block py-1 px-2 rounded-md hover:text-amber-600 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    04. Record Test Cases
                  </a>
                  <a
                    href="#step-5-inspect-what-keploy-generated"
                    className="block py-1 px-2 rounded-md hover:text-amber-600 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    05. Inspect YAML Artifacts
                  </a>
                  <a
                    href="#step-6-calibrate-noise-handling-timestamps"
                    className="block py-1 px-2 rounded-md hover:text-amber-600 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    06. Calibrate Noise
                  </a>
                  <a
                    href="#step-7-run-the-generated-tests-offline-replay"
                    className="block py-1 px-2 rounded-md hover:text-amber-600 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    07. Offline Replay Tests
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                <a
                  href="#what-just-happened"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-amber-500"
                >
                  What Just Happened?
                </a>
                <a
                  href="#troubleshooting-guide"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-amber-500"
                >
                  Troubleshooting
                </a>
                <a
                  href="#key-takeaways"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-amber-500"
                >
                  Key Takeaways
                </a>
              </div>
            </div>
          </aside>

          {/* Center Column: Rendered MDX Content */}
          <article className="min-w-0 flex-1 max-w-3xl prose prose-zinc dark:prose-invert prose-headings:scroll-mt-24 prose-pre:p-0 prose-pre:bg-transparent">
            <MobileToc items={tocItems} />
            {content}
          </article>

          {/* Right Column (Table of Contents & Quick Resources) */}
          <aside className="hidden xl:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <TableOfContents items={tocItems} />

              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Community & Support
                </span>
                <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <a
                    href="https://github.com/navyapathak/keploy-go-quickstart"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-zinc-500" />
                    <span>Star on GitHub</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>
                  <a
                    href="https://join.slack.com/t/keploy/shared_invite/zt-2cxu3w9h3-s649a~m7BqI0F5W5W9qZ9g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    <span>Join Keploy Slack</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>
                  <a
                    href="https://keploy.io/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span>Documentation</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
