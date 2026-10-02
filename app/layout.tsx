import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Getting Started with Keploy and Go | Developer Tutorial",
  description:
    "A beginner-friendly walkthrough for recording real HTTP traffic and replaying deterministic API test cases with automated database mocks using Keploy and Go.",
  keywords: [
    "Keploy",
    "Go",
    "Golang",
    "API Testing",
    "eBPF",
    "Database Mocking",
    "Gin framework",
    "MongoDB",
    "DevRel",
    "Integration Testing",
  ],
  authors: [{ name: "Daksh Dureja", url: "https://keploy.io" }],
  openGraph: {
    title: "Getting Started with Keploy and Go | Developer Tutorial",
    description:
      "Record real HTTP traffic and replay deterministic API tests with zero code modifications.",
    type: "article",
    siteName: "Keploy Developer Documentation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Getting Started with Keploy and Go",
    description:
      "Record real HTTP traffic and replay deterministic API tests with zero code modifications.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('keploy-theme');
                const supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (storedTheme === 'dark' || (!storedTheme && supportDarkMode) || (storedTheme === 'system' && supportDarkMode)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
