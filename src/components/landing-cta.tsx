import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";

export function LandingCta() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-8">
      <div className="rounded-2xl bg-amber-wash border border-border px-8 py-12 flex flex-col items-center gap-6 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
          Ready to start your <Highlight>food journal</Highlight>?
        </h2>
        <p className="text-muted-foreground max-w-md">
          Join food lovers who are already tracking their dining adventures with
          Dined. Free to get started.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <Button asChild className="flex-1 h-12 py-2">
            <Link href="/signup">Get Started — It&apos;s Free</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1 h-12 py-2">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
