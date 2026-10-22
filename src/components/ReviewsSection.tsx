import { Star, Quote } from 'lucide-react';
import { businessConfig } from '@/config/siteConfig';
import { reviews } from '@/config/reviews';

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-cream-100 via-cream-50 to-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center justify-center rounded-full border border-cocoa-200 bg-cream-50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cocoa-500">
            Customer Feedback
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-cocoa-700 mt-4 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-cocoa-600 max-w-2xl mx-auto">
            Loved our cakes? Share your experience with {businessConfig.name} and help others discover their perfect celebration cake.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="group rounded-[28px] border border-cream-200 bg-cream-50 p-6 shadow-[0_12px_30px_rgba(81,54,36,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(81,54,36,0.12)]"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-cocoa-400 text-cocoa-400' : 'text-cream-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="rounded-full border border-cocoa-200 bg-cream-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-cocoa-500">
                  {review.name}
                </span>
              </div>

              <div className="mb-5 flex items-start gap-3 text-cocoa-300">
                <Quote className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-sm leading-relaxed text-cocoa-700">“{review.text}”</p>
              </div>

              <div className="border-t border-cream-200 pt-4">
                <p className="text-sm font-semibold text-cocoa-700">{review.occasion}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
