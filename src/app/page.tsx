import Link from "next/link";
import { CircleCheck } from "lucide-react";
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
import { getRestaurants } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";

const features = [
  "Track Every Meal",
  "Rate & Review",
  "Build Lists",
  "Share Discoveries",
];

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
              <CardFooter>
                <form action={signOut} className="w-full">
                  <Button type="submit" variant="outline" className="w-full">
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

  const restaurants = await getRestaurants();

  return (
    <div className="bg-muted flex min-h-svh flex-col">
      <Navbar user={null} />
      <main className="relative flex flex-1 flex-col items-center gap-4 pb-16 px-16 md:p-10 md:pb-16">
        {/* Hero — vertically centered in available space */}
        <div className="flex flex-1 w-full flex-col items-center justify-center gap-8">
          {/* Center hero */}
          <div className="flex w-full max-w-2xl flex-col items-center gap-8 text-center pb-10">
            <div className="flex flex-col gap-4">
              <h1 className="text-6xl font-bold tracking-tight">
                Your Personal Restaurant Diary
              </h1>
              <p className="text-muted-foreground text-lg">
                Document every meal, rate your experiences, and build your
                culinary story. Join thousands of food lovers tracking their
                dining adventures.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Button asChild className="flex-1 h-12">
                <Link className="py-3 md:py-0" href="/signup">
                  Get Started
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 h-12">
                <Link className="py-3 md:py-0" href="/login">
                  Sign In
                </Link>
              </Button>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {features.map((feature) => (
                <span
                  key={feature}
                  className="text-muted-foreground flex items-center gap-1.5 text-sm"
                >
                  <CircleCheck className="text-primary size-4" />
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Restaurant carousel */}
          <div className="w-full max-w-5xl">
            <RestaurantCarousel restaurants={restaurants} />
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          {["About", "Privacy", "Terms", "Contact"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
