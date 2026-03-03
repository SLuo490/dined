import { createClient } from "@/lib/supabase/server";
import type { RestaurantSummary, RestaurantDetail } from "@/lib/definitions";

export async function getRestaurants(): Promise<RestaurantSummary[]> {
  const supabase = await createClient();

  const { data: restaurants, error: rError } = await supabase
    .from("restaurants")
    .select("id, slug, name, price_range, type, accessible")
    .order("name");

  if (rError || !restaurants) return [];

  const { data: stats, error: sError } = await supabase
    .from("restaurant_stats")
    .select("restaurant_id, avg_rating, review_count");

  const statsMap = new Map(
    (sError ? [] : (stats ?? [])).map((s) => [s.restaurant_id, s]),
  );

  return restaurants.map((r) => {
    const s = statsMap.get(r.id);
    return {
      ...r,
      avg_rating: Number(s?.avg_rating ?? 0),
      review_count: Number(s?.review_count ?? 0),
    };
  });
}

export async function getRestaurantBySlug(
  slug: string,
): Promise<RestaurantDetail | null> {
  const supabase = await createClient();

  const { data: restaurant, error: rError } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", slug)
    .single();

  if (rError || !restaurant) return null;

  const [{ data: images }, { data: stats }] = await Promise.all([
    supabase
      .from("restaurant_images")
      .select("*")
      .eq("restaurant_id", restaurant.id)
      .order("display_order"),
    supabase
      .from("restaurant_stats")
      .select("avg_rating, review_count")
      .eq("restaurant_id", restaurant.id)
      .single(),
  ]);

  return {
    ...restaurant,
    images: images ?? [],
    avg_rating: Number(stats?.avg_rating ?? 0),
    review_count: Number(stats?.review_count ?? 0),
  };
}
