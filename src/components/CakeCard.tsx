import { Cake } from '@/config/siteConfig';
import { formatPKR } from '@/utils/whatsapp';
import { Plus } from 'lucide-react';

interface CakeCardProps {
  cake: Cake;
  onClick: () => void;
  onQuickAdd: () => void;
}

export default function CakeCard({ cake, onClick, onQuickAdd }: CakeCardProps) {
  const minPrice = Math.min(...cake.sizes.map((s) => s.price));

  return (
    <article
      className="group bg-cream-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-cream-200"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={cake.image}
          alt={cake.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 bg-cream-50/90 backdrop-blur-sm text-cocoa-600 text-xs font-medium px-3 py-1 rounded-full">
          Starting at {formatPKR(minPrice)}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-cocoa-700 mb-2">{cake.name}</h3>
        <p className="text-sm text-cocoa-600/80 leading-relaxed line-clamp-2 mb-4">
          {cake.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {cake.sizes.slice(0, 3).map((s) => (
              <span
                key={s.label}
                className="text-xs bg-cream-200 text-cocoa-600 px-2 py-0.5 rounded-full"
              >
                {s.label}
              </span>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd();
            }}
            className="flex items-center gap-1 text-sm font-medium text-cocoa-500 hover:text-cocoa-700 transition-colors"
            aria-label={`Quick add ${cake.name} to cart`}
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
