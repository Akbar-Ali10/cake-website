// ============================================================
//  BUSINESS CONFIGURATION — EDIT EVERYTHING HERE
//  This is the single file you need to change to customise
//  your bakery name, WhatsApp number, products, prices,
//  delivery charges, payment accounts, and more.
// ============================================================

export interface CakeSize {
  label: string;
  weight: string;
  price: number; // in PKR
}

export interface CakeFlavour {
  id: string;
  label: string;
}

export interface CakeProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  sizes: CakeSize[];
  flavours: CakeFlavour[];
  featured?: boolean;
  is_available?: boolean;
}

export type Cake = CakeProduct;

export interface CategoryInfo {
  id: string;
  label: string;
  description: string;
}

export interface EventCakeType {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface PaymentMethod {
  id: string;
  label: string;
  accountName: string;
  accountDetails: string;
}

export interface DeliveryArea {
  area: string;
  charge: number;
}

export interface Review {
  id: string;
  name: string;
  occasion: string;
  rating: number;
  text: string;
}

// --------------------------------------------------
// 1. Bakery Identity
// --------------------------------------------------
export const businessConfig = {
  name: 'Cake House',
  tagline: 'Freshly Baked Cakes for Every Celebration',
  // WhatsApp number in international format WITHOUT + or spaces or dashes.
  // Replace the placeholder below with your real number, e.g. 923001234567.
  // Do not use a fake number.
  whatsapp: '923491300843',
  phoneDisplay: '0349 1300843',
  email: 'z1149347@gmail.com',
  address: 'Secter 48/b Koranghi Karachi Pakistan',
  city: 'Karachi',
  hours: 'Open 24/7',
  // Social links (leave empty string to hide)
  instagram: 'https://www.instagram.com/zainali4280?obrf=N3E3MTdkN3I3ZXls',
  facebook: 'https://facebook.com/zaincake.pk',
  tiktok: 'https://www.tiktok.com/@zainali67232?_r=1&_t=ZS-9An2zSgAD3A',
  youtube: 'https://youtube.com/@zainali6723-en3vh?si=NWXzQwazSxnxtWxH',
  // Google Maps embed src (optional)
  mapsEmbedQuery: 'DHA Phase 6, Karachi, Pakistan',
};

// --------------------------------------------------
// 2. Cake Categories
// --------------------------------------------------
export const categories: CategoryInfo[] = [
  {
    id: 'birthday',
    label: 'Birthday Cakes',
    description: 'Festive cakes with candles, themes and joyful designs.',
  },
  {
    id: 'chocolate',
    label: 'Chocolate Cakes',
    description: 'Rich, decadent chocolate cakes for true chocolate lovers.',
  },
  {
    id: 'wedding',
    label: 'Wedding Cakes',
    description: 'Elegant multi-tier wedding cakes for your big day.',
  },
  {
    id: 'anniversary',
    label: 'Anniversary Cakes',
    description: 'Romantic cakes to celebrate your years together.',
  },
  {
    id: 'custom',
    label: 'Custom Cakes',
    description: 'Bespoke cakes designed exactly the way you imagine.',
  },
];

// --------------------------------------------------
// 3. Cake Flavours (shared)
// --------------------------------------------------
export const allFlavours: CakeFlavour[] = [
  { id: 'vanilla', label: 'Vanilla Sponge' },
  { id: 'chocolate', label: 'Chocolate Fudge' },
  { id: 'red-velvet', label: 'Red Velvet' },
  { id: 'strawberry', label: 'Strawberry Cream' },
  { id: 'butterscotch', label: 'Butterscotch' },
  { id: 'pistachio', label: 'Pistachio Delight' },
];

// --------------------------------------------------
// 4. Cake Products — replace with your own
//    Prices are in PKR and are demo/sample prices.
// --------------------------------------------------
export const cakes: CakeProduct[] = [
  // --- Birthday ---
  {
    id: 'bday-001',
    name: 'Golden Celebration Cake',
    description:
      'A light vanilla sponge layered with fresh cream and topped with a golden number candle. Perfect for milestone birthdays.',
    category: 'birthday',
    image:
      'https://images.pexels.com/photos/10885107/pexels-photo-10885107.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    sizes: [
      { label: 'Small', weight: '1 lb', price: 2200 },
      { label: 'Medium', weight: '2 lb', price: 3800 },
      { label: 'Large', weight: '3 lb', price: 5200 },
    ],
    flavours: allFlavours,
    featured: true,
  },
  {
    id: 'bday-002',
    name: 'Festive Candle Cake',
    description:
      'A rich chocolate sponge with buttercream frosting and colourful curly candles. A birthday classic.',
    category: 'birthday',
    image:
      'https://images.pexels.com/photos/137485/pexels-photo-137485.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    sizes: [
      { label: 'Small', weight: '1 lb', price: 2400 },
      { label: 'Medium', weight: '2 lb', price: 4000 },
      { label: 'Large', weight: '3 lb', price: 5600 },
    ],
    flavours: allFlavours,
    featured: true,
  },
  {
    id: 'bday-003',
    name: "Choco Birthday Deluxe",
    description:
      'A double chocolate sponge with ganache drip, chocolate shavings and decorative toppings for the ultimate birthday treat.',
    category: 'birthday',
    image:
      'https://images.pexels.com/photos/12616001/pexels-photo-12616001.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    sizes: [
      { label: 'Small', weight: '1 lb', price: 2600 },
      { label: 'Medium', weight: '2 lb', price: 4400 },
      { label: 'Large', weight: '3 lb', price: 6200 },
    ],
    flavours: allFlavours,
  },
  // --- Chocolate ---
  {
    id: 'choc-001',
    name: 'Double Chocolate Indulgence',
    description:
      'Layers of moist chocolate sponge with rich chocolate ganache and a glossy drip finish. A chocoholic’s dream.',
    category: 'chocolate',
    image:
      'https://images.pexels.com/photos/10249461/pexels-photo-10249461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    sizes: [
      { label: 'Small', weight: '1 lb', price: 2800 },
      { label: 'Medium', weight: '2 lb', price: 4800 },
      { label: 'Large', weight: '3 lb', price: 6800 },
    ],
    flavours: allFlavours,
    featured: true,
  },
  {
    id: 'choc-002',
    name: 'Strawberry Chocolate Heaven',
    description:
      'Chocolate sponge layered with strawberry cream and topped with fresh strawberries and chocolate rounds.',
    category: 'chocolate',
    image:
      'https://images.pexels.com/photos/12927134/pexels-photo-12927134.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    sizes: [
      { label: 'Small', weight: '1 lb', price: 3000 },
      { label: 'Medium', weight: '2 lb', price: 5000 },
      { label: 'Large', weight: '3 lb', price: 7200 },
    ],
    flavours: allFlavours,
  },
  {
    id: 'choc-003',
    name: 'Dark Berry Chocolate Cake',
    description:
      'A rich dark chocolate cake topped with ripe blackberries and red berries. Decadent and beautiful.',
    category: 'chocolate',
    image:
      'https://images.pexels.com/photos/4329844/pexels-photo-4329844.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    sizes: [
      { label: 'Small', weight: '1 lb', price: 2700 },
      { label: 'Medium', weight: '2 lb', price: 4600 },
      { label: 'Large', weight: '3 lb', price: 6400 },
    ],
    flavours: allFlavours,
  },
  {
    id: 'choc-004',
    name: 'Kit Kat Chocolate Delight',
    description:
      'A rich chocolate cake topped with Kit Kat pieces and chocolate drizzle. A crowd favourite for all ages.',
    category: 'chocolate',
    image:
      'https://images.pexels.com/photos/13539254/pexels-photo-13539254.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    sizes: [
      { label: 'Small', weight: '1 lb', price: 2500 },
      { label: 'Medium', weight: '2 lb', price: 4200 },
      { label: 'Large', weight: '3 lb', price: 5800 },
    ],
    flavours: allFlavours,
  },
  // --- Wedding ---
  {
    id: 'wed-001',
    name: 'Three-Tier Floral Wedding Cake',
    description:
      'A stunning three-tier wedding cake adorned with fresh floral arrangements. Designed for your special day.',
    category: 'wedding',
    image:
      'https://images.pexels.com/photos/29098387/pexels-photo-29098387.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    sizes: [
      { label: '2-Tier', weight: '5 lb', price: 12000 },
      { label: '3-Tier', weight: '8 lb', price: 18000 },
      { label: '4-Tier', weight: '12 lb', price: 25000 },
    ],
    flavours: allFlavours,
    featured: true,
  },
  {
    id: 'wed-002',
    name: 'Classic Ivory Wedding Cake',
    description:
      'A timeless multi-tiered cake with elegant ivory frosting and delicate floral details. Pure sophistication.',
    category: 'wedding',
    image:
      'https://images.pexels.com/photos/17315438/pexels-photo-17315438.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    sizes: [
      { label: '2-Tier', weight: '5 lb', price: 11000 },
      { label: '3-Tier', weight: '8 lb', price: 17000 },
      { label: '4-Tier', weight: '12 lb', price: 24000 },
    ],
    flavours: allFlavours,
  },
  // --- Anniversary ---
  {
    id: 'ann-001',
    name: 'Romantic Pink Bloom Cake',
    description:
      'A beautiful pink cake with floral bouquet and curly candles. Perfect for anniversaries and romantic celebrations.',
    category: 'anniversary',
    image:
      'https://images.pexels.com/photos/433527/pexels-photo-433527.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    sizes: [
      { label: 'Small', weight: '1 lb', price: 2800 },
      { label: 'Medium', weight: '2 lb', price: 4800 },
      { label: 'Large', weight: '3 lb', price: 6600 },
    ],
    flavours: allFlavours,
    featured: true,
  },
  {
    id: 'ann-002',
    name: 'Red Rose Anniversary Cake',
    description:
      'A stunning three-tier cake adorned with elegant red roses. A showstopper for your anniversary celebration.',
    category: 'anniversary',
    image:
      'https://images.pexels.com/photos/30445121/pexels-photo-30445121.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    sizes: [
      { label: '2-Tier', weight: '5 lb', price: 10000 },
      { label: '3-Tier', weight: '8 lb', price: 16000 },
    ],
    flavours: allFlavours,
  },
  // --- Custom ---
  {
    id: 'cus-001',
    name: 'Naked Strawberry Cake',
    description:
      'A rustic naked cake with fresh strawberries and chocolate drizzle. Beautiful for any custom celebration.',
    category: 'custom',
    image:
      'https://images.pexels.com/photos/8199268/pexels-photo-8199268.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    sizes: [
      { label: 'Small', weight: '1 lb', price: 2500 },
      { label: 'Medium', weight: '2 lb', price: 4200 },
      { label: 'Large', weight: '3 lb', price: 5800 },
    ],
    flavours: allFlavours,
  },
  {
    id: 'cus-002',
    name: 'Teddy Bear Themed Cake',
    description:
      'A cute teddy bear themed cake with personalised fondant topper. Perfect for kids and themed parties.',
    category: 'custom',
    image:
      'https://images.pexels.com/photos/15067881/pexels-photo-15067881.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    sizes: [
      { label: 'Small', weight: '1 lb', price: 3000 },
      { label: 'Medium', weight: '2 lb', price: 5000 },
      { label: 'Large', weight: '3 lb', price: 7000 },
    ],
    flavours: allFlavours,
  },
  {
    id: 'cus-003',
    name: 'Creative Themed Cake Set',
    description:
      'Three creatively decorated cakes with colourful themes on a wooden table. Fully customisable to your party theme.',
    category: 'custom',
    image:
      'https://images.pexels.com/photos/10455239/pexels-photo-10455239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    sizes: [
      { label: 'Medium', weight: '2 lb', price: 4800 },
      { label: 'Large', weight: '3 lb', price: 6600 },
    ],
    flavours: allFlavours,
  },
];

// --------------------------------------------------
// 5. Event / Custom Cake Types (no prices shown)
// --------------------------------------------------
export const eventCakeTypes: EventCakeType[] = [
  {
    id: 'ev-wedding',
    title: 'Wedding Cakes',
    description:
      'Multi-tier wedding cakes designed to match your theme, colours and venue.',
    image:
      'https://images.pexels.com/photos/16120218/pexels-photo-16120218.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'ev-engagement',
    title: 'Engagement Cakes',
    description:
      'Elegant engagement cakes to celebrate the beginning of your journey together.',
    image:
      'https://images.pexels.com/photos/20016152/pexels-photo-20016152.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'ev-birthday',
    title: 'Birthday Party Cakes',
    description:
      'Large birthday cakes for parties of 50, 100 or more guests with custom themes.',
    image:
      'https://images.pexels.com/photos/17931469/pexels-photo-17931469.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'ev-anniversary',
    title: 'Anniversary Cakes',
    description:
      'Celebration cakes for silver, golden and every anniversary milestone.',
    image:
      'https://images.pexels.com/photos/38986757/pexels-photo-38986757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'ev-celebration',
    title: 'Other Celebrations',
    description:
      'Cakes for baby showers, corporate events, graduations and every special occasion.',
    image:
      'https://images.pexels.com/photos/5610333/pexels-photo-5610333.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

// --------------------------------------------------
// 6. Payment Methods — replace with your real details
//    DO NOT put real account numbers here until you are
//    ready to publish. These are placeholders.
// --------------------------------------------------
export const paymentMethods: PaymentMethod[] = [
  {
    id: 'easypaisa',
    label: 'Easypaisa',
    accountName: 'Cake House',
    accountDetails: '03XX-XXXXXXX (Enter your Easypaisa number)',
  },
  {
    id: 'jazzcash',
    label: 'JazzCash',
    accountName: 'Cake House',
    accountDetails: '03XX-XXXXXXX (Enter your JazzCash number)',
  },
  {
    id: 'bank',
    label: 'Bank Transfer',
    accountName: 'Cake House',
    accountDetails: 'Bank: (Your Bank Name) | A/C: (Your Account Number) | IBAN: (Your IBAN)',
  },
];

export const ADVANCE_PERCENTAGE = 30; // 30% advance payment

// --------------------------------------------------
// 7. Delivery Configuration
// --------------------------------------------------
export const deliveryConfig = {
  city: 'Karachi',
  note: 'Delivery Available in Karachi Only',
  defaultCharge: 300, // PKR for areas not listed separately
  areas: [
    { area: 'DHA (All Phases)', charge: 250 },
    { area: 'Clifton', charge: 250 },
    { area: 'Bahadurabad', charge: 300 },
    { area: 'Gulshan-e-Iqbal', charge: 350 },
    { area: 'North Nazimabad', charge: 400 },
    { area: 'Tariq Road', charge: 300 },
    { area: 'PECHS', charge: 300 },
    { area: 'Malir', charge: 500 },
    { area: 'Korangi', charge: 500 },
  ] as DeliveryArea[],
  timeSlots: [
    '10:00 AM – 12:00 PM',
    '12:00 PM – 2:00 PM',
    '2:00 PM – 4:00 PM',
    '4:00 PM – 6:00 PM',
    '6:00 PM – 8:00 PM',
  ],
};

// --------------------------------------------------
// 8. Reviews are stored in src/config/reviews.ts
//    Replace the sample entries with real customer reviews later.
// --------------------------------------------------
