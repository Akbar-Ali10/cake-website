import { useState, useMemo } from 'react';
import { categories } from '@/config/siteConfig';
import CakeCard from '@/components/CakeCard';
import type { Cake } from '@/config/siteConfig';
import { usePublicCakes } from '@/hooks/usePublicCakes';

interface CataloguePageProps {
  onCakeClick: (cake: Cake) => void;
  onQuickAdd: (cake: Cake) => void;
}

export default function CataloguePage({ onCakeClick, onQuickAdd }: CataloguePageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { cakes: publicCakes } = usePublicCakes();

  const filteredCakes = useMemo(() => {
    if (activeCategory === 'all') return publicCakes;
    return publicCakes.filter((c) => c.category === activeCategory);
  }, [activeCategory, publicCakes]);

  return (
    <div className="animate-fade-in pt-28 pb-20 min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-sm font-medium text-cocoa-400 tracking-widest uppercase">Our Collection</span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-cocoa-700 mt-2 mb-4">
            Cake Catalogue
          </h1>
          <p className="text-cocoa-500 max-w-2xl mx-auto">
            Explore our full range of freshly baked cakes. Tap any cake to select size, flavour and place your order on WhatsApp.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-cocoa-600 text-cream-50 shadow-md'
                : 'bg-cream-200 text-cocoa-600 hover:bg-cream-300'
            }`}
          >
            All Cakes
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-cocoa-600 text-cream-50 shadow-md'
                  : 'bg-cream-200 text-cocoa-600 hover:bg-cream-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cake Grid */}
        {filteredCakes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCakes.map((cake) => (
              <CakeCard
                key={cake.id}
                cake={cake}
                onClick={() => onCakeClick(cake)}
                onQuickAdd={() => onQuickAdd(cake)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-cocoa-400 text-lg">No cakes found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
