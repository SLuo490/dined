-- Enable RLS on all tables
alter table public.restaurants enable row level security;
alter table public.restaurant_images enable row level security;
alter table public.reviews enable row level security;
alter table public.lists enable row level security;
alter table public.list_items enable row level security;

-- Restaurants: public read
create policy "restaurants_select" on public.restaurants
  for select using (true);

-- Restaurant images: public read
create policy "restaurant_images_select" on public.restaurant_images
  for select using (true);

-- Reviews: public read
create policy "reviews_select" on public.reviews
  for select using (true);

-- Reviews: authenticated users can insert their own
create policy "reviews_insert" on public.reviews
  for insert with check (auth.uid() = user_id);

-- Reviews: authors can update their own
create policy "reviews_update" on public.reviews
  for update using (auth.uid() = user_id);

-- Reviews: authors can delete their own
create policy "reviews_delete" on public.reviews
  for delete using (auth.uid() = user_id);

-- Lists: owner can read own + anyone can read public lists
create policy "lists_select" on public.lists
  for select using (auth.uid() = user_id or is_public = true);

-- Lists: authenticated users can insert their own
create policy "lists_insert" on public.lists
  for insert with check (auth.uid() = user_id);

-- Lists: owners can update their own
create policy "lists_update" on public.lists
  for update using (auth.uid() = user_id);

-- Lists: owners can delete their own
create policy "lists_delete" on public.lists
  for delete using (auth.uid() = user_id);

-- List items: readable if the parent list is readable
create policy "list_items_select" on public.list_items
  for select using (
    exists (
      select 1 from public.lists l
      where l.id = list_id
        and (l.user_id = auth.uid() or l.is_public = true)
    )
  );

-- List items: insertable if user owns the list
create policy "list_items_insert" on public.list_items
  for insert with check (
    exists (
      select 1 from public.lists l
      where l.id = list_id and l.user_id = auth.uid()
    )
  );

-- List items: deletable if user owns the list
create policy "list_items_delete" on public.list_items
  for delete using (
    exists (
      select 1 from public.lists l
      where l.id = list_id and l.user_id = auth.uid()
    )
  );
