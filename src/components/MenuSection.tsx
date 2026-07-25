import React, { useState, useMemo } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/restaurantData';
import { MenuItem, SpiceLevel } from '../types';
import { useTheme } from '../context/ThemeContext';
import { DishDetailModal } from './DishDetailModal';
import { Search, Flame, Sparkles, ChefHat, Info, Plus, ShoppingBag, Filter, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, selectedSpice?: SpiceLevel) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  const { mode } = useTheme();
  const isNight = mode === 'night';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpiceFilter, setSelectedSpiceFilter] = useState<number | 'all'>('all');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [inspectItem, setInspectItem] = useState<MenuItem | null>(null);

  // Filtered menu logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.chineseName.includes(searchQuery) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Spice level match
      if (selectedSpiceFilter !== 'all' && item.spiceLevel !== selectedSpiceFilter) {
        return false;
      }
      // Veg match
      if (vegOnly && !item.vegetarian) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, selectedSpiceFilter, vegOnly]);

  return (
    <section 
      id="menu" 
      className={`py-20 transition-colors duration-500 relative ${
        isNight ? 'bg-[#121110] text-stone-100' : 'bg-[#F8F7F3] text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3 ${
              isNight ? 'bg-red-950/70 border border-red-800 text-red-300' : 'bg-red-100 text-red-800'
            }`}>
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Full Interactive Food & Drink Menu</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight ${
              isNight ? 'text-white' : 'text-stone-900'
            }`}>
              Sichuan Street <span className="text-red-500">Delicacies</span>
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-xl ${
              isNight ? 'text-stone-400' : 'text-stone-600'
            }`}>
              Every dish is crafted with imported Sichuan spices, slow-simmered bone broths, and fresh daily handmade ingredients.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative min-w-[280px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search noodles, roujiamo, boba..."
              className={`w-full rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 shadow-sm ${
                isNight
                  ? 'bg-stone-900 border border-stone-800 text-white placeholder-stone-500'
                  : 'bg-white border border-stone-300 text-stone-900 placeholder-stone-400'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200 bg-stone-800 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-stone-900 text-white shadow-md'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            <span>✨ All Categories</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-stone-800 text-stone-300">
              {MENU_ITEMS.length}
            </span>
          </button>

          {MENU_CATEGORIES.map((cat) => {
            const count = MENU_ITEMS.filter((i) => i.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>{cat.icon} {cat.name}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id
                      ? 'bg-red-800 text-red-100'
                      : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Spice & Dietary Filter Controls Row */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Spice Level:
            </span>

            {[
              { id: 'all', label: 'All Spice Levels' },
              { id: 0, label: '🌱 Mild / No Spice' },
              { id: 1, label: '🌶️ Mild' },
              { id: 2, label: '🌶️🌶️ Medium' },
              { id: 3, label: '🌶️🌶️🌶️ Sichuan Hot' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedSpiceFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSpiceFilter === f.id
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Vegetarian Toggle */}
          <label className="flex items-center gap-2 text-xs font-bold text-stone-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={(e) => setVegOnly(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-stone-300"
            />
            <span>Vegetarian Friendly Only</span>
          </label>
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 max-w-md mx-auto">
            <Info className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-stone-900">No dishes match your filters</h3>
            <p className="text-xs text-stone-500 mt-1">Try resetting search or spice level filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedSpiceFilter('all');
                setVegOnly(false);
              }}
              className="mt-4 bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                key={item.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Dish Thumbnail Header */}
                  <div className="relative h-52 overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <div className="flex gap-1.5">
                        {item.popular && (
                          <span className="bg-stone-900/90 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg backdrop-blur-md shadow">
                            🔥 Popular
                          </span>
                        )}
                        {item.chefRecommended && (
                          <span className="bg-amber-500/90 text-stone-950 text-[11px] font-extrabold px-2.5 py-1 rounded-lg backdrop-blur-md shadow flex items-center gap-1">
                            <ChefHat className="w-3 h-3" /> Chef Pick
                          </span>
                        )}
                      </div>

                      {/* Spice Indicator Pill */}
                      <span className="bg-white/90 backdrop-blur-md text-stone-900 px-2.5 py-1 rounded-lg text-[11px] font-bold shadow flex items-center gap-1">
                        <Flame className={`w-3.5 h-3.5 ${item.spiceLevel > 0 ? 'text-red-500 fill-red-500' : 'text-stone-400'}`} />
                        <span>{item.spiceLevel > 0 ? `Lvl ${item.spiceLevel}` : 'Mild'}</span>
                      </span>
                    </div>

                    {/* Inspect Quick View Button */}
                    <button
                      onClick={() => setInspectItem(item)}
                      className="absolute bottom-3 right-3 bg-stone-900/80 hover:bg-stone-900 text-white p-2 rounded-xl backdrop-blur-md text-xs font-bold transition-all shadow opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                      title="Inspect Ingredients & Customize"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-xs font-serif font-bold text-red-600 tracking-wider">
                        {item.chineseName}
                      </span>
                      {item.vegetarian && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          🌱 Veg
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 leading-snug line-clamp-1">
                      {item.name}
                    </h3>

                    <p className="text-xs text-stone-500 mt-1.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Ingredient Chips */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.ingredients.slice(0, 3).map((ing) => (
                        <span
                          key={ing}
                          className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md"
                        >
                          {ing}
                        </span>
                      ))}
                      {item.ingredients.length > 3 && (
                        <span className="text-[10px] text-stone-400 font-medium">
                          +{item.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-100 mt-2">
                  <div>
                    <span className="text-xs text-stone-400 block font-medium">Price</span>
                    <span className="text-lg font-serif font-black text-stone-900">
                      ${item.price.toFixed(2)} AUD
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setInspectItem(item)}
                      className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
                      title="Customize"
                    >
                      Customize
                    </button>
                    <button
                      onClick={() => onAddToCart(item)}
                      id={`menu-add-cart-${item.id}`}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal Inspection Popup */}
        <DishDetailModal
          item={inspectItem}
          onClose={() => setInspectItem(null)}
          onAddToCart={(item, selectedSpice, quantity, notes) => {
            for (let i = 0; i < quantity; i++) {
              onAddToCart(item, selectedSpice);
            }
          }}
        />

      </div>
    </section>
  );
};
