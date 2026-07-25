import React, { useState } from 'react';
import { MenuItem, SpiceLevel } from '../types';
import { X, Flame, Check, Plus, Minus, ShoppingBag, Clock, ChefHat, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, selectedSpice: SpiceLevel, quantity: number, notes: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel>(item.spiceLevel);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(item, selectedSpice, quantity, notes);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  const spiceOptions: { level: SpiceLevel; label: string; flames: number }[] = [
    { level: 0, label: 'Non-Spicy (清汤)', flames: 0 },
    { level: 1, label: 'Mild Spice (微辣)', flames: 1 },
    { level: 2, label: 'Medium Spice (中辣)', flames: 2 },
    { level: 3, label: 'Sichuan Hot (特辣)', flames: 3 },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 text-white rounded-3xl overflow-hidden shadow-2xl z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Image Header */}
          <div className="relative h-64 sm:h-72 overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-amber-400 text-xs font-bold px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/20 font-serif">
                  {item.chineseName}
                </span>
                {item.chefRecommended && (
                  <span className="bg-red-600/90 text-white text-xs font-bold px-2.5 py-1 rounded flex items-center gap-1">
                    <ChefHat className="w-3.5 h-3.5" />
                    <span>Chef Recommended</span>
                  </span>
                )}
                {item.cookingTime && (
                  <span className="bg-stone-800/90 text-stone-300 text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Prep: {item.cookingTime}</span>
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {item.name}
              </h2>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Description */}
            <p className="text-sm text-stone-300 leading-relaxed">
              {item.description}
            </p>

            {/* Ingredients */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Fresh Ingredients
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-xs px-3 py-1 rounded-lg bg-stone-800 border border-stone-700/80 text-stone-200"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Spice Level Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5 block">
                Choose Spice Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {spiceOptions.map((opt) => (
                  <button
                    key={opt.level}
                    type="button"
                    onClick={() => setSelectedSpice(opt.level)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 ${
                      selectedSpice === opt.level
                        ? 'bg-red-600 border-red-500 text-white shadow-md'
                        : 'bg-stone-800/60 border-stone-700 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex text-amber-400">
                      {opt.flames === 0 ? (
                        <span className="text-[10px] text-stone-400">🌱 Mild</span>
                      ) : (
                        [...Array(opt.flames)].map((_, i) => (
                          <Flame key={i} className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                        ))
                      )}
                    </div>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 block">
                Special Requests (e.g. No coriander, extra chili oil)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Let our chef know any dietary notes..."
                rows={2}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-400 font-bold uppercase">Qty:</span>
              <div className="flex items-center bg-stone-900 border border-stone-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Add to Order Button */}
            <button
              onClick={handleAdd}
              className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/50'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Order!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order • ${(item.price * quantity).toFixed(2)} AUD</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
