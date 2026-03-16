import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { RestaurantCarousel } from "@/components/restaurant-carousel";
import { LandingStatsBar } from "@/components/landing-stats-bar";
import { LandingFeatures } from "@/components/landing-features";
import { LandingCta } from "@/components/landing-cta";
import { getRestaurants, getLandingStats } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const displayName = user.user_metadata?.full_name ?? user.email;
    return (
      <div className="bg-muted flex min-h-svh flex-col">
        <Navbar user={user} />
        <main className="flex flex-1 flex-col items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>
                  You are signed in to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <p className="font-medium">{displayName}</p>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button asChild className="w-full">
                  <Link href="/restaurants">Browse Restaurants</Link>
                </Button>
                <form action={signOut} className="w-full">
                  <Button type="submit" variant="ghost" className="w-full">
                    Sign out
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const [restaurants, stats] = await Promise.all([
    getRestaurants(),
    getLandingStats(),
  ]);

  return (
    <div className="flex min-h-svh flex-col">
      <Navbar user={null} />

      {/* Hero */}
      <section className="bg-muted flex flex-col items-center justify-center px-4 sm:px-8 py-20 text-center gap-8">
        <div className="flex max-w-2xl flex-col gap-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Your Personal
            <br className="hidden sm:block" />
            Restaurant Diary
          </h1>
          <p className="text-muted-foreground text-lg">
            Document every meal, rate your experiences, and build your culinary
            story. Join thousands of food lovers tracking their dining
            adventures.
          </p>
        </div>
        <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
          <Button asChild className="flex-1 h-12">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1 h-12">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </section>

      <LandingStatsBar stats={stats} />

      <main className="flex flex-col items-center gap-16 py-16 bg-background">
        <LandingFeatures />

        {/* Restaurant carousel section */}
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-center mb-10">
            Top-rated restaurants
          </h2>
          <RestaurantCarousel restaurants={restaurants} />
        </section>

        <LandingCta />

        {/* Footer */}
        <footer className="w-full border-t border-border pt-8 px-4 sm:px-8">
          <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">dined</span> —
              your personal restaurant diary
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
              {["About", "Privacy", "Terms", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
