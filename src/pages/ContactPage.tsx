import { MapPin, Phone, Clock, Mail, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { businessConfig, deliveryConfig } from '@/config/siteConfig';
import { buildWaLink, buildEventCakeInquiryMessage } from '@/utils/whatsapp';

export default function ContactPage() {
  const eventWaLink = buildWaLink(buildEventCakeInquiryMessage());
  const hasAddress = Boolean(businessConfig.address);
  const hasPhone = Boolean(businessConfig.phoneDisplay);
  const hasEmail = Boolean(businessConfig.email);
  const hasWhatsApp = Boolean(businessConfig.whatsapp && businessConfig.whatsapp !== 'YOUR_WHATSAPP_NUMBER');
  const displayHours = businessConfig.hours === 'Open 24/7' ? 'Available 24/7' : businessConfig.hours;

  return (
    <div className="animate-fade-in pt-28 pb-20 min-h-screen bg-cream-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-cocoa-400 tracking-widest uppercase">Get in Touch</span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-cocoa-700 mt-2 mb-4">
            Contact Us
          </h1>
          <p className="text-cocoa-500 max-w-2xl mx-auto">
            Have a question or ready to order? WhatsApp is the fastest way to get in touch for cake enquiries and custom orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <div className="space-y-4">
            {hasWhatsApp ? (
              <a
                href={buildWaLink('Hello! I have a question about your cakes.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366] text-white rounded-2xl p-5 hover:bg-[#1da851] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-lg">Order on WhatsApp</p>
                  <p className="text-sm text-white/80">Fastest way to place an order</p>
                </div>
              </a>
            ) : (
              <div className="rounded-2xl border border-dashed border-cocoa-300 bg-cream-100 p-5 text-cocoa-700">
                <p className="font-medium text-lg">WhatsApp number pending</p>
                <p className="text-sm mt-2">
                  Add your real WhatsApp number in <strong>src/config/siteConfig.ts</strong> under <strong>businessConfig.whatsapp</strong>.
                </p>
              </div>
            )}

            {hasAddress && (
              <div className="bg-cream-100 rounded-2xl p-5 border border-cream-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blush-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-cocoa-400" />
                </div>
                <div>
                  <p className="font-medium text-cocoa-700">Our Address</p>
                  <p className="text-sm text-cocoa-500 mt-1">{businessConfig.address}</p>
                </div>
              </div>
            )}

            {(hasPhone || hasEmail) && (
              <div className="bg-cream-100 rounded-2xl p-5 border border-cream-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blush-100 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-cocoa-400" />
                </div>
                <div>
                  <p className="font-medium text-cocoa-700">Phone</p>
                  {hasPhone && <p className="text-sm text-cocoa-500 mt-1">{businessConfig.phoneDisplay}</p>}
                  {hasEmail && <p className="text-sm text-cocoa-500">{businessConfig.email}</p>}
                </div>
              </div>
            )}

            <div className="bg-cream-100 rounded-2xl p-5 border border-cream-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blush-100 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-cocoa-400" />
              </div>
              <div>
                <p className="font-medium text-cocoa-700">Business Hours</p>
                <p className="text-sm text-cocoa-500 mt-1">{displayHours}</p>
              </div>
            </div>

            <div className="flex gap-3">
              {businessConfig.instagram && (
                <a
                  href={businessConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-cream-100 rounded-xl p-4 text-cocoa-600 hover:bg-cream-200 transition-colors border border-cream-200"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="text-sm font-medium">Instagram</span>
                </a>
              )}
              {businessConfig.facebook && (
                <a
                  href={businessConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-cream-100 rounded-xl p-4 text-cocoa-600 hover:bg-cream-200 transition-colors border border-cream-200"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="text-sm font-medium">Facebook</span>
                </a>
              )}
            </div>
          </div>

          {/* Map + Delivery */}
          <div className="space-y-6">
            {hasAddress && (
              <div className="rounded-2xl overflow-hidden shadow-sm h-64 border border-cream-200">
                <iframe
                  title="Business location map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(businessConfig.mapsEmbedQuery)}&output=embed`}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            )}

            <div className="bg-cocoa-800 text-cream-50 rounded-2xl p-6">
              <h3 className="font-display text-xl font-semibold mb-3">{deliveryConfig.note}</h3>
              <p className="text-sm text-cream-200 mb-4">
                We deliver to the following areas in {deliveryConfig.city}:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {deliveryConfig.areas.map((a) => (
                  <div key={a.area} className="flex items-center gap-2 text-sm text-cream-200">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{a.area}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={eventWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-blush-100 rounded-2xl p-5 text-center border border-blush-200 hover:bg-blush-200 transition-colors"
            >
              <p className="font-display text-lg font-semibold text-cocoa-700 mb-1">Contact Us on WhatsApp</p>
              <p className="text-sm text-cocoa-500">Send your event cake enquiry on WhatsApp</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

