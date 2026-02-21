import Link from "next/link";
import { Utensils, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

const features = [
  "Track Every Meal",
  "Rate & Review",
  "Build Lists",
  "Share Discoveries",
];

export default function Home() {
  return (
    <div className="bg-muted flex min-h-svh flex-col">
      <Navbar />
      <main className="relative flex flex-1 flex-col items-center justify-center gap-8 p-6 pb-16 md:p-10 md:pb-16">
      {/* Brand mark */}
      <div className="flex items-center gap-2 font-bold">
        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
          <Utensils className="size-4.5" strokeWidth={2} />
        </div>
        <div className="text-2xl">dineD</div>
      </div>

      {/* Center hero */}
      <div className="flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-bold tracking-tight">
            Your Personal Restaurant Diary
          </h1>
          <p className="text-muted-foreground text-lg">
            Document every meal, rate your experiences, and build your culinary
            story. Join thousands of food lovers tracking their dining
            adventures.
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
