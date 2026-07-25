import React, { useState } from 'react';
import { CULINARY_REELS, MENU_ITEMS } from '../data/restaurantData';
import { VideoReel, MenuItem } from '../types';
import { Flame, Clock, CheckCircle2, ShoppingBag, Sparkles, ChefHat, Utensils, Award } from 'lucide-react';

interface CraftVideoStageProps {
  onAddToCart: (item: MenuItem) => void;
}

export const CraftVideoStage: React.FC<CraftVideoStageProps> = ({ onAddToCart }) => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeReel: VideoReel = CULINARY_REELS[0];

  // Find matching menu item to allow direct ordering
  const matchedMenuItem = MENU_ITEMS.find((item) =>
    item.name.toLowerCase().includes(activeReel.dishName.toLowerCase().slice(0, 8))
  ) || MENU_ITEMS[0];

  return (
    <section id="craft" className="py-20 bg-stone-950 text-white relative overflow-hidden">
      {/* Decorative Dark Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-amber-400 text-xs font-bold tracking-wider uppercase mb-3 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Master Chef Craftsmanship & Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white">
            The Art Behind <span className="text-red-500">Every Dish</span>
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base">
            Discover how our Sichuan master chefs hand-pull noodles, simmer 12-hour broths, and prepare crispy Roujiamo fresh daily.
          </p>
        </div>

        {/* Split Culinary Stage & Step-By-Step Process */}
        <div className="bg-stone-900/90 rounded-3xl border border-stone-800 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Master Culinary Showcase Spotlight */}
          <div className="lg:col-span-7 relative bg-stone-950 min-h-[380px] sm:min-h-[480px] flex items-center justify-center overflow-hidden group p-6 sm:p-8">
            <img
              src={activeReel.videoThumb}
              alt={activeReel.dishName}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/30" />

            {/* Overlaid Badges and Dish Info */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between space-y-12">
              <div className="flex items-center justify-between">
                <div className="bg-stone-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-stone-700 text-xs text-stone-200 font-medium flex items-center gap-2 shadow-lg">
                  <ChefHat className="w-4 h-4 text-amber-400" />
                  <span>{activeReel.chefName} • {activeReel.rating} ★ Master Chef</span>
                </div>

                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Award className="w-3.5 h-3.5" />
                  <span>Authentic Recipe</span>
                </div>
              </div>

              <div className="bg-stone-950/80 backdrop-blur-md p-6 rounded-2xl border border-stone-800 shadow-2xl">
                <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 fill-amber-400" />
                  <span>Fresh Daily Preparation</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
                  {activeReel.dishName}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                  {activeReel.subtitle}
                </p>

                <div className="mt-4 pt-4 border-t border-stone-800 flex items-center gap-6 text-xs text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Prep Time: 12 Hours Broth</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-red-400" />
                    <span>Hand-Pulled Fresh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Recipe & Step-By-Step Process */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-4">
                <div>
                  <h4 className="text-lg font-serif font-bold text-white">Preparation Steps</h4>
                  <p className="text-xs text-stone-400">Select a step to explore master techniques</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md font-semibold border border-amber-400/20">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Daily Process</span>
                </div>
              </div>

              {/* Step Navigation Tabs */}
              <div className="space-y-3 mb-6">
                {activeReel.steps.map((step, idx) => (
                  <button
                    key={step.stepNumber}
                    onClick={() => setActiveStepIdx(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                      activeStepIdx === idx
                        ? 'bg-stone-800 border-red-500/80 text-white shadow-md'
                        : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center flex-shrink-0 ${
                        activeStepIdx === idx
                          ? 'bg-red-600 text-white'
                          : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {step.stepNumber}
                    </div>
                    <div>
                      <div className="text-xs font-bold font-serif text-stone-200">{step.title}</div>
                      <div className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">{step.description}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Ingredients Chips */}
              <div>
                <h5 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Key Craft Ingredients
                </h5>
                <div className="flex flex-wrap gap-2">
                  {activeReel.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 border border-stone-700 text-stone-300 text-xs"
                    >
                      <CheckCircle2 className="w-3 h-3 text-red-400" />
                      <span>{ing}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Order CTA */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 block">Dine-In or Takeaway</span>
                <span className="text-xl font-serif font-black text-white">
                  ${matchedMenuItem.price.toFixed(2)} AUD
                </span>
              </div>

              <button
                onClick={() => onAddToCart(matchedMenuItem)}
                id={`craft-add-cart-${matchedMenuItem.id}`}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 transform hover:scale-105"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order This Dish</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};



