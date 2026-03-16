import { UtensilsCrossed, Star, ListChecks, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: UtensilsCrossed,
    title: "Track Every Meal",
    description:
      "Log every restaurant visit with notes, photos, and memories. Never forget a great meal again.",
  },
  {
    icon: Star,
    title: "Rate & Review",
    description:
      "Share your honest take on food, service, and ambiance. Help others discover hidden gems.",
  },
  {
    icon: ListChecks,
    title: "Build Lists",
    description:
      "Curate themed collections like Best Brunch in the City or Date Night Spots to revisit anytime.",
  },
  {
    icon: Share2,
    title: "Share Discoveries",
    description:
      "Share your lists and reviews with friends so they can benefit from your food expertise.",
  },
];

export function LandingFeatures() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-8">
      <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-center mb-10">
        Everything you need to remember every meal
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title}>
              <CardHeader className="pb-2">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-[oklch(0.97_0.03_75)]">
                  <Icon
                    aria-hidden="true"
                    className="size-5 [color:var(--chart-1)]"
                  />
                </div>
                <CardTitle className="font-display text-base">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
