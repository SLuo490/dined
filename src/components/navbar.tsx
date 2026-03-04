"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { signOut } from "@/app/actions/auth";

type NavbarUser = {
  email?: string;
  user_metadata?: { full_name?: string };
} | null;

export function Navbar({ user }: { user?: NavbarUser }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        {/* Logo */}
        <Logo />

        {/* Desktop nav links */}
        <nav className="hidden md:flex gap-10 text-sm font-semibold">
          <Button variant="ghost">
            <Link
              href="/"
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
          </Button>
          <Button variant="ghost">
            <Link
              href="/restaurants"
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              Restaurants
            </Link>
          </Button>
          <Button variant="ghost">
            <Link
              href="/list"
              className="text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              List
            </Link>
          </Button>
        </nav>

        {/* Search bar */}
        <div className="hidden md:flex relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input placeholder="Search..." className="pl-9" />
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <form action={signOut}>
              <Button variant="outline" size="sm" type="submit">
                Sign out
              </Button>
            </form>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t bg-background px-6 py-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-3 text-sm">
            <Button variant="ghost">
              <Link
                href="/"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
            </Button>
            <Button variant="ghost">
              <Link
                href="/restaurants"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                Restaurants
              </Link>
            </Button>
            <Button variant="ghost">
              <Link
                href="/list"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                List
              </Link>
            </Button>
          </nav>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input placeholder="Search..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            {user ? (
              <form action={signOut} className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  type="submit"
                  onClick={() => setOpen(false)}
                >
                  Sign out
                </Button>
              </form>
            ) : (
              <>
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    Sign up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
