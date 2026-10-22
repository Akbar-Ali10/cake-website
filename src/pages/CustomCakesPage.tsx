import { MessageCircle, Calendar, Users, Heart, PartyPopper, GraduationCap } from 'lucide-react';
import { eventCakeTypes, businessConfig } from '@/config/siteConfig';
import { buildWaLink, buildEventCakeInquiryMessage } from '@/utils/whatsapp';

const eventIcons: Record<string, typeof Calendar> = {
  'ev-wedding': Heart,
  'ev-engagement': Heart,
  'ev-birthday': PartyPopper,
  'ev-anniversary': Calendar,
  'ev-celebration': GraduationCap,
};

export default function CustomCakesPage() {
  const eventWaLink = buildWaLink(buildEventCakeInquiryMessage());

  return (
    <div className="animate-fade-in pt-28 pb-20 min-h-screen bg-cream-50">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="text-sm font-medium text-cocoa-400 tracking-widest uppercase">Bespoke Creations</span>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-cocoa-700 mt-2 mb-6">
          Custom Cakes for Every Special Event
        </h1>
        <p className="text-cocoa-600 leading-relaxed text-lg max-w-3xl mx-auto">
          Planning a wedding, birthday party or special event? We also create custom cakes for your celebrations, including large cakes for 100, 200 or more guests. Every event cake is designed according to your requirements. Contact us on WhatsApp to discuss your design, servings, flavours, availability and pricing.
        </p>
        <a
          href={eventWaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-medium text-base hover:bg-[#1da851] hover:scale-105 transition-all duration-300 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
          Contact Us on WhatsApp for Event Cakes
        </a>
      </div>

      {/* Event Types Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventCakeTypes.map((event) => {
            const Icon = eventIcons[event.id] || Users;
            return (
              <div
                key={event.id}
                className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-80"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900/85 via-cocoa-900/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-cream-50">
                  <Icon className="w-7 h-7 mb-3 text-cream-200" />
                  <h3 className="font-display text-2xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-sm text-cream-200/90 leading-relaxed">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-blush-50 rounded-3xl p-8 sm:p-12">
          <h2 className="font-display text-3xl font-semibold text-cocoa-700 text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-cocoa-600 text-cream-50 flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                1
              </div>
              <h3 className="font-display text-xl font-medium text-cocoa-700 mb-2">Message Us</h3>
              <p className="text-sm text-cocoa-500 leading-relaxed">
                Contact us on WhatsApp with your event details, theme and number of guests.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-cocoa-600 text-cream-50 flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                2
              </div>
              <h3 className="font-display text-xl font-medium text-cocoa-700 mb-2">Discuss & Agree</h3>
              <p className="text-sm text-cocoa-500 leading-relaxed">
                We'll discuss your design, flavours, servings and agree on the final pricing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-cocoa-600 text-cream-50 flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                3
              </div>
              <h3 className="font-display text-xl font-medium text-cocoa-700 mb-2">Advance & Bake</h3>
              <p className="text-sm text-cocoa-500 leading-relaxed">
                Pay 30% advance after agreeing on price, and we'll bake your dream cake.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-cocoa-800 rounded-3xl p-10 text-cream-50">
          <h2 className="font-display text-3xl font-semibold mb-4">Ready to Create Something Amazing?</h2>
          <p className="text-cream-200 mb-8">
            Every event cake is unique. Let's discuss your vision and bring it to life.
          </p>
          <a
            href={eventWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cream-50 text-cocoa-700 px-8 py-4 rounded-full font-medium text-base hover:bg-cream-100 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Contact Us on WhatsApp for Event Cakes
          </a>
          <p className="text-xs text-cream-300 mt-6">
            {businessConfig.name} · {businessConfig.city}
          </p>
        </div>
      </div>
    </div>
  );
}
