import { notFound } from "next/navigation";
import { UtensilsCrossed } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { StarRating } from "@/components/star-rating";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { getRestaurantBySlug } from "@/lib/queries";

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = await params;
  const restaurant = await getRestaurantBySlug(restaurantId);
  if (!restaurant) notFound();

  return (
    <div className="flex min-h-svh flex-col bg-muted ">
      <Navbar />

      {/* Map placeholder */}
      <div className="mx-auto w-full max-w-5xl bg-gray-300 flex justify-center items-center h-115">
        <span className="text-gray-500 text-lg font-medium">google map</span>
      </div>

      {/* Info section */}
      <div className="mx-auto w-full max-w-5xl flex flex-col md:flex-row gap-8 py-10">
        {/* Restaurant image placeholder */}
        <div className="h-72 w-full md:w-75 shrink-0 bg-gray-300 rounded-lg flex items-center justify-center">
          <UtensilsCrossed className="text-gray-400 size-16" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-3 lg:mx-0 md:mx-0 mx-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {restaurant.name}
          </h1>
          <div className="flex items-center gap-2">
            <StarRating rating={restaurant.avg_rating} size="lg" />
            <span className="text-muted-foreground text-sm">
              ({restaurant.review_count}) &middot; {restaurant.price_range}{" "}
              &middot; {restaurant.type}
            </span>
          </div>
          <p className="text-muted-foreground text-sm">{restaurant.address}</p>
          <p className="text-foreground leading-relaxed mt-1">
            {restaurant.description}
          </p>
        </div>
      </div>

      {/* Image carousel */}
      <div className="mx-auto w-full max-w-5xl px-16 pb-12">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-4">
            {restaurant.images.map((image) => (
              <CarouselItem
                key={image.id}
                className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="h-40 bg-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    {image.alt_text}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
