-- Restore the original Cake House catalogue from src/config/siteConfig.ts.
-- Safe, one-time seed: runs repeatedly without creating duplicates.
-- Run this in Supabase SQL Editor after the schema file has been applied.

insert into public.cakes (
  id,
  name,
  description,
  category,
  image,
  sizes,
  flavours,
  featured,
  is_available
)
values
  (
    'bday-001',
    'Golden Celebration Cake',
    'A light vanilla sponge layered with fresh cream and topped with a golden number candle. Perfect for milestone birthdays.',
    'birthday',
    'https://images.pexels.com/photos/10885107/pexels-photo-10885107.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '[{"label":"Small","weight":"1 lb","price":2200},{"label":"Medium","weight":"2 lb","price":3800},{"label":"Large","weight":"3 lb","price":5200}]'::jsonb,
    '[{"id":"vanilla","label":"Vanilla Sponge"},{"id":"chocolate","label":"Chocolate Fudge"},{"id":"red-velvet","label":"Red Velvet"},{"id":"strawberry","label":"Strawberry Cream"},{"id":"butterscotch","label":"Butterscotch"},{"id":"pistachio","label":"Pistachio Delight"}]'::jsonb,
    true,
    true
  ),
  (
    'bday-002',
    'Festive Candle Cake',
    'A rich chocolate sponge with buttercream frosting and colourful curly candles. A birthday classic.',
    'birthday',
    'https://images.pexels.com/photos/137485/pexels-photo-137485.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '[{"label":"Small","weight":"1 lb","price":2400},{"label":"Medium","weight":"2 lb","price":4000},{"label":"Large","weight":"3 lb","price":5600}]'::jsonb,
    '[{"id":"vanilla","label":"Vanilla Sponge"},{"id":"chocolate","label":"Chocolate Fudge"},{"id":"red-velvet","label":"Red Velvet"},{"id":"strawberry","label":"Strawberry Cream"},{"id":"butterscotch","label":"Butterscotch"},{"id":"pistachio","label":"Pistachio Delight"}]'::jsonb,
    true,
    true
  ),
  (
    'bday-003',
    'Choco Birthday Deluxe',
    'A double chocolate sponge with ganache drip, chocolate shavings and decorative toppings for the ultimate birthday treat.',
    'birthday',
    'https://images.pexels.com/photos/12616001/pexels-photo-12616001.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '[{"label":"Small","weight":"1 lb","price":2600},{"label":"Medium","weight":"2 lb","price":4400},{"label":"Large","weight":"3 lb","price":6200}]'::jsonb,
    '[{"id":"vanilla","label":"Vanilla Sponge"},{"id":"chocolate","label":"Chocolate Fudge"},{"id":"red-velvet","label":"Red Velvet"},{"id":"strawberry","label":"Strawberry Cream"},{"id":"butterscotch","label":"Butterscotch"},{"id":"pistachio","label":"Pistachio Delight"}]'::jsonb,
    false,
    true
  ),
  (
    'choc-001',
    'Double Chocolate Indulgence',
    'Layers of moist chocolate sponge with rich chocolate ganache and a glossy drip finish. A chocoholic’s dream.',
    'chocolate',
    'https://images.pexels.com/photos/10249461/pexels-photo-10249461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '[{"label":"Small","weight":"1 lb","price":2800},{"label":"Medium","weight":"2 lb","price":4800},{"label":"Large","weight":"3 lb","price":6800}]'::jsonb,
    '[{"id":"vanilla","label":"Vanilla Sponge"},{"id":"chocolate","label":"Chocolate Fudge"},{"id":"red-velvet","label":"Red Velvet"},{"id":"strawberry","label":"Strawberry Cream"},{"id":"butterscotch","label":"Butterscotch"},{"id":"pistachio","label":"Pistachio Delight"}]'::jsonb,
    true,
    true
  ),
  (
    'choc-002',
    'Strawberry Chocolate Heaven',
    'Chocolate sponge layered with strawberry cream and topped with fresh strawberries and chocolate rounds.',
    'chocolate',
    'https://images.pexels.com/photos/12927134/pexels-photo-12927134.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '[{"label":"Small","weight":"1 lb","price":3000},{"label":"Medium","weight":"2 lb","price":5000},{"label":"Large","weight":"3 lb","price":7200}]'::jsonb,
    '[{"id":"vanilla","label":"Vanilla Sponge"},{"id":"chocolate","label":"Chocolate Fudge"},{"id":"red-velvet","label":"Red Velvet"},{"id":"strawberry","label":"Strawberry Cream"},{"id":"butterscotch","label":"Butterscotch"},{"id":"pistachio","label":"Pistachio Delight"}]'::jsonb,
    false,
    true
  ),
  (
    'choc-003',
    'Dark Berry Chocolate Cake',
    'A rich dark chocolate cake topped with ripe blackberries and red berries. Decadent and beautiful.',
    'chocolate',
    'https://images.pexels.com/photos/4329844/pexels-photo-4329844.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '[{"label":"Small","weight":"1 lb","price":2700},{"label":"Medium","weight":"2 lb","price":4600},{"label":"Large","weight":"3 lb","price":6400}]'::jsonb,
    '[{"id":"vanilla","label":"Vanilla Sponge"},{"id":"chocolate","label":"Chocolate Fudge"},{"id":"red-velvet","label":"Red Velvet"},{"id":"strawberry","label":"Strawberry Cream"},{"id":"butterscotch","label":"Butterscotch"},{"id":"pistachio","label":"Pistachio Delight"}]'::jsonb,
    false,
    true
  ),
  (
    'choc-004',
    'Kit Kat Chocolate Delight',
    'A rich chocolate cake topped with Kit Kat pieces and chocolate drizzle. A crowd favourite for all ages.',
    'chocolate',
    'https://images.pexels.com/photos/13539254/pexels-photo-13539254.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '[{"label":"Small","weight":"1 lb","price":2500},{"label":"Medium","weight":"2 lb","price":4200},{"label":"Large","weight":"3 lb","price":5800}]'::jsonb,
    '[{"id":"vanilla","label":"Vanilla Sponge"},{"id":"chocolate","label":"Chocolate Fudge"},{"id":"red-velvet","label":"Red Velvet"},{"id":"strawberry","label":"Strawberry Cream"},{"id":"butterscotch","label":"Butterscotch"},{"id":"pistachio","label":"Pistachio Delight"}]'::jsonb,
    false,
    true
  ),
  (
    'wed-001',
    'Three-Tier Floral Wedding Cake',
    'A stunning three-tier wedding cake adorned with fresh floral arrangements. Designed for your special day.',
    'wedding',
    'https://images.pexels.com/photos/29098387/pexels-photo-29098387.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '[{"label":"2-Tier","weight":"5 lb","price":12000},{"label":"3-Tier","weight":"8 lb","price":18000},{"label":"4-Tier","weight":"12 lb","price":25000}]'::jsonb,
    '[{"id":"vanilla","label":"Vanilla Sponge"},{"id":"chocolate","label":"Chocolate Fudge"},{"id":"red-velvet","label":"Red Velvet"},{"id":"strawberry","label":"Strawberry Cream"},{"id":"butterscotch","label":"Butterscotch"},{"id":"pistachio","label":"Pistachio Delight"}]'::jsonb,
    true,
    true
  ),
  (
    'wed-002',
    'Classic Ivory Wedding Cake',
    'A timeless multi-tiered cake with elegant ivory frosting and delicate floral details. Pure sophistication.',
    'wedding',
    'https://images.pexels.com/photos/17315438/pexels-photo-17315438.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '[{"label":"2-Tier","weight":"5 lb","price":11000},{"label":"3-Tier","weight":"8 lb","price":17000},{"label":"4-Tier","weight":"12 lb","price":24000}]'::jsonb,
    '[{"id":"vanilla","label":"Vanilla Sponge"},{"id":"chocolate","label":"Chocolate Fudge"},{"id":"red-velvet","label":"Red Velvet"},{"id":"strawberry","label":"Strawberry Cream"},{"id":"butterscotch","label":"Butterscotch"},{"id":"pistachio","label":"Pistachio Delight"}]'::jsonb,
    false,
    true
  ),
  (
    'ann-001',
    'Romantic Pink Bloom Cake',
    'A beautiful pink cake with floral bouquet and curly candles. Perfect for anniversaries and romantic celebrations.',
    'anniversary',
    'https://images.pexels.com/photos/433527/pexels-photo-433527.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '[{"label":"Small","weight":"1 lb","price":2800},{"label":"Medium","weight":"2 lb","price":4800},{"label":"Large","weight":"3 lb","price":6600}]'::jsonb,
    '[{"id":"vanilla","label":"Vanilla Sponge"},{"id":"chocolate","label":"Chocolate Fudge"},{"id":"red-velvet","label":"Red Velvet"},{"id":"strawberry","label":"Strawberry Cream"},{"id":"butterscotch","label":"Butterscotch"},{"id":"pistachio","label":"Pistachio Delight"}]'::jsonb,
    true,
    true
  ),
  (
    'ann-002',
    'Red Rose Anniversary Cake',
    'A stunning three-tier cake adorned with elegant red roses. A showstopper for your anniversary celebration.',
    'anniversary',
    'https://images.pexels.com/photos/30445121/pexels-photo-30445121.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '[{"label":"2-Tier","weight":"5 lb","price":10000},{"label":"3-Tier","weight":"8 lb","price":16000}]'::jsonb,
    '[{"id":"vanilla","label":"Vanilla Sponge"},{"id":"chocolate","label":"Chocolate Fudge"},{"id":"red-velvet","label":"Red Velvet"},{"id":"strawberry","label":"Strawberry Cream"},{"id":"butterscotch","label":"Butterscotch"},{"id":"pistachio","label":"Pistachio Delight"}]'::jsonb,
    false,
    true
  ),
  (
    'cus-001',
    'Naked Strawberry Cake',
    'A rustic naked cake with fresh strawberries and chocolate drizzle. Beautiful for any custom celebration.',
    'custom',
    'https://images.pexels.com/photos/8199268/pexels-photo-8199268.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '[{"label":"Small","weight":"1 lb","price":2500},{"label":"Medium","weight":"2 lb","price":4200},{"label":"Large","weight":"3 lb","price":5800}]'::jsonb,
    '[{"id":"vanilla","label":"Vanilla Sponge"},{"id":"chocolate","label":"Chocolate Fudge"},{"id":"red-velvet","label":"Red Velvet"},{"id":"strawberry","label":"Strawberry Cream"},{"id":"butterscotch","label":"Butterscotch"},{"id":"pistachio","label":"Pistachio Delight"}]'::jsonb,
    false,
    true
  ),
  (
    'cus-002',
    'Teddy Bear Themed Cake',
    'A cute teddy bear themed cake with personalised fondant topper. Perfect for kids and themed parties.',
    'custom',
    'https://images.pexels.com/photos/15067881/pexels-photo-15067881.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '[{"label":"Small","weight":"1 lb","price":3000},{"label":"Medium","weight":"2 lb","price":5000},{"label":"Large","weight":"3 lb","price":7000}]'::jsonb,
    '[{"id":"vanilla","label":"Vanilla Sponge"},{"id":"chocolate","label":"Chocolate Fudge"},{"id":"red-velvet","label":"Red Velvet"},{"id":"strawberry","label":"Strawberry Cream"},{"id":"butterscotch","label":"Butterscotch"},{"id":"pistachio","label":"Pistachio Delight"}]'::jsonb,
    false,
    true
  ),
  (
    'cus-003',
    'Creative Themed Cake Set',
    'Three creatively decorated cakes with colourful themes on a wooden table. Fully customisable to your party theme.',
    'custom',
    'https://images.pexels.com/photos/10455239/pexels-photo-10455239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    '[{"label":"Medium","weight":"2 lb","price":4800},{"label":"Large","weight":"3 lb","price":6600}]'::jsonb,
    '[{"id":"vanilla","label":"Vanilla Sponge"},{"id":"chocolate","label":"Chocolate Fudge"},{"id":"red-velvet","label":"Red Velvet"},{"id":"strawberry","label":"Strawberry Cream"},{"id":"butterscotch","label":"Butterscotch"},{"id":"pistachio","label":"Pistachio Delight"}]'::jsonb,
    false,
    true
  )
on conflict (id) do nothing;
