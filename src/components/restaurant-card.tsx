import { Star, UtensilsCrossed, Accessibility } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface RestaurantCardProps {
  name: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  type: string;
  accessible: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <span key={i} className="relative size-4">
            <Star className="size-4 fill-gray-200 text-gray-200" />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : "50%" }}
              >
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export function RestaurantCard({
  name,
  rating,
  reviewCount,
  priceRange,
  type,
  accessible,
}: RestaurantCardProps) {
  return (
    <Card className="overflow-hidden py-0">
      <div className="bg-gray-200 flex h-44 items-center justify-center">
        <UtensilsCrossed className="text-muted-foreground/30 size-12" />
      </div>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 pb-6">
        <div className="flex items-center gap-1.5 text-sm">
          <StarRating rating={rating} />
          <span className="text-muted-foreground">
            ({reviewCount}) &middot; {priceRange}
          </span>
        </div>
        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <span>{type}</span>
          {accessible && <Accessibility className="size-4" />}
        </div>
      </CardContent>
    </Card>
  );
}
