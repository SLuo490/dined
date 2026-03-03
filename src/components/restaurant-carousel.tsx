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
  const plugin = React.useRef(
    AutoScroll({ speed: 2, stopOnInteraction: false }),
  );

  return (
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
            <Link href={`/restaurants/${r.slug}`}>
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
