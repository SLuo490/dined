-- Computed view: average rating and review count per restaurant
create or replace view public.restaurant_stats as
select
  r.id as restaurant_id,
  coalesce(avg(rv.rating), 0)::numeric(2,1) as avg_rating,
  count(rv.id)::int as review_count
from public.restaurants r
left join public.reviews rv on rv.restaurant_id = r.id
group by r.id;
