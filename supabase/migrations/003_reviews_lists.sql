-- Reviews table
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating numeric(2,1) not null check (rating >= 1 and rating <= 5),
  body text not null default '',
  visited_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, restaurant_id)
);

create trigger reviews_updated_at
  before update on public.reviews
  for each row execute function public.set_updated_at();

create index idx_reviews_restaurant_id on public.reviews(restaurant_id);
create index idx_reviews_user_id on public.reviews(user_id);

-- Lists table
create table public.lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text not null default '',
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger lists_updated_at
  before update on public.lists
  for each row execute function public.set_updated_at();

create index idx_lists_user_id on public.lists(user_id);

-- List items junction table
create table public.list_items (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references public.lists(id) on delete cascade,
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (list_id, restaurant_id)
);

create index idx_list_items_list_id on public.list_items(list_id);
