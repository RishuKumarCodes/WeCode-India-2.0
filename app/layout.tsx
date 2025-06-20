// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import SessionProvider from "./providers/SessionProvider";
import ConditionalNav from "@/components/ConditionalNav"; // import it

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevPath - Software Development Roadmap for Students",
  description:
    "A comprehensive roadmap platform for college students to learn software development from 1st to final year",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ConditionalNav>
              {/* Only NavBar/Footer logic moved into ConditionalNav */}
              <main className="flex-1">{children}</main>
            </ConditionalNav>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
