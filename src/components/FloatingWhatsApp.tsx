import { MessageCircle } from 'lucide-react';
import { buildWaLink } from '@/utils/whatsapp';
import { businessConfig } from '@/config/siteConfig';

export default function FloatingWhatsApp() {
  const link = buildWaLink(`Hello ${businessConfig.name}! I'd like to enquire about your cakes.`);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#1da851] transition-all duration-300 animate-fade-in"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
    </a>
  );
}
