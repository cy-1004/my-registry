import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SidebarNav } from "@/components/site/sidebar-nav";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "my-registry",
  description:
    "A personal component registry of UI animations, scroll effects, Lottie, and 3D components.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
            <Link href="/" className="text-sm font-semibold">
              my-registry
            </Link>
          </div>
        </header>
        <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-4 py-8">
          <aside className="hidden w-56 shrink-0 md:block">
            <SidebarNav />
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
