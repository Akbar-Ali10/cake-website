import { useEffect, useState } from 'react';
import type { Cake } from '@/config/siteConfig';
import { cakes as fallbackCakes } from '@/config/siteConfig';
import { supabase, hasSupabaseConfig } from '@/lib/supabase';

function mapCake(row: any): Cake {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    image: row.image,
    sizes: Array.isArray(row.sizes) ? row.sizes : [],
    flavours: Array.isArray(row.flavours) ? row.flavours : [],
    featured: Boolean(row.featured),
    is_available: Boolean(row.is_available),
  };
}

export function usePublicCakes() {
  const [cakes, setCakes] = useState<Cake[]>(fallbackCakes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasSupabaseConfig || !supabase) {
      setCakes(fallbackCakes);
      return;
    }

    let isMounted = true;

    const loadCakes = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from('cakes')
          .select('*')
          .eq('is_available', true)
          .order('created_at', { ascending: false });

        if (!isMounted) return;

        if (error) {
          console.error('Failed to load public cakes:', error.message);
          setCakes(fallbackCakes);
          return;
        }

        const nextCakes = data && data.length > 0 ? data.map(mapCake) : fallbackCakes;
        setCakes(nextCakes);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCakes();

    const channel = supabase.channel('public-cakes-live').on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'cakes',
      },
      () => {
        void loadCakes();
      }
    );

    void channel.subscribe();

    return () => {
      isMounted = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  return { cakes, loading };
}
