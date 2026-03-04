-- Seed 2 fake users for reviews (UUIDs use '5eed' as a mnemonic for "seed")
insert into auth.users (id, email, encrypted_password, email_confirmed_at, aud, role, created_at, updated_at)
values
  ('00000000-5eed-4000-8000-000000000001', 'seed1@dined.app', '', now(), 'authenticated', 'authenticated', now(), now()),
  ('00000000-5eed-4000-8000-000000000002', 'seed2@dined.app', '', now(), 'authenticated', 'authenticated', now(), now())
on conflict (id) do nothing;

-- Seed 8 additional restaurants
insert into public.restaurants (id, slug, name, price_range, type, accessible, address, description)
values
  ('a1b2c3d4-0001-4000-8000-000000000007', 'eleven-madison-park', 'Eleven Madison Park', '$100+', 'Fine Dining', true,
   '11 Madison Ave, New York, NY 10010',
   'A New York landmark and perennial world''s-best-list contender, Eleven Madison Park delivers an ambitious plant-based tasting menu under Chef Daniel Humm. The soaring Art Deco dining room overlooking Madison Square Park provides a dramatic backdrop for one of the most celebrated dining experiences in the world.'),

  ('a1b2c3d4-0001-4000-8000-000000000008', 'joes-pizza', 'Joe''s Pizza', '$10–30', 'Casual', true,
   '7 Carmine St, New York, NY 10014',
   'A Greenwich Village institution since 1975, Joe''s Pizza is the gold standard for New York-style pizza by the slice. Crispy, thin crust, tangy tomato sauce, and just the right amount of mozzarella — a no-frills slice that has fueled New Yorkers for generations.'),

  ('a1b2c3d4-0001-4000-8000-000000000009', 'peter-luger', 'Peter Luger Steak House', '$80–120', 'Steakhouse', false,
   '178 Broadway, Brooklyn, NY 11211',
   'A Brooklyn institution since 1887, Peter Luger Steak House is a pilgrimage for steak lovers worldwide. The legendary dry-aged porterhouse for two is served sizzling in its own butter in a no-frills setting where the beef — and the gruff service — have become part of the legend.'),

  ('a1b2c3d4-0001-4000-8000-00000000000a', 'xian-famous-foods', 'Xi''an Famous Foods', '$10–30', 'Chinese', true,
   '81 St Marks Pl, New York, NY 10003',
   'Xi''an Famous Foods brought the bold, spicy flavors of China''s ancient capital to New York City. Hand-ripped biang biang noodles, cumin lamb burgers, and tiger vegetable salad pack serious heat and depth — a cult favorite for adventurous eaters seeking something beyond the ordinary.'),

  ('a1b2c3d4-0001-4000-8000-00000000000b', 'gramercy-tavern', 'Gramercy Tavern', '$60–100', 'American', true,
   '42 E 20th St, New York, NY 10003',
   'For over three decades, Gramercy Tavern has been the quintessential New York dining experience — warm, welcoming, and reliably excellent. Danny Meyer''s flagship serves seasonal American cuisine with an extensive craft beverage program in a beautifully appointed room adorned with floral arrangements and folk art.'),

  ('a1b2c3d4-0001-4000-8000-00000000000c', 'katzs-delicatessen', 'Katz''s Delicatessen', '$20–40', 'Deli', true,
   '205 E Houston St, New York, NY 10002',
   'Open since 1888, Katz''s Delicatessen is the Lower East Side landmark best known for its impossibly thick pastrami and corned beef sandwiches, hand-carved to order. Immortalized in film and steeped in history, a visit to Katz''s is as much a New York cultural rite as it is a meal.'),

  ('a1b2c3d4-0001-4000-8000-00000000000d', 'momofuku-noodle-bar', 'Momofuku Noodle Bar', '$30–60', 'Asian Fusion', true,
   '171 1st Ave, New York, NY 10003',
   'The original Momofuku that launched David Chang''s culinary empire, Noodle Bar remains a vibrant East Village destination for inventive Asian-inspired cooking. The pork buns, ginger scallion noodles, and rotating small plates reflect a relentlessly curious kitchen that helped define the modern New York dining scene.'),

  ('a1b2c3d4-0001-4000-8000-00000000000e', 'don-angie', 'Don Angie', '$60–100', 'Italian', false,
   '103 Greenwich Ave, New York, NY 10014',
   'Don Angie offers a playful, inventive take on Italian-American classics in a cozy West Village townhouse. Chef-couple Scott Tacinelli and Angie Rito''s pinwheel lasagna and chrysanthemum salad have become downtown icons, earning the restaurant a devoted following and a coveted Michelin star.')
on conflict (id) do nothing;

-- Images for new restaurants (4 per restaurant)
insert into public.restaurant_images (restaurant_id, url, alt_text, display_order)
values
  ('a1b2c3d4-0001-4000-8000-000000000007', '/images/placeholder.jpg', 'Art Deco dining room', 0),
  ('a1b2c3d4-0001-4000-8000-000000000007', '/images/placeholder.jpg', 'Tasting menu course', 1),
  ('a1b2c3d4-0001-4000-8000-000000000007', '/images/placeholder.jpg', 'Madison Square Park view', 2),
  ('a1b2c3d4-0001-4000-8000-000000000007', '/images/placeholder.jpg', 'Dessert course', 3),

  ('a1b2c3d4-0001-4000-8000-000000000008', '/images/placeholder.jpg', 'Pizza slice', 0),
  ('a1b2c3d4-0001-4000-8000-000000000008', '/images/placeholder.jpg', 'Counter service', 1),
  ('a1b2c3d4-0001-4000-8000-000000000008', '/images/placeholder.jpg', 'Whole pie', 2),
  ('a1b2c3d4-0001-4000-8000-000000000008', '/images/placeholder.jpg', 'Carmine Street storefront', 3),

  ('a1b2c3d4-0001-4000-8000-000000000009', '/images/placeholder.jpg', 'Porterhouse for two', 0),
  ('a1b2c3d4-0001-4000-8000-000000000009', '/images/placeholder.jpg', 'Dining room', 1),
  ('a1b2c3d4-0001-4000-8000-000000000009', '/images/placeholder.jpg', 'Creamed spinach', 2),
  ('a1b2c3d4-0001-4000-8000-000000000009', '/images/placeholder.jpg', 'Schlag dessert', 3),

  ('a1b2c3d4-0001-4000-8000-00000000000a', '/images/placeholder.jpg', 'Biang biang noodles', 0),
  ('a1b2c3d4-0001-4000-8000-00000000000a', '/images/placeholder.jpg', 'Cumin lamb burger', 1),
  ('a1b2c3d4-0001-4000-8000-00000000000a', '/images/placeholder.jpg', 'Spicy tian shui mian', 2),
  ('a1b2c3d4-0001-4000-8000-00000000000a', '/images/placeholder.jpg', 'St Marks storefront', 3),

  ('a1b2c3d4-0001-4000-8000-00000000000b', '/images/placeholder.jpg', 'Main dining room', 0),
  ('a1b2c3d4-0001-4000-8000-00000000000b', '/images/placeholder.jpg', 'Seasonal vegetables', 1),
  ('a1b2c3d4-0001-4000-8000-00000000000b', '/images/placeholder.jpg', 'Craft cocktails', 2),
  ('a1b2c3d4-0001-4000-8000-00000000000b', '/images/placeholder.jpg', 'Tavern room', 3),

  ('a1b2c3d4-0001-4000-8000-00000000000c', '/images/placeholder.jpg', 'Pastrami on rye', 0),
  ('a1b2c3d4-0001-4000-8000-00000000000c', '/images/placeholder.jpg', 'Counter and deli case', 1),
  ('a1b2c3d4-0001-4000-8000-00000000000c', '/images/placeholder.jpg', 'Ticket system', 2),
  ('a1b2c3d4-0001-4000-8000-00000000000c', '/images/placeholder.jpg', 'Bustling dining room', 3),

  ('a1b2c3d4-0001-4000-8000-00000000000d', '/images/placeholder.jpg', 'Pork buns', 0),
  ('a1b2c3d4-0001-4000-8000-00000000000d', '/images/placeholder.jpg', 'Ginger scallion noodles', 1),
  ('a1b2c3d4-0001-4000-8000-00000000000d', '/images/placeholder.jpg', 'Open kitchen', 2),
  ('a1b2c3d4-0001-4000-8000-00000000000d', '/images/placeholder.jpg', 'East Village exterior', 3),

  ('a1b2c3d4-0001-4000-8000-00000000000e', '/images/placeholder.jpg', 'Pinwheel lasagna', 0),
  ('a1b2c3d4-0001-4000-8000-00000000000e', '/images/placeholder.jpg', 'Chrysanthemum salad', 1),
  ('a1b2c3d4-0001-4000-8000-00000000000e', '/images/placeholder.jpg', 'Cozy dining room', 2),
  ('a1b2c3d4-0001-4000-8000-00000000000e', '/images/placeholder.jpg', 'West Village facade', 3)
on conflict do nothing;

-- Reviews: seed1 reviews all 14 restaurants
insert into public.reviews (restaurant_id, user_id, rating, body, visited_on)
values
  -- Existing restaurants
  ('a1b2c3d4-0001-4000-8000-000000000001', '00000000-5eed-4000-8000-000000000001', 4.5, 'The rotisserie chicken is everything. Rustic, soulful Italian in a gorgeous space.', '2026-01-15'),
  ('a1b2c3d4-0001-4000-8000-000000000002', '00000000-5eed-4000-8000-000000000001', 5.0, 'Simply the best seafood in the country. Every bite was a revelation.', '2026-01-20'),
  ('a1b2c3d4-0001-4000-8000-000000000003', '00000000-5eed-4000-8000-000000000001', 4.0, 'The ShackBurger never disappoints. Long line but always worth it.', '2026-01-22'),
  ('a1b2c3d4-0001-4000-8000-000000000004', '00000000-5eed-4000-8000-000000000001', 4.5, 'Black cod miso is transcendent. Stunning space to match the food.', '2026-01-28'),
  ('a1b2c3d4-0001-4000-8000-000000000005', '00000000-5eed-4000-8000-000000000001', 3.5, 'Iconic burger, chaotic atmosphere. The West Village charm is real.', '2026-02-03'),
  ('a1b2c3d4-0001-4000-8000-000000000006', '00000000-5eed-4000-8000-000000000001', 5.0, 'The spicy rigatoni vodka is worth the impossible reservation. Pure Italian-American theatre.', '2026-02-10'),
  -- New restaurants
  ('a1b2c3d4-0001-4000-8000-000000000007', '00000000-5eed-4000-8000-000000000001', 5.0, 'Extraordinary plant-based tasting menu. The best meal of my life in that stunning Art Deco room.', '2026-02-14'),
  ('a1b2c3d4-0001-4000-8000-000000000008', '00000000-5eed-4000-8000-000000000001', 4.5, 'Perfect New York slice — crispy, tangy, and completely satisfying. This is the benchmark.', '2026-02-17'),
  ('a1b2c3d4-0001-4000-8000-000000000009', '00000000-5eed-4000-8000-000000000001', 4.5, 'The porterhouse is a religious experience. Order the creamed spinach and schlag. Non-negotiable.', '2026-02-20'),
  ('a1b2c3d4-0001-4000-8000-00000000000a', '00000000-5eed-4000-8000-000000000001', 4.5, 'Biang biang noodles with spicy cumin lamb — bold, fiery, unforgettable. A true cult classic.', '2026-02-22'),
  ('a1b2c3d4-0001-4000-8000-00000000000b', '00000000-5eed-4000-8000-000000000001', 4.5, 'The warmth of this place is unmatched. Seasonal American cooking at its very best.', '2026-02-25'),
  ('a1b2c3d4-0001-4000-8000-00000000000c', '00000000-5eed-4000-8000-000000000001', 4.0, 'A New York rite of passage. The pastrami mountain is obscene in the best possible way.', '2026-02-26'),
  ('a1b2c3d4-0001-4000-8000-00000000000d', '00000000-5eed-4000-8000-000000000001', 4.0, 'The pork buns alone are worth the trip. Creative, energetic, and delicious.', '2026-02-27'),
  ('a1b2c3d4-0001-4000-8000-00000000000e', '00000000-5eed-4000-8000-000000000001', 4.5, 'The pinwheel lasagna is a work of art. Inventive Italian cooking in an intimate setting.', '2026-03-01')
on conflict (user_id, restaurant_id) do nothing;

-- Reviews: seed2 reviews all 14 restaurants
insert into public.reviews (restaurant_id, user_id, rating, body, visited_on)
values
  -- Existing restaurants
  ('a1b2c3d4-0001-4000-8000-000000000001', '00000000-5eed-4000-8000-000000000002', 4.0, 'Lovely neighborhood spot. The wood-fired chicken and pasta were both excellent.', '2026-01-18'),
  ('a1b2c3d4-0001-4000-8000-000000000002', '00000000-5eed-4000-8000-000000000002', 4.5, 'An impeccable dining experience. The seafood preparations are unparalleled in NYC.', '2026-01-25'),
  ('a1b2c3d4-0001-4000-8000-000000000003', '00000000-5eed-4000-8000-000000000002', 4.0, 'Classic NYC fast food done right. The cheese fries are dangerously addictive.', '2026-01-30'),
  ('a1b2c3d4-0001-4000-8000-000000000004', '00000000-5eed-4000-8000-000000000002', 4.0, 'Gorgeous space, standout Japanese-Peruvian fusion. The omakase was superb.', '2026-02-05'),
  ('a1b2c3d4-0001-4000-8000-000000000005', '00000000-5eed-4000-8000-000000000002', 3.5, 'Great burger and good beer selection. Gets loud and crowded but it''s part of the experience.', '2026-02-08'),
  ('a1b2c3d4-0001-4000-8000-000000000006', '00000000-5eed-4000-8000-000000000002', 4.5, 'Dramatic, delicious, unforgettable. The veal parm is a must-order classic.', '2026-02-12'),
  -- New restaurants
  ('a1b2c3d4-0001-4000-8000-000000000007', '00000000-5eed-4000-8000-000000000002', 4.5, 'A landmark tasting menu experience. The service and setting are as memorable as the food.', '2026-02-16'),
  ('a1b2c3d4-0001-4000-8000-000000000008', '00000000-5eed-4000-8000-000000000002', 4.0, 'No-frills, no-nonsense New York pizza. Fast, cheap, and absolutely delicious.', '2026-02-18'),
  ('a1b2c3d4-0001-4000-8000-000000000009', '00000000-5eed-4000-8000-000000000002', 4.0, 'Legendary steak. The gruff service and cash-only policy are all part of the Peter Luger experience.', '2026-02-21'),
  ('a1b2c3d4-0001-4000-8000-00000000000a', '00000000-5eed-4000-8000-000000000002', 4.0, 'Insanely good and insanely cheap. The spicy lamb face noodles are not for the faint-hearted.', '2026-02-23'),
  ('a1b2c3d4-0001-4000-8000-00000000000b', '00000000-5eed-4000-8000-000000000002', 4.5, 'Consistently excellent. The roasted chicken and mushroom dishes were standouts.', '2026-02-24'),
  ('a1b2c3d4-0001-4000-8000-00000000000c', '00000000-5eed-4000-8000-000000000002', 3.5, 'Chaotic, loud, and tons of fun. The corned beef is as good as the pastrami.', '2026-02-26'),
  ('a1b2c3d4-0001-4000-8000-00000000000d', '00000000-5eed-4000-8000-000000000002', 4.0, 'Noodle Bar is still a downtown institution. The bo ssam for the table is legendary.', '2026-02-28'),
  ('a1b2c3d4-0001-4000-8000-00000000000e', '00000000-5eed-4000-8000-000000000002', 4.0, 'Charming and creative. That lasagna is unlike anything else in the city.', '2026-03-02')
on conflict (user_id, restaurant_id) do nothing;
