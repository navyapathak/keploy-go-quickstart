import React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { Callout } from "@/components/Callout";
import { Step } from "@/components/Step";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";
import { Troubleshooting } from "@/components/Troubleshooting";
import { CodeBlock } from "@/components/CodeBlock";
import { slugify } from "@/lib/toc";
import Link from "next/link";
import { Hash } from "lucide-react";

const mdxComponents = {
  Callout,
  Step,
  WorkflowDiagram,
  Troubleshooting,
  CodeBlock,
  h2: ({ children, ...props }: any) => {
    const text = typeof children === "string" ? children : String(children);
    const id = slugify(text);
    return (
      <h2
        id={id}
        className="group flex items-center gap-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-12 mb-4 scroll-mt-24 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-2"
        {...props}
      >
        <span>{children}</span>
        <a
          href={`#${id}`}
          aria-label={`Link to ${text}`}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-amber-500"
        >
          <Hash className="w-4 h-4" />
        </a>
      </h2>
    );
  },
  h3: ({ children, ...props }: any) => {
    const text = typeof children === "string" ? children : String(children);
    const id = slugify(text);
    return (
      <h3
        id={id}
        className="group flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-3 scroll-mt-24"
        {...props}
      >
        <span>{children}</span>
        <a
          href={`#${id}`}
          aria-label={`Link to ${text}`}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-amber-500"
        >
          <Hash className="w-3.5 h-3.5" />
        </a>
      </h3>
    );
  },
  p: ({ children, ...props }: any) => (
    <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-outside ml-6 space-y-2 text-zinc-700 dark:text-zinc-300 mb-6 text-sm sm:text-base leading-relaxed" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-outside ml-6 space-y-2 text-zinc-700 dark:text-zinc-300 mb-6 text-sm sm:text-base leading-relaxed" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-4 border-amber-500/80 bg-amber-50/30 dark:bg-amber-950/20 px-4 py-2 my-4 rounded-r-lg text-zinc-700 dark:text-zinc-300 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  a: ({ href, children, ...props }: any) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-600 dark:text-amber-400 font-medium underline underline-offset-4 decoration-amber-500/40 hover:decoration-amber-500 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || "#"}
        className="text-amber-600 dark:text-amber-400 font-medium underline underline-offset-4 decoration-amber-500/40 hover:decoration-amber-500 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  },
  pre: ({ children, ...props }: any) => {
    // If the child is a <code> element, extract its properties
    if (React.isValidElement(children)) {
      const codeProps = children.props as any;
      const rawText = String(codeProps?.children || "");
      const className = codeProps?.className || "";
      return (
        <CodeBlock className={className} raw={rawText}>
          {children}
        </CodeBlock>
      );
    }
    return <CodeBlock>{children}</CodeBlock>;
  },
  code: ({ children, className, ...props }: any) => {
    // Check if it's inline code (does not have language- class)
    const isInline = !className || !className.includes("language-");
    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 rounded-md font-mono text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/80"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  hr: () => <hr className="my-10 border-t border-zinc-200 dark:border-zinc-800/80" />,
};

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
    },
  });

  return content;
}
