import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "lg";
}

export function StarRating({ rating, size = "sm" }: StarRatingProps) {
  const cls = size === "lg" ? "size-5" : "size-4";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <span key={i} className={`relative ${cls}`}>
            <Star className={`${cls} fill-gray-200 text-gray-200`} />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : "50%" }}
              >
                <Star className={`${cls} fill-yellow-400 text-yellow-400`} />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
