import { UtensilsCrossed, Accessibility } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <Card className="py-0 transition-shadow hover:shadow-md hover:ring-2 hover:ring-ring/30 focus-within:ring-2 focus-within:ring-ring/50 cursor-pointer">
      <div className="bg-muted flex h-44 items-center justify-center">
        <UtensilsCrossed aria-hidden="true" className="text-muted-foreground/30 size-12" />
      </div>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5 pb-6">
        <div className="flex items-center gap-1.5 text-sm">
          <StarRating rating={rating} />
          <span className="text-muted-foreground">({reviewCount})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="secondary">{priceRange}</Badge>
          <Badge variant="outline">{type}</Badge>
          {accessible && (
            <Badge variant="outline" className="gap-1">
              <Accessibility className="size-3" />
              Accessible
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
