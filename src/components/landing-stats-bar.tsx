import { UtensilsCrossed, MessageSquare, ListChecks } from "lucide-react";
import type { LandingStats } from "@/lib/queries";

const iconClass = "size-6 [color:var(--chart-1)]";

const statItems = (stats: LandingStats) => [
  {
    icon: <UtensilsCrossed aria-hidden="true" className={iconClass} />,
    value: stats.restaurantCount,
    label: "Restaurants",
  },
  {
    icon: <MessageSquare aria-hidden="true" className={iconClass} />,
    value: stats.reviewCount,
    label: "Reviews",
  },
  {
    icon: <ListChecks aria-hidden="true" className={iconClass} />,
    value: stats.listCount,
    label: "Curated Lists",
  },
];

export function LandingStatsBar({ stats }: { stats: LandingStats }) {
  return (
    <div className="w-full border-t border-b border-border bg-background">
      <div className="mx-auto flex max-w-3xl divide-x divide-border">
        {statItems(stats).map((item) => (
          <div
            key={item.label}
            className="flex flex-1 flex-col items-center gap-1 py-5 px-4"
          >
            {item.icon}
            <span className="text-3xl font-bold tabular-nums">
              {item.value}
            </span>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
