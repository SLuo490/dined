import Link from "next/link";
import { Utensils, Star, CircleCheck } from "lucide-react";

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="size-3 fill-orange-500 text-orange-500" />
      ))}
    </div>
  );
}

function RestaurantCard({
  name,
  cuisine,
  neighborhood,
  gradient,
}: {
  name: string;
  cuisine: string;
  neighborhood: string;
  gradient: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-xl">
      <div
        className={`size-12 flex-shrink-0 rounded-lg ${gradient}`}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-white">{name}</span>
        <StarRating />
        <span className="text-xs text-zinc-400">
          {cuisine} &bull; {neighborhood}
        </span>
      </div>
    </div>
  );
}

function ReviewCard({
  name,
  quote,
  avatarColor,
  initials,
}: {
  name: string;
  quote: string;
  avatarColor: string;
  initials: string;
}) {
  return (
    <div className="max-w-[230px] rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl">
      <div className="mb-2 flex items-center gap-2">
        <div
          className={`flex size-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColor}`}
        >
          {initials}
        </div>
        <span className="text-sm font-semibold text-white">{name}</span>
      </div>
      <p className="text-xs leading-relaxed text-zinc-400">&ldquo;{quote}&rdquo;</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950">
      {/* Floating cards — left column */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {/* Top-left: restaurant card */}
        <div className="absolute left-10 top-20">
          <RestaurantCard
            name="Cote Korean Steakhouse"
            cuisine="Korean"
            neighborhood="Flatiron"
            gradient="bg-gradient-to-br from-amber-700 to-orange-900"
          />
        </div>

        {/* Mid-left: review card */}
        <div className="absolute left-6 top-64">
          <ReviewCard
            name="Marcus Lee"
            quote="Finally, a beautiful way to document every dining experience. The year in food feature is amazing!"
            avatarColor="bg-indigo-600"
            initials="ML"
          />
        </div>

        {/* Mid-right: review card */}
        <div className="absolute right-6 top-40">
          <ReviewCard
            name="Sarah Chen"
            quote="Best app for tracking my food adventures! Love the clean interface and detailed stats."
            avatarColor="bg-rose-600"
            initials="SC"
          />
        </div>

        {/* Bottom-right: restaurant card */}
        <div className="absolute bottom-36 right-10">
          <RestaurantCard
            name="Junoon"
            cuisine="Indian"
            neighborhood="Flatiron"
            gradient="bg-gradient-to-br from-yellow-600 to-orange-700"
          />
        </div>
      </div>

      {/* Hero section */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        {/* Icon */}
        <Utensils className="mb-4 size-12 text-orange-500" strokeWidth={1.5} />

        {/* Title */}
        <h1 className="mb-3 text-6xl font-bold tracking-tight text-white">
          dineD
        </h1>

        {/* Subtitle */}
        <p className="mb-4 text-xl font-medium text-zinc-200">
          Your Personal Restaurant Diary
        </p>

        {/* Description */}
        <p className="mb-10 max-w-md text-zinc-400">
          Document every meal, rate your experiences, and build your culinary
          story. Join thousands of food lovers tracking their dining adventures.
        </p>

        {/* Stats */}
        <div className="mb-10 flex items-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white">50K+</span>
            <span className="mt-1 text-sm text-zinc-400">Active Users</span>
          </div>
          <div className="h-10 w-px bg-zinc-700" />
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white">2M+</span>
            <span className="mt-1 text-sm text-zinc-400">Meals Logged</span>
          </div>
          <div className="h-10 w-px bg-zinc-700" />
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white">100K+</span>
            <span className="mt-1 text-sm text-zinc-400">Restaurants</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/signup"
            className="rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-zinc-600 bg-zinc-800 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            Sign In
          </Link>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {[
            "Track Every Meal",
            "Rate & Review",
            "Build Lists",
            "Share Discoveries",
          ].map((feature) => (
            <span
              key={feature}
              className="flex items-center gap-1.5 text-sm text-zinc-400"
            >
              <CircleCheck className="size-4 text-orange-500" />
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 flex justify-center gap-6 py-6 text-sm text-zinc-500">
        {["About", "Features", "Privacy", "Terms", "Contact"].map((item) => (
          <Link
            key={item}
            href="#"
            className="transition-colors hover:text-zinc-300"
          >
            {item}
          </Link>
        ))}
      </footer>
    </main>
  );
}
