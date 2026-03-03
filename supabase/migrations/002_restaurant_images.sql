-- Restaurant images table
create table public.restaurant_images (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  url text not null,
  alt_text text not null default '',
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index idx_restaurant_images_restaurant_id on public.restaurant_images(restaurant_id);
