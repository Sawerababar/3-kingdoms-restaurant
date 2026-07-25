import React, { useState } from 'react';
import { ReservationDetails } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { X, Calendar, Clock, Users, Phone, Mail, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<ReservationDetails>({
    name: '',
    phone: '',
    email: '',
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '12:30',
    seatingPreference: 'Indoor Table',
    specialRequests: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const code = `3K-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationCode(code);
    setIsSubmitted(true);

    // Fire celebratory confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#dc2626', '#f59e0b', '#10b981', '#ffffff'],
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

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
          className="relative w-full max-w-lg bg-stone-900 border border-stone-800 text-white rounded-3xl overflow-hidden shadow-2xl z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Banner */}
          <div className="bg-gradient-to-r from-red-700 via-stone-900 to-amber-600 p-6 sm:p-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/60 backdrop-blur-md text-amber-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Confirmation</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">
              Reserve a Table at {RESTAURANT_INFO.name}
            </h3>
            <p className="text-xs text-stone-200 mt-1">
              {RESTAURANT_INFO.shortAddress} • No booking fees
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-white">
                  Table Booking Confirmed!
                </h4>
                <p className="text-xs text-stone-300 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your reservation details have been logged and confirmed.
                </p>

                {/* Confirmation Receipt Box */}
                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-stone-400">Confirmation Code:</span>
                    <span className="font-mono font-extrabold text-amber-400">{confirmationCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Date & Time:</span>
                    <span className="font-bold text-white">{formData.date} at {formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Guests & Seating:</span>
                    <span className="font-bold text-white">{formData.guests} Guests ({formData.seatingPreference})</span>
                  </div>
                </div>

                <p className="text-[11px] text-stone-400 italic">
                  Need to change or cancel? Call us directly at {RESTAURANT_INFO.phone}.
                </p>

                <button
                  onClick={handleReset}
                  className="w-full bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs py-3 rounded-xl transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 block">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Smith"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0400 000 000"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Guests */}
                  <div>
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 block">
                      Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Person' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 block">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 block">
                      Time Slot
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
                    >
                      {['11:30', '12:00', '12:30', '13:00', '13:30', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seating Preference */}
                <div>
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 block">
                    Seating Area
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Indoor Table', 'Bar Counter', 'Window View'] as const).map((seat) => (
                      <button
                        type="button"
                        key={seat}
                        onClick={() => setFormData({ ...formData, seatingPreference: seat })}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                          formData.seatingPreference === seat
                            ? 'bg-amber-500 text-stone-950 border-amber-400 shadow'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                        }`}
                      >
                        {seat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 block">
                    Special Requests
                  </label>
                  <input
                    type="text"
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="High chair, birthday celebration, dietary notes..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition-all transform hover:scale-101"
                >
                  Confirm Table Reservation
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
