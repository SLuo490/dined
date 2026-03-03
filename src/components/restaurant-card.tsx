import { UtensilsCrossed, Accessibility } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/star-rating";

export interface RestaurantCardProps {
  name: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  type: string;
  accessible: boolean;
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
    <Card className="py-0">
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
