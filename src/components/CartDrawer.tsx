import React, { useState } from 'react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { X, Trash2, Plus, Minus, Flame, ShoppingBag, ArrowRight, CheckCircle2, Ticket, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'pickup' | 'dinein'>('pickup');
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  // Customer contact for pickup
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const subtotal = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  const discountAmount = discountApplied ? subtotal * 0.1 : 0; // 10% off
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'WELCOME10' || promoCode.trim().toUpperCase() === '5OFF') {
      setDiscountApplied(true);
    } else {
      alert('Try promo code: WELCOME10 for 10% off your order!');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !customerName || !customerPhone) return;

    const ref = `3K-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);
    setOrderPlaced(true);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#dc2626', '#f59e0b', '#3b82f6', '#10b981'],
    });
  };

  const handleFinish = () => {
    setOrderPlaced(false);
    setIsCheckingOut(false);
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm"
        />

        {/* Slide-Over Drawer */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-stone-900 border-l border-stone-800 text-white flex flex-col justify-between shadow-2xl z-10"
          >
            {/* Drawer Header */}
            <div className="p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-serif font-bold text-white">Your Order Bag</h3>
                <span className="text-xs bg-red-600 text-white font-extrabold px-2 py-0.5 rounded-full">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)} items
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {orderPlaced ? (
                /* Success Screen */
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-white">
                    Order Placed Successfully!
                  </h4>
                  <p className="text-xs text-stone-300 max-w-xs mx-auto leading-relaxed">
                    Our kitchen at Uptown Brisbane has received your order. We are preparing your fresh Sichuan dishes!
                  </p>

                  <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 text-left space-y-2 text-xs">
                    <div className="flex justify-between border-b border-stone-800 pb-2">
                      <span className="text-stone-400">Order Reference:</span>
                      <span className="font-mono font-extrabold text-amber-400">{orderRef}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Order Type:</span>
                      <span className="font-bold text-white uppercase">{orderType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Estimated Ready Time:</span>
                      <span className="font-bold text-emerald-400">15 – 20 mins</span>
                    </div>
                    <div className="flex justify-between border-t border-stone-800 pt-2 font-bold text-sm text-white">
                      <span>Total Paid:</span>
                      <span>${finalTotal.toFixed(2)} AUD</span>
                    </div>
                  </div>

                  <button
                    onClick={handleFinish}
                    className="w-full bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs py-3.5 rounded-xl transition-colors"
                  >
                    Back to Home
                  </button>
                </div>
              ) : isCheckingOut ? (
                /* Checkout Contact Details Form */
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <h4 className="text-sm font-serif font-bold text-white">Complete Pickup / Dine-In</h4>
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="text-xs text-amber-400 hover:underline"
                    >
                      ← Back to Bag
                    </button>
                  </div>

                  {/* Order Type Toggle */}
                  <div className="grid grid-cols-2 gap-2 bg-stone-950 p-1.5 rounded-2xl border border-stone-800">
                    <button
                      type="button"
                      onClick={() => setOrderType('pickup')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        orderType === 'pickup'
                          ? 'bg-red-600 text-white shadow'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      🥡 Takeaway Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('dinein')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        orderType === 'dinein'
                          ? 'bg-red-600 text-white shadow'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      🍽️ Express Dine-In
                    </button>
                  </div>

                  {/* Customer Name */}
                  <div>
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 block">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 block">
                      Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0400 000 000"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {/* Order Summary Receipt */}
                  <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-1.5 text-xs">
                    <div className="flex justify-between text-stone-400">
                      <span>Subtotal ({cart.length} items):</span>
                      <span>${subtotal.toFixed(2)} AUD</span>
                    </div>
                    {discountApplied && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Promo Discount (10% OFF):</span>
                        <span>-${discountAmount.toFixed(2)} AUD</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white font-bold text-sm border-t border-stone-800 pt-2 mt-1">
                      <span>Final Total:</span>
                      <span>${finalTotal.toFixed(2)} AUD</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition-all"
                  >
                    Confirm & Send Order
                  </button>
                </form>
              ) : cart.length === 0 ? (
                /* Empty Bag State */
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-stone-800 text-stone-500 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-serif font-bold text-white">Your bag is empty</h4>
                  <p className="text-xs text-stone-400 max-w-xs mx-auto">
                    Explore our menu to add Sichuan noodles, Roujiamo, or boba teas to your order!
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                /* Cart Items List */
                <div className="space-y-4">
                  {cart.map((ci, index) => (
                    <div
                      key={index}
                      className="bg-stone-950 p-3.5 rounded-2xl border border-stone-800/80 flex items-center gap-3"
                    >
                      <img
                        src={ci.item.image}
                        alt={ci.item.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-serif font-bold text-white truncate">
                            {ci.item.name}
                          </h5>
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="text-stone-500 hover:text-red-400 p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] text-amber-400 my-1">
                          <Flame className="w-3 h-3 fill-amber-400" />
                          <span>Spice: Lvl {ci.selectedSpice}</span>
                          {ci.specialNotes && <span className="text-stone-400">({ci.specialNotes})</span>}
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-bold text-white">
                            ${(ci.item.price * ci.quantity).toFixed(2)} AUD
                          </span>

                          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(index, -1)}
                              className="w-6 h-6 rounded bg-stone-800 text-stone-300 flex items-center justify-center font-bold"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-white">
                              {ci.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(index, 1)}
                              className="w-6 h-6 rounded bg-stone-800 text-stone-300 flex items-center justify-center font-bold"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Promo Code Input */}
                  <div className="bg-stone-950 p-3 rounded-2xl border border-stone-800 flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (Use WELCOME10)"
                      className="w-full bg-transparent text-xs text-white placeholder-stone-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-stone-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary & Action */}
            {!isCheckingOut && !orderPlaced && cart.length > 0 && (
              <div className="p-6 bg-stone-950 border-t border-stone-800 space-y-3">
                <div className="space-y-1.5 text-xs text-stone-400">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-white font-bold">${subtotal.toFixed(2)} AUD</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount (10% OFF):</span>
                      <span>-${discountAmount.toFixed(2)} AUD</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-stone-800 pt-2 text-sm font-serif font-black text-white">
                    <span>Total Amount:</span>
                    <span className="text-amber-400">${finalTotal.toFixed(2)} AUD</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
