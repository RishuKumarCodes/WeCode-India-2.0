"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, Code, BookOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthModal } from "../pages/AuthModal";
import { signOut, useSession } from "next-auth/react";

export function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const routes = [
    { href: "/", label: "Home" },
    { href: "/phases", label: "Phases" },
    { href: "/community", label: "Community" },
    { href: "/dsa", label: "DSA" },
    { href: "/projects", label: "Projects" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile */}
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px]">
              <Link href="/" className="flex items-center gap-2 font-bold" onClick={() => setIsOpen(false)}>
                <Code className="h-6 w-6" />
                <span>WeCode India</span>
              </Link>
              <nav className="mt-8 flex flex-col gap-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium hover:text-foreground transition-colors",
                      pathname === route.href ? "text-foreground" : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
                {session ? (
                  <Button variant="destructive" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                ) : (
                  <AuthModal />
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2 font-bold">
            <Code className="h-6 w-6" />
            <span className="hidden md:inline-block">WeCode India</span>
          </Link>
        </div>

        {/* Desktop */}
        <nav className="hidden md:flex md:gap-4 lg:gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Home */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent",
                      pathname === "/" ? "bg-accent" : "bg-background"
                    )}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Phases */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Phases</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/phases"
                          className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/10 p-6 no-underline outline-none focus:shadow-md"
                        >
                          <BookOpen className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Development Roadmap
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Follow a structured learning path from fundamentals to interview prep
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/phases/fundamentals" className="block p-3 rounded-md no-underline outline-none hover:bg-accent hover:text-accent-foreground">
                          <div className="text-sm font-medium">Fundamentals</div>
                          <p className="text-sm text-muted-foreground line-clamp-2">Learn programming basics</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/phases/dsa" className="block p-3 rounded-md no-underline outline-none hover:bg-accent hover:text-accent-foreground">
                          <div className="text-sm font-medium">DSA</div>
                          <p className="text-sm text-muted-foreground line-clamp-2">Master data structures & algorithms</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/phases/development" className="block p-3 rounded-md no-underline outline-none hover:bg-accent hover:text-accent-foreground">
                          <div className="text-sm font-medium">Development</div>
                          <p className="text-sm text-muted-foreground line-clamp-2">Build real-world projects</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Community */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/community"
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent",
                      pathname === "/community" ? "bg-accent" : "bg-background"
                    )}
                  >
                    Community
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* DSA */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/dsa"
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent",
                      pathname === "/dsa" ? "bg-accent" : "bg-background"
                    )}
                  >
                    DSA
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Projects */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/projects"
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent",
                      pathname === "/projects" ? "bg-accent" : "bg-background"
                    )}
                  >
                    Projects
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* AI Roadmap */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/roadmap"
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent",
                      pathname === "/roadmap" ? "bg-accent" : "bg-background"
                    )}
                  >
                    AI Roadmap
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* AI Assistant */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/assistant"
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent",
                      pathname === "/assistant" ? "bg-accent" : "bg-background"
                    )}
                  >
                    AI Assistant
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Theme + Auth */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <div className="hidden md:flex md:gap-2">
            {session ? (
              <Button variant="destructive" onClick={() => signOut()}>
                Sign Out
              </Button>
            ) : (
              <AuthModal />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
