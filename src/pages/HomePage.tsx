import { ArrowRight, Cake as CakeIcon, Truck, MessageCircle, Sparkles } from 'lucide-react';
import { categories, businessConfig, deliveryConfig } from '@/config/siteConfig';
import CakeCard from '@/components/CakeCard';
import ReviewsSection from '@/components/ReviewsSection';
import { buildWaLink, buildEventCakeInquiryMessage } from '@/utils/whatsapp';
import type { Cake } from '@/config/siteConfig';
import { usePublicCakes } from '@/hooks/usePublicCakes';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onCakeClick: (cake: Cake) => void;
  onQuickAdd: (cake: Cake) => void;
}

export default function HomePage({ onNavigate, onCakeClick, onQuickAdd }: HomePageProps) {
  const { cakes: publicCakes } = usePublicCakes();
  const featuredCakes = publicCakes.filter((c) => c.featured).slice(0, 6);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/10249461/pexels-photo-10249461.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600"
            alt="Beautiful chocolate cake"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cocoa-900/70 via-cocoa-900/40 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-flex items-center gap-2 bg-cream-50/15 backdrop-blur-sm border border-cream-50/20 text-cream-50 text-sm px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              Freshly Baked in {businessConfig.city}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-cream-50 leading-tight text-balance mb-6">
              Every Celebration Deserves a Beautiful Cake.
            </h1>
            <p className="text-lg text-cream-100/90 leading-relaxed mb-8 max-w-xl">
              {businessConfig.tagline}. We craft freshly made cakes for birthdays, weddings, anniversaries and every special moment — with love and the finest ingredients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('catalogue')}
                className="inline-flex items-center justify-center gap-2 bg-cream-50 text-cocoa-700 px-7 py-3.5 rounded-full font-medium text-base hover:bg-cream-100 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Explore Our Cakes
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate('custom')}
                className="inline-flex items-center justify-center gap-2 border border-cream-50/40 text-cream-50 px-7 py-3.5 rounded-full font-medium text-base hover:bg-cream-50/10 transition-all duration-300"
              >
                Custom & Event Cakes
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cream-50 to-transparent h-20" />
      </section>

      {/* Features Bar */}
      <section className="bg-cream-50 py-8 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <CakeIcon className="w-8 h-8 text-cocoa-400" />
              <div>
                <p className="font-medium text-cocoa-700 text-sm">Freshly Baked Daily</p>
                <p className="text-xs text-cocoa-400">Made to order, never frozen</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <MessageCircle className="w-8 h-8 text-cocoa-400" />
              <div>
                <p className="font-medium text-cocoa-700 text-sm">Order on WhatsApp</p>
                <p className="text-xs text-cocoa-400">Quick and easy ordering</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <Truck className="w-8 h-8 text-cocoa-400" />
              <div>
                <p className="font-medium text-cocoa-700 text-sm">{deliveryConfig.note}</p>
                <p className="text-xs text-cocoa-400">Same & next day available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cakes */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-cocoa-400 tracking-widest uppercase">Our Specialties</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-cocoa-700 mt-2">
              Featured Cakes
            </h2>
            <p className="text-cocoa-500 mt-3 max-w-2xl mx-auto">
              A selection of our most loved cakes, freshly crafted for your celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCakes.map((cake) => (
              <CakeCard
                key={cake.id}
                cake={cake}
                onClick={() => onCakeClick(cake)}
                onQuickAdd={() => onQuickAdd(cake)}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('catalogue')}
              className="inline-flex items-center gap-2 text-cocoa-600 font-medium hover:text-cocoa-500 transition-colors"
            >
              View All Cakes
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-blush-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-cocoa-400 tracking-widest uppercase">Browse by Occasion</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-cocoa-700 mt-2">
              Popular Categories
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const catCake = publicCakes.find((c) => c.category === cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => onNavigate('catalogue')}
                  className="group relative rounded-2xl overflow-hidden h-44 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {catCake && (
                    <img
                      src={catCake.image}
                      alt={cat.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900/80 via-cocoa-900/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <h3 className="font-display text-lg font-semibold text-cream-50">{cat.label}</h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Zain Cake */}
      <section id="about" className="py-20 bg-cream-50 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] shadow-xl h-[420px] sm:h-[500px]">
                <img
                  src="https://images.pexels.com/photos/32459865/pexels-photo-32459865.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200"
                  alt="Zain Cake bakery cake display"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-4 bg-cream-50/95 text-cocoa-700 px-4 py-2 rounded-full shadow-md border border-cream-200 text-sm font-medium">
                Fresh • Custom • Karachi
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-cocoa-400 tracking-widest uppercase">About Zain Cake</span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-cocoa-700 mt-2 mb-6">
                Baked with love for every celebration in Karachi.
              </h2>

              <p className="text-cocoa-600 leading-relaxed mb-4">
                {businessConfig.name} is a passion-driven bakery bringing beautifully crafted cakes to homes, events and special occasions across {businessConfig.city}. We believe every celebration deserves a cake that looks stunning and tastes unforgettable.
              </p>
              <p className="text-cocoa-600 leading-relaxed mb-4">
                From intimate birthday cakes to elegant wedding desserts and custom event designs, we pour our heart into every bake. Our team is dedicated to creating cakes with quality ingredients, thoughtful finishing details and a personal touch that makes each order feel special.
              </p>
              <p className="text-cocoa-600 leading-relaxed mb-8">
                We take pride in serving our customers in Karachi with freshness, care and memorable flavour — because the sweetest moments deserve the finest cakes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="rounded-2xl border border-cream-200 bg-cream-100 p-4">
                  <p className="font-display text-xl font-semibold text-cocoa-700">Freshly Baked</p>
                  <p className="text-sm text-cocoa-500 mt-1">Made to order with quality ingredients.</p>
                </div>
                <div className="rounded-2xl border border-cream-200 bg-cream-100 p-4">
                  <p className="font-display text-xl font-semibold text-cocoa-700">Customer First</p>
                  <p className="text-sm text-cocoa-500 mt-1">Thoughtful service for every occasion.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="inline-flex items-center justify-center gap-2 bg-cocoa-600 text-cream-50 px-7 py-3.5 rounded-full font-medium hover:bg-cocoa-500 transition-all duration-300"
                >
                  Explore Cakes
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={buildWaLink(`Hello ${businessConfig.name}! I’d like to enquire about your cakes.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-cocoa-300 text-cocoa-700 px-7 py-3.5 rounded-full font-medium hover:bg-cream-200 transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Cakes Teaser */}
      <section className="py-20 bg-cocoa-800 text-cream-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-medium text-cream-300 tracking-widest uppercase">Beyond the Catalogue</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mt-2 mb-6">
            Custom Cakes for Every Special Event
          </h2>
          <p className="text-cream-200 leading-relaxed mb-8 max-w-3xl mx-auto">
            Planning a wedding, birthday party or special event? We create custom cakes designed to your exact requirements — including large cakes for 100, 200 or more guests. Contact us on WhatsApp to discuss your design, servings, flavours, availability and pricing.
          </p>
          <a
            href={buildWaLink(buildEventCakeInquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cream-50 text-cocoa-700 px-7 py-3.5 rounded-full font-medium hover:bg-cream-100 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Us on WhatsApp for Event Cakes
          </a>
        </div>
      </section>

      <ReviewsSection />

      {/* Contact Teaser */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-cocoa-700 mb-4">
            Let's Bake Something Beautiful Together
          </h2>
          <p className="text-cocoa-500 mb-8">
            Ready to order or have questions? We're just a message away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 bg-cocoa-600 text-cream-50 px-7 py-3.5 rounded-full font-medium hover:bg-cocoa-500 transition-all duration-300"
            >
              Contact Us
            </button>
            <button
              onClick={() => onNavigate('catalogue')}
              className="inline-flex items-center justify-center gap-2 border border-cocoa-300 text-cocoa-700 px-7 py-3.5 rounded-full font-medium hover:bg-cream-200 transition-all duration-300"
            >
              Browse Cakes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
