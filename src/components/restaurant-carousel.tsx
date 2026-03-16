"use client";

import * as React from "react";
import Link from "next/link";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RestaurantCard } from "@/components/restaurant-card";
import type { RestaurantSummary } from "@/lib/definitions";

export function RestaurantCarousel({
  restaurants,
}: {
  restaurants: RestaurantSummary[];
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const plugin = React.useRef(
    AutoScroll({ speed: 1.2, stopOnInteraction: false }),
  );

  React.useEffect(() => {
    if (prefersReducedMotion) {
      plugin.current.stop();
    }
  }, [prefersReducedMotion]);

  return (
    <div className="relative">
      {/* Edge fade overlays — hint at more content */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-background to-transparent" />

      <Carousel
        plugins={[plugin.current]}
        opts={{ align: "start", loop: true, dragFree: true }}
        className="w-full"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => !prefersReducedMotion && plugin.current.play()}
        onFocus={() => plugin.current.stop()}
        onBlur={() => !prefersReducedMotion && plugin.current.play()}
      >
        <CarouselContent className="-ml-4">
          {restaurants.map((r) => (
            <CarouselItem
              key={r.id}
              className="pl-4 basis-full sm:basis-1/3 lg:basis-1/5 2xl:basis-[14.2%]"
            >
              <Link href={`/restaurants/${r.slug}`} className="block">
                <RestaurantCard
                  name={r.name}
                  rating={r.avg_rating}
                  reviewCount={r.review_count}
                  priceRange={r.price_range}
                  type={r.type}
                  accessible={r.accessible}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 z-20" />
        <CarouselNext className="right-2 z-20" />
      </Carousel>
    </div>
  );
}
