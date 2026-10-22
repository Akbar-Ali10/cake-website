import { Cake as CakeIcon, Heart, Truck, MessageCircle, Sparkles } from 'lucide-react';
import { businessConfig, deliveryConfig } from '@/config/siteConfig';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="animate-fade-in pt-28 pb-20 min-h-screen bg-cream-50">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <CakeIcon className="w-8 h-8 text-cocoa-400" />
          <span className="font-display text-2xl font-semibold text-cocoa-700">{businessConfig.name}</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-cocoa-700 mb-4">
          Baked with Love in {businessConfig.city}
        </h1>
        <p className="text-cocoa-600 leading-relaxed text-lg">
          {businessConfig.tagline}. We believe every celebration — big or small — deserves a cake that's made fresh, decorated beautifully and tastes absolutely delicious.
        </p>
      </div>

      {/* Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-3xl overflow-hidden shadow-lg h-80 sm:h-96">
          <img
            src="https://images.pexels.com/photos/32459865/pexels-photo-32459865.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Bakery display"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="font-display text-3xl font-semibold text-cocoa-700 mb-6">Our Story</h2>
        <div className="space-y-4 text-cocoa-600 leading-relaxed">
          <p>
            {businessConfig.name} started as a small home kitchen with a big dream — to bring beautiful, delicious cakes to every celebration in {businessConfig.city}. What began as baking for family and friends quickly grew into a passion for creating cakes that make people smile.
          </p>
          <p>
            Every cake we make is baked fresh to order. We never use frozen sponges or pre-made mixes. From the moment you place your order to the time it reaches your door, each cake is crafted with care, attention to detail and the finest ingredients we can find.
          </p>
          <p>
            Whether you need a simple birthday cake, an elaborate multi-tier wedding cake, or a custom creation for a special event, we're here to bring your vision to life.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-cream-100 rounded-2xl border border-cream-200">
            <div className="w-14 h-14 rounded-full bg-blush-100 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7 text-cocoa-400" />
            </div>
            <h3 className="font-display text-xl font-semibold text-cocoa-700 mb-2">Made with Care</h3>
            <p className="text-sm text-cocoa-500 leading-relaxed">
              Every cake is hand-decorated with attention to the smallest details.
            </p>
          </div>
          <div className="text-center p-6 bg-cream-100 rounded-2xl border border-cream-200">
            <div className="w-14 h-14 rounded-full bg-blush-100 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-cocoa-400" />
            </div>
            <h3 className="font-display text-xl font-semibold text-cocoa-700 mb-2">Fresh Ingredients</h3>
            <p className="text-sm text-cocoa-500 leading-relaxed">
              Quality ingredients, baked fresh — never frozen, never compromised.
            </p>
          </div>
          <div className="text-center p-6 bg-cream-100 rounded-2xl border border-cream-200">
            <div className="w-14 h-14 rounded-full bg-blush-100 flex items-center justify-center mx-auto mb-4">
              <Truck className="w-7 h-7 text-cocoa-400" />
            </div>
            <h3 className="font-display text-xl font-semibold text-cocoa-700 mb-2">{deliveryConfig.note}</h3>
            <p className="text-sm text-cocoa-500 leading-relaxed">
              Fresh delivery to your doorstep across {deliveryConfig.city}.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-cocoa-800 rounded-3xl p-10 text-cream-50">
          <h2 className="font-display text-3xl font-semibold mb-4">Ready to Order?</h2>
          <p className="text-cream-200 mb-8">
            Browse our cakes or message us on WhatsApp — we'd love to help make your celebration special.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('catalogue')}
              className="inline-flex items-center justify-center gap-2 bg-cream-50 text-cocoa-700 px-7 py-3.5 rounded-full font-medium hover:bg-cream-100 transition-all duration-300"
            >
              Browse Cakes
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 border border-cream-50/40 text-cream-50 px-7 py-3.5 rounded-full font-medium hover:bg-cream-50/10 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
