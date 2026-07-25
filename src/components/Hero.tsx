import React, { useState } from 'react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';
import { MenuItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { Star, Play, ShoppingBag, Flame, ChefHat, Sparkles, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onAddToCart: (item: MenuItem) => void;
  onOpenReservation: () => void;
  onOpenReelModal: (reelId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onAddToCart,
  onOpenReservation,
  onOpenReelModal,
}) => {
  const { mode } = useTheme();
  const isNight = mode === 'night';

  // Select top featured dishes for hero stage
  const featuredDishes = MENU_ITEMS.filter((item) => item.popular || item.chefRecommended).slice(0, 4);
  const [activeIdx, setActiveIdx] = useState(0);

  const activeDish = featuredDishes[activeIdx] || featuredDishes[0];

  const nextDish = () => {
    setActiveIdx((prev) => (prev + 1) % featuredDishes.length);
  };

  const prevDish = () => {
    setActiveIdx((prev) => (prev - 1 + featuredDishes.length) % featuredDishes.length);
  };

  return (
    <section 
      id="hero" 
      className={`relative pt-24 pb-16 lg:pt-32 lg:pb-24 transition-colors duration-500 overflow-hidden ${
        isNight ? 'bg-[#0a0a0a] text-stone-100' : 'bg-[#FAF9F5] text-stone-900'
      }`}
    >
      {/* Background Decorative Asian Lattice Patterns */}
      <div className={`absolute inset-0 opacity-[0.03] pointer-events-none ${
        isNight ? 'bg-[radial-gradient(#ffffff_1px,transparent_1px)]' : 'bg-[radial-gradient(#1c1917_1px,transparent_1px)]'
      } [background-size:16px_16px]`} />

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story & Call to Actions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold tracking-wide shadow-sm ${
                isNight
                  ? 'bg-red-950/60 border-red-800/80 text-red-300'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Authentic Sichuan Noodle & Street Food in Brisbane CBD</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-[1.12] ${
                isNight ? 'text-white' : 'text-stone-900'
              }`}
            >
              It's Not Just Food, <br />
              It's an <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-500 to-red-600">Experience.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-base sm:text-lg max-w-xl font-normal leading-relaxed ${
                isNight ? 'text-stone-300' : 'text-stone-600'
              }`}
            >
              Step into <strong className={isNight ? 'text-white' : 'text-stone-900'}>{RESTAURANT_INFO.name} ({RESTAURANT_INFO.chineseName})</strong> at Uptown Brisbane. Experience hand-pulled noodles, 12-hour braised meats, crispy Roujiamo, and rich house-made chili oil prepared fresh daily by Sichuan master chefs.
            </motion.p>

            {/* CTA Action Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#menu"
                id="hero-view-menu-btn"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenReservation}
                id="hero-book-table-btn"
                className={`inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-xl border shadow-sm transition-all transform hover:-translate-y-0.5 ${
                  isNight
                    ? 'bg-stone-900 hover:bg-stone-800 text-white border-stone-700'
                    : 'bg-white hover:bg-stone-100 text-stone-900 border-stone-300'
                }`}
              >
                <span>Book a Table</span>
              </button>

              <a
                href="#craft"
                id="hero-play-video-btn"
                className={`inline-flex items-center gap-2.5 font-semibold text-sm px-4 py-3 group transition-colors ${
                  isNight ? 'text-stone-200 hover:text-red-400' : 'text-stone-800 hover:text-red-600'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-all shadow-sm">
                  <ChefHat className="w-4 h-4" />
                </div>
                <span>Chef Craftsmanship</span>
              </a>
            </motion.div>

            {/* Google Rating & Review Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`pt-4 flex items-center gap-4 border-t ${
                isNight ? 'border-stone-800' : 'border-stone-200/80'
              }`}
            >
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-stone-900 object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
                  alt="Reviewer 1"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-stone-900 object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                  alt="Reviewer 2"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-stone-900 object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                  alt="Reviewer 3"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className={`font-bold text-sm ${isNight ? 'text-white' : 'text-stone-900'}`}>{RESTAURANT_INFO.rating}</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <span className={`text-xs font-medium ${isNight ? 'text-stone-400' : 'text-stone-500'}`}>
                  Over {RESTAURANT_INFO.reviewCount}+ Verified Google Reviews
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Inspired Interactive Dish Stage */}
          <div className="lg:col-span-6 relative">
            <div className={`relative rounded-3xl p-6 sm:p-8 border shadow-2xl transition-colors duration-500 ${
              isNight
                ? 'bg-stone-900/90 border-stone-800 shadow-stone-950/80 text-white'
                : 'bg-gradient-to-br from-stone-100 to-stone-200/60 border-stone-200 shadow-stone-900/10 text-stone-900'
            }`}>
              
              {/* Discount Offer Pill (Top Left) */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-stone-950 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-stone-800 flex items-center gap-1.5">
                <span className="bg-red-500 text-white font-extrabold px-1.5 py-0.5 rounded text-[10px]">
                  5% OFF
                </span>
                <span>First Pickup Order</span>
              </div>

              {/* Chef Specialist Badge Card (Top Right) */}
              <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-3 rounded-2xl shadow-xl border flex items-center gap-3 ${
                isNight
                  ? 'bg-stone-950/90 border-stone-800 backdrop-blur-md'
                  : 'bg-white/95 border-stone-200/80 backdrop-blur-md'
              }`}>
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <ChefHat className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className={`text-xs font-extrabold ${isNight ? 'text-white' : 'text-stone-900'}`}>Chef Feny</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1 py-0.2 rounded font-bold">4.9 ★</span>
                  </div>
                  <p className={`text-[10px] ${isNight ? 'text-stone-400' : 'text-stone-500'}`}>Sichuan Master</p>
                </div>
              </div>

              {/* Main Animated Dish Plate Center Display */}
              <div className="relative py-8 flex flex-col items-center justify-center min-h-[380px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDish.id}
                    initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.85, rotate: 10 }}
                    transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
                    className="relative group cursor-pointer"
                    onClick={() => onAddToCart(activeDish)}
                  >
                    {/* Shadow & Glow */}
                    <div className="absolute inset-0 rounded-full bg-red-600/15 blur-2xl transform scale-95 group-hover:scale-105 transition-transform" />

                    {/* Circular Food Plate Image */}
                    <div className={`relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-8 shadow-2xl transition-transform duration-500 group-hover:scale-102 ${
                      isNight ? 'border-stone-800' : 'border-white'
                    }`}>
                      <img
                        src={activeDish.image}
                        alt={activeDish.name}
                        className="w-full h-full object-cover transform group-hover:rotate-3 transition-transform duration-700"
                      />
                    </div>

                    {/* Floating Spice Indicator */}
                    <div className="absolute bottom-2 right-2 bg-stone-950/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-stone-800 shadow-lg flex items-center gap-1 text-xs font-bold">
                      <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                      <span>{activeDish.spiceLevel > 0 ? `Spice Lvl ${activeDish.spiceLevel}` : 'Mild & Savory'}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dish Meta Info */}
                <div className="mt-6 text-center max-w-sm">
                  <div className="text-xs font-bold text-amber-500 tracking-wider uppercase mb-1">
                    #{activeIdx + 1} Featured Favorite • {activeDish.chineseName}
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-serif font-bold ${isNight ? 'text-white' : 'text-stone-900'}`}>
                    {activeDish.name}
                  </h3>
                  <p className={`text-xs line-clamp-2 mt-1 ${isNight ? 'text-stone-400' : 'text-stone-500'}`}>
                    {activeDish.description}
                  </p>
                  
                  {/* Price & Add Button */}
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <span className={`text-2xl font-black font-serif ${isNight ? 'text-white' : 'text-stone-900'}`}>
                      ${activeDish.price.toFixed(2)} AUD
                    </span>
                    <button
                      onClick={() => onAddToCart(activeDish)}
                      id={`hero-add-cart-${activeDish.id}`}
                      className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order Food</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Slider Controls & Carousel Thumbnails */}
              <div className={`relative mt-2 pt-4 border-t flex items-center justify-between ${
                isNight ? 'border-stone-800' : 'border-stone-200/80'
              }`}>
                <button
                  onClick={prevDish}
                  className={`p-2 rounded-full border shadow-sm transition-colors ${
                    isNight
                      ? 'bg-stone-800 hover:bg-stone-700 text-white border-stone-700'
                      : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-300'
                  }`}
                  aria-label="Previous Dish"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Thumbnails Row */}
                <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 px-2 no-scrollbar">
                  {featuredDishes.map((dish, idx) => (
                    <button
                      key={dish.id}
                      onClick={() => setActiveIdx(idx)}
                      className={`relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 transition-all ${
                        activeIdx === idx
                          ? 'border-red-600 ring-2 ring-red-500/30 scale-110'
                          : isNight ? 'border-stone-800 opacity-60 hover:opacity-100' : 'border-white opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextDish}
                  className={`p-2 rounded-full border shadow-sm transition-colors ${
                    isNight
                      ? 'bg-stone-800 hover:bg-stone-700 text-white border-stone-700'
                      : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-300'
                  }`}
                  aria-label="Next Dish"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
