import React from 'react';
import { GOOGLE_REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';
import { useTheme } from '../context/ThemeContext';
import { Star, MapPin, ExternalLink, Quote, Sparkles, ThumbsUp } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { mode } = useTheme();
  const isNight = mode === 'night';

  return (
    <section 
      id="reviews" 
      className={`py-20 transition-colors duration-500 relative ${
        isNight ? 'bg-[#0a0a0a] text-stone-100' : 'bg-[#FAF9F5] text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3 ${
            isNight ? 'bg-amber-950/60 border border-amber-800 text-amber-300' : 'bg-amber-100 text-amber-900'
          }`}>
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Verified Google Maps Reviews</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight ${
            isNight ? 'text-white' : 'text-stone-900'
          }`}>
            Loved By <span className="text-red-500">Brisbane Foodies</span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base ${
            isNight ? 'text-stone-400' : 'text-stone-600'
          }`}>
            Read what real patrons have to say about our authentic Sichuan noodle broths, crisp Roujiamo, and welcoming street food vibe.
          </p>

          {/* Rating Summary Box */}
          <div className={`mt-8 inline-flex items-center gap-6 p-4 sm:p-6 rounded-3xl border shadow-md ${
            isNight
              ? 'bg-stone-900 border-stone-800 text-white'
              : 'bg-white border-stone-200 text-stone-900'
          }`}>
            <div className="flex items-center gap-3">
              <span className={`text-4xl font-serif font-black ${isNight ? 'text-white' : 'text-stone-900'}`}>{RESTAURANT_INFO.rating}</span>
              <div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className={`text-xs font-medium ${isNight ? 'text-stone-400' : 'text-stone-500'}`}>Google Maps Score</span>
              </div>
            </div>

            <div className={`h-10 w-px ${isNight ? 'bg-stone-800' : 'bg-stone-200'}`} />

            <div className="text-left">
              <div className={`text-sm font-bold ${isNight ? 'text-white' : 'text-stone-900'}`}>{RESTAURANT_INFO.reviewCount}+ Verified Reviews</div>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-red-500 hover:underline font-bold flex items-center gap-1 mt-0.5"
              >
                <span>Read all on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {GOOGLE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className={`rounded-3xl p-6 sm:p-8 border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative ${
                isNight
                  ? 'bg-stone-900/90 border-stone-800 text-stone-100 hover:border-stone-700'
                  : 'bg-white border-stone-200 text-stone-900 hover:border-stone-300'
              }`}
            >
              <Quote className={`w-10 h-10 absolute top-6 right-6 pointer-events-none ${
                isNight ? 'text-stone-800' : 'text-red-100'
              }`} />

              <div>
                {/* Rating Stars */}
                <div className="flex text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className={`text-sm leading-relaxed font-normal mb-4 ${
                  isNight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  "{rev.comment}"
                </p>

                {/* Recommended Dish Pill */}
                {rev.dishRecommended && (
                  <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-lg border mb-6 ${
                    isNight
                      ? 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                      : 'bg-amber-50 text-amber-800 border-amber-200/80'
                  }`}>
                    <ThumbsUp className="w-3.5 h-3.5 text-amber-500" />
                    <span>Recommended: {rev.dishRecommended}</span>
                  </div>
                )}
              </div>

              {/* Author Footer */}
              <div className={`flex items-center justify-between border-t pt-4 mt-2 ${
                isNight ? 'border-stone-800' : 'border-stone-100'
              }`}>
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-stone-700"
                  />
                  <div>
                    <div className={`text-xs font-bold ${isNight ? 'text-white' : 'text-stone-900'}`}>{rev.author}</div>
                    <div className={`text-[11px] ${isNight ? 'text-stone-400' : 'text-stone-500'}`}>{rev.source} • {rev.date}</div>
                  </div>
                </div>

                <span className={`text-[10px] px-2 py-1 rounded-md font-bold border ${
                  isNight
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  Verified Visit
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
