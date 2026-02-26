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

interface Restaurant {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  type: string;
  accessible: boolean;
  address: string;
  description: string;
  images: string[];
}

const RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: "Barbuto Brooklyn",
    rating: 5,
    reviewCount: 123,
    priceRange: "$50–100",
    type: "Restaurant",
    accessible: true,
    address: "775 Washington St, New York, NY 10014",
    description:
      "A beloved neighborhood Italian restaurant known for its wood-fired rotisserie chicken, seasonal vegetables, and rustic charm. Set in a converted garage with retractable walls, Barbuto offers an airy, relaxed atmosphere beloved by locals and visitors alike.",
    images: ["Interior", "Wood-fired chicken", "Seasonal pasta", "Bar area"],
  },
  {
    id: 2,
    name: "Le Bernardin",
    rating: 4.8,
    reviewCount: 456,
    priceRange: "$100+",
    type: "Fine Dining",
    accessible: false,
    address: "155 W 51st St, New York, NY 10019",
    description:
      "World-renowned French seafood restaurant holding three Michelin stars. Chef Eric Ripert's cuisine is celebrated for its masterful preparation of the finest fish and shellfish, presented in an elegant, understated setting in Midtown Manhattan.",
    images: ["Dining room", "Seafood platter", "Tasting menu", "Wine cellar"],
  },
  {
    id: 3,
    name: "Shake Shack",
    rating: 4.2,
    reviewCount: 892,
    priceRange: "$10–30",
    type: "Casual",
    accessible: true,
    address: "Madison Square Park, New York, NY 10010",
    description:
      "Born from a hot dog cart in Madison Square Park, Shake Shack has grown into a global phenomenon. Famous for its ShackBurger, crinkle-cut fries, and hand-spun frozen custard shakes — quality fast food done right.",
    images: [
      "ShackBurger",
      "Crinkle fries",
      "Custard shake",
      "Outdoor seating",
    ],
  },
  {
    id: 4,
    name: "Nobu Downtown",
    rating: 4.6,
    reviewCount: 311,
    priceRange: "$75–150",
    type: "Japanese",
    accessible: true,
    address: "195 Broadway, New York, NY 10007",
    description:
      "Nobu Downtown brings Chef Nobu Matsuhisa's iconic Japanese-Peruvian fusion cuisine to lower Manhattan. Signature dishes like black cod with miso and yellowtail jalapeño are served in a stunning two-story space designed by David Rockwell.",
    images: ["Black cod miso", "Sushi bar", "Main dining room", "Cocktails"],
  },
  {
    id: 5,
    name: "The Spotted Pig",
    rating: 4.3,
    reviewCount: 204,
    priceRange: "$40–70",
    type: "Gastropub",
    accessible: false,
    address: "314 W 11th St, New York, NY 10014",
    description:
      "A West Village institution that pioneered the gastropub movement in New York City. Known for its chargrilled burger with Roquefort cheese, deviled kidneys on toast, and an extensive beer and wine list in a cozy, two-floor townhouse setting.",
    images: ["Chargrilled burger", "Deviled kidneys", "Bar", "Cozy interior"],
  },
  {
    id: 6,
    name: "Carbone",
    rating: 4.7,
    reviewCount: 589,
    priceRange: "$80–120",
    type: "Italian",
    accessible: true,
    address: "181 Thompson St, New York, NY 10012",
    description:
      "An homage to the Italian-American restaurants of mid-20th century New York, Carbone is a theatrical dining experience in Greenwich Village. Tuxedoed waiters serve elevated classics like spicy rigatoni vodka and veal parmesan in a retro-glamorous setting.",
    images: [
      "Spicy rigatoni",
      "Veal parmesan",
      "Retro dining room",
      "Desserts",
    ],
  },
];

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = await params;
  const restaurant =
    RESTAURANTS.find((r) => r.id === Number(restaurantId)) ?? notFound();

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
            <StarRating rating={restaurant.rating} size="lg" />
            <span className="text-muted-foreground text-sm">
              ({restaurant.reviewCount}) &middot; {restaurant.priceRange}{" "}
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
            {restaurant.images.map((label) => (
              <CarouselItem
                key={label}
                className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="h-40 bg-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">{label}</span>
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
