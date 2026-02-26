"use client";

import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RestaurantCard } from "@/components/restaurant-card";
import AutoScroll from "embla-carousel-auto-scroll";
import * as React from "react";

const features = [
  "Track Every Meal",
  "Rate & Review",
  "Build Lists",
  "Share Discoveries",
];

// Mock Data
const restaurants = [
  {
    id: 1,
    name: "Barbuto Brooklyn",
    rating: 5,
    reviewCount: 123,
    priceRange: "$50–100",
    type: "Restaurant",
    accessible: true,
  },
  {
    id: 2,
    name: "Le Bernardin",
    rating: 4.8,
    reviewCount: 456,
    priceRange: "$100+",
    type: "Fine Dining",
    accessible: false,
  },
  {
    id: 3,
    name: "Shake Shack",
    rating: 4.2,
    reviewCount: 892,
    priceRange: "$10–30",
    type: "Casual",
    accessible: true,
  },
  {
    id: 4,
    name: "Nobu Downtown",
    rating: 4.6,
    reviewCount: 311,
    priceRange: "$75–150",
    type: "Japanese",
    accessible: true,
  },
  {
    id: 5,
    name: "The Spotted Pig",
    rating: 4.3,
    reviewCount: 204,
    priceRange: "$40–70",
    type: "Gastropub",
    accessible: false,
  },
  {
    id: 6,
    name: "Carbone",
    rating: 4.7,
    reviewCount: 589,
    priceRange: "$80–120",
    type: "Italian",
    accessible: true,
  },
];

export default function Home() {
  const plugin = React.useRef(
    AutoScroll({ speed: 2, stopOnInteraction: false }),
  );
  return (
    <div className="bg-muted flex min-h-svh flex-col">
      <Navbar />
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
            <Carousel
              plugins={[plugin.current]}
              opts={{ align: "start", loop: true }}
              className="w-full"
              onMouseEnter={() => plugin.current.stop()}
              onMouseLeave={() => plugin.current.play()}
            >
              <CarouselContent className="-ml-4">
                {restaurants.map((r) => (
                  <CarouselItem
                    key={r.id}
                    className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <Link href={`/restaurants/${r.id}`}>
                      <RestaurantCard
                        name={r.name}
                        rating={r.rating}
                        reviewCount={r.reviewCount}
                        priceRange={r.priceRange}
                        type={r.type}
                        accessible={r.accessible}
                      />
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
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
