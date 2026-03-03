-- Seed the 6 mock restaurants with fixed UUIDs
insert into public.restaurants (id, slug, name, price_range, type, accessible, address, description) values
  ('a1b2c3d4-0001-4000-8000-000000000001', 'barbuto-brooklyn', 'Barbuto Brooklyn', '$50–100', 'Restaurant', true,
   '775 Washington St, New York, NY 10014',
   'A beloved neighborhood Italian restaurant known for its wood-fired rotisserie chicken, seasonal vegetables, and rustic charm. Set in a converted garage with retractable walls, Barbuto offers an airy, relaxed atmosphere beloved by locals and visitors alike.'),

  ('a1b2c3d4-0001-4000-8000-000000000002', 'le-bernardin', 'Le Bernardin', '$100+', 'Fine Dining', false,
   '155 W 51st St, New York, NY 10019',
   'World-renowned French seafood restaurant holding three Michelin stars. Chef Eric Ripert''s cuisine is celebrated for its masterful preparation of the finest fish and shellfish, presented in an elegant, understated setting in Midtown Manhattan.'),

  ('a1b2c3d4-0001-4000-8000-000000000003', 'shake-shack', 'Shake Shack', '$10–30', 'Casual', true,
   'Madison Square Park, New York, NY 10010',
   'Born from a hot dog cart in Madison Square Park, Shake Shack has grown into a global phenomenon. Famous for its ShackBurger, crinkle-cut fries, and hand-spun frozen custard shakes — quality fast food done right.'),

  ('a1b2c3d4-0001-4000-8000-000000000004', 'nobu-downtown', 'Nobu Downtown', '$75–150', 'Japanese', true,
   '195 Broadway, New York, NY 10007',
   'Nobu Downtown brings Chef Nobu Matsuhisa''s iconic Japanese-Peruvian fusion cuisine to lower Manhattan. Signature dishes like black cod with miso and yellowtail jalapeño are served in a stunning two-story space designed by David Rockwell.'),

  ('a1b2c3d4-0001-4000-8000-000000000005', 'the-spotted-pig', 'The Spotted Pig', '$40–70', 'Gastropub', false,
   '314 W 11th St, New York, NY 10014',
   'A West Village institution that pioneered the gastropub movement in New York City. Known for its chargrilled burger with Roquefort cheese, deviled kidneys on toast, and an extensive beer and wine list in a cozy, two-floor townhouse setting.'),

  ('a1b2c3d4-0001-4000-8000-000000000006', 'carbone', 'Carbone', '$80–120', 'Italian', true,
   '181 Thompson St, New York, NY 10012',
   'An homage to the Italian-American restaurants of mid-20th century New York, Carbone is a theatrical dining experience in Greenwich Village. Tuxedoed waiters serve elevated classics like spicy rigatoni vodka and veal parmesan in a retro-glamorous setting.');

-- Seed restaurant images
insert into public.restaurant_images (restaurant_id, url, alt_text, display_order) values
  ('a1b2c3d4-0001-4000-8000-000000000001', '/images/placeholder.jpg', 'Interior', 0),
  ('a1b2c3d4-0001-4000-8000-000000000001', '/images/placeholder.jpg', 'Wood-fired chicken', 1),
  ('a1b2c3d4-0001-4000-8000-000000000001', '/images/placeholder.jpg', 'Seasonal pasta', 2),
  ('a1b2c3d4-0001-4000-8000-000000000001', '/images/placeholder.jpg', 'Bar area', 3),

  ('a1b2c3d4-0001-4000-8000-000000000002', '/images/placeholder.jpg', 'Dining room', 0),
  ('a1b2c3d4-0001-4000-8000-000000000002', '/images/placeholder.jpg', 'Seafood platter', 1),
  ('a1b2c3d4-0001-4000-8000-000000000002', '/images/placeholder.jpg', 'Tasting menu', 2),
  ('a1b2c3d4-0001-4000-8000-000000000002', '/images/placeholder.jpg', 'Wine cellar', 3),

  ('a1b2c3d4-0001-4000-8000-000000000003', '/images/placeholder.jpg', 'ShackBurger', 0),
  ('a1b2c3d4-0001-4000-8000-000000000003', '/images/placeholder.jpg', 'Crinkle fries', 1),
  ('a1b2c3d4-0001-4000-8000-000000000003', '/images/placeholder.jpg', 'Custard shake', 2),
  ('a1b2c3d4-0001-4000-8000-000000000003', '/images/placeholder.jpg', 'Outdoor seating', 3),

  ('a1b2c3d4-0001-4000-8000-000000000004', '/images/placeholder.jpg', 'Black cod miso', 0),
  ('a1b2c3d4-0001-4000-8000-000000000004', '/images/placeholder.jpg', 'Sushi bar', 1),
  ('a1b2c3d4-0001-4000-8000-000000000004', '/images/placeholder.jpg', 'Main dining room', 2),
  ('a1b2c3d4-0001-4000-8000-000000000004', '/images/placeholder.jpg', 'Cocktails', 3),

  ('a1b2c3d4-0001-4000-8000-000000000005', '/images/placeholder.jpg', 'Chargrilled burger', 0),
  ('a1b2c3d4-0001-4000-8000-000000000005', '/images/placeholder.jpg', 'Deviled kidneys', 1),
  ('a1b2c3d4-0001-4000-8000-000000000005', '/images/placeholder.jpg', 'Bar', 2),
  ('a1b2c3d4-0001-4000-8000-000000000005', '/images/placeholder.jpg', 'Cozy interior', 3),

  ('a1b2c3d4-0001-4000-8000-000000000006', '/images/placeholder.jpg', 'Spicy rigatoni', 0),
  ('a1b2c3d4-0001-4000-8000-000000000006', '/images/placeholder.jpg', 'Veal parmesan', 1),
  ('a1b2c3d4-0001-4000-8000-000000000006', '/images/placeholder.jpg', 'Retro dining room', 2),
  ('a1b2c3d4-0001-4000-8000-000000000006', '/images/placeholder.jpg', 'Desserts', 3);


