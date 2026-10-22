import { Cake, Instagram, Facebook, MapPin, Phone, Clock, Mail } from 'lucide-react';
import { businessConfig } from '@/config/siteConfig';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-cocoa-800 text-cream-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cake className="w-6 h-6 text-cream-200" />
              <span className="font-display text-2xl font-semibold">{businessConfig.name}</span>
            </div>
            <p className="text-cream-300 text-sm leading-relaxed">
              {businessConfig.tagline}. Based in {businessConfig.city}, Pakistan.
            </p>
            <div className="flex gap-3 mt-5">
              {businessConfig.instagram && (
                <a
                  href={businessConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-cocoa-700 hover:bg-cocoa-600 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {businessConfig.facebook && (
                <a
                  href={businessConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-cocoa-700 hover:bg-cocoa-600 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4 text-cream-100">Quick Links</h4>
            <ul className="space-y-2 text-sm text-cream-300">
              {[
                { id: 'home', label: 'Home' },
                { id: 'catalogue', label: 'Our Cakes' },
                { id: 'custom', label: 'Custom & Event Cakes' },
                { id: 'about', label: 'About Us' },
                { id: 'contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-cream-50 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4 text-cream-100">Contact</h4>
            <ul className="space-y-3 text-sm text-cream-300">
              {businessConfig.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-cream-400" />
                  <span>{businessConfig.address}</span>
                </li>
              )}
              {businessConfig.phoneDisplay && (
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 shrink-0 text-cream-400" />
                  <span>{businessConfig.phoneDisplay}</span>
                </li>
              )}
              {businessConfig.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 shrink-0 text-cream-400" />
                  <span>{businessConfig.email}</span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4 text-cream-100">Business Hours</h4>
            <div className="flex items-start gap-3 text-sm text-cream-300">
              <Clock className="w-4 h-4 mt-0.5 shrink-0 text-cream-400" />
              <span>{businessConfig.hours === 'Open 24/7' ? 'Available 24/7' : businessConfig.hours}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-cocoa-700 pt-6 text-center text-sm text-cream-400">
          <p>&copy; {new Date().getFullYear()} {businessConfig.name}. All rights reserved.</p>
          <p className="mt-1 text-xs">Delivery available in {businessConfig.city} only.</p>
        </div>
      </div>
    </footer>
  );
}
