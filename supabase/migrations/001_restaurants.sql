-- Restaurants table
create table public.restaurants (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  price_range text not null,
  type text not null,
  accessible boolean not null default false,
  address text not null,
  description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at on row change
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger restaurants_updated_at
  before update on public.restaurants
  for each row execute function public.set_updated_at();
