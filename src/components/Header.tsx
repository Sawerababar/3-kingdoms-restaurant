import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Logo } from './Logo';
import { useTheme } from '../context/ThemeContext';
import { ShoppingBag, Calendar, Phone, MapPin, Menu as MenuIcon, X, Sun, Moon, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenDeliveryModal: (partner?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenDeliveryModal,
}) => {
  const { mode, setMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Chef Craft', href: '#craft' },
    { name: 'Full Menu', href: '#menu' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location & Hours', href: '#location' },
  ];

  const isNight = mode === 'night';

  return (
    <header
      id="top-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isNight
          ? isScrolled
            ? 'bg-stone-950/95 backdrop-blur-md shadow-2xl border-b border-stone-800/90 py-3 text-white'
            : 'bg-gradient-to-b from-stone-950/90 via-stone-950/60 to-transparent py-4 text-white'
          : isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-stone-200 py-3 text-stone-900'
            : 'bg-gradient-to-b from-white/95 via-white/80 to-transparent py-4 text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo matching exact storefront sign photo */}
          <a
            href="#hero"
            className="flex items-center gap-2 group focus:outline-none"
            id="brand-logo-link"
          >
            <Logo size="md" variant={isNight ? 'light' : 'dark'} showChinese={true} />

          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs sm:text-sm font-semibold transition-colors relative py-1 ${
                  isNight
                    ? 'text-stone-300 hover:text-red-400'
                    : 'text-stone-700 hover:text-red-600'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Section: Day/Night Toggle Switch (KFC Reference Style) + Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Day / Night Capsule Pill Switch (Exactly like KFC Reference Screenshot) */}
            <div className={`p-1 rounded-full flex items-center border shadow-inner ${
              isNight
                ? 'bg-stone-900 border-stone-800'
                : 'bg-stone-100 border-stone-300'
            }`}>
              <button
                onClick={() => setMode('day')}
                className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 transition-all ${
                  mode === 'day'
                    ? 'bg-amber-500 text-stone-950 shadow-md font-black scale-105'
                    : isNight ? 'text-stone-400 hover:text-stone-200' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Morning Day Mode"
              >
                <Sun className="w-3 h-3" />
                <span>Day</span>
              </button>

              <button
                onClick={() => setMode('night')}
                className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 transition-all ${
                  mode === 'night'
                    ? 'bg-red-600 text-white shadow-md font-black scale-105'
                    : isNight ? 'text-stone-400 hover:text-stone-200' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Evening Night Mode"
              >
                <Moon className="w-3 h-3" />
                <span>Night</span>
              </button>
            </div>

            {/* Call Direct */}
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-colors ${
                isNight
                  ? 'text-stone-300 hover:text-white bg-stone-900/80 hover:bg-stone-800 border-stone-800'
                  : 'text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border-stone-300'
              }`}
              title="Call Restaurant"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>

            {/* Delivery Login Portal */}
            <button
              onClick={() => onOpenDeliveryModal()}
              className="hidden xl:flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-amber-400 bg-stone-900 hover:bg-stone-800 border border-stone-800 px-3 py-2 rounded-xl transition-all shadow-sm"
              title="Delivery Platform Login & Sign Up"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Delivery Login</span>
            </button>

            {/* Book Table Button */}
            <button
              onClick={onOpenReservation}
              id="header-reserve-btn"
              className="hidden md:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 border border-stone-700 px-3.5 py-2 rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Book Table</span>
            </button>

            {/* Order Bag Button */}
            <button
              onClick={onOpenCart}
              id="header-cart-btn"
              className="relative flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-3.5 py-2 rounded-xl shadow-md text-xs font-bold transition-all transform hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Order Bag</span>
              {cartCount > 0 && (
                <span className="bg-amber-400 text-stone-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl border focus:outline-none ${
                isNight
                  ? 'bg-stone-900 text-stone-300 border-stone-800'
                  : 'bg-stone-100 text-stone-700 border-stone-300'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Matching KFC Sidebar style) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-b px-4 pt-4 pb-6 mt-3 ${
              isNight ? 'bg-stone-950 border-stone-800 text-white' : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            {/* Day / Night Switch inside mobile drawer (Matching KFC Drawer) */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Appearance View</span>
              <div className="bg-stone-900 p-1 rounded-full border border-stone-800 flex items-center gap-1">
                <button
                  onClick={() => setMode('day')}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    mode === 'day' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'
                  }`}
                >
                  Day Mode
                </button>
                <button
                  onClick={() => setMode('night')}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    mode === 'night' ? 'bg-red-600 text-white' : 'text-stone-400'
                  }`}
                >
                  Night Mode
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-semibold py-2 px-3 rounded-xl transition-colors ${
                    isNight ? 'text-stone-200 hover:bg-stone-900' : 'text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-stone-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-sm py-2.5 rounded-xl shadow"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Table Online</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDeliveryModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-amber-400 font-bold text-sm py-2.5 rounded-xl shadow"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Delivery Login & Sign Up</span>
                </button>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className={`w-full flex items-center justify-center gap-2 text-sm py-2.5 rounded-xl border ${
                    isNight ? 'bg-stone-900 text-stone-200 border-stone-800' : 'bg-stone-100 text-stone-800 border-stone-300'
                  }`}
                >
                  <Phone className="w-4 h-4 text-red-500" />
                  <span>Call {RESTAURANT_INFO.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

