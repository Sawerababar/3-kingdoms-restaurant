import React, { useMemo, useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Phone, Clock, ExternalLink, Navigation, Sparkles, ShoppingBag, Car, Footprints, Compass, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface LocationSectionProps {
  onOpenDeliveryModal?: (partner?: string) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenDeliveryModal }) => {
  const [mapInteractive, setMapInteractive] = useState(false);

  // Check if store is open based on local Brisbane time
  const isOpenNow = useMemo(() => {
    const now = new Date();
    const day = now.getDay(); // 0: Sun, 1: Mon, ..., 5: Fri, 6: Sat
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentMins = hour * 60 + minute;

    // 10:30 AM is 630 mins. 9:00 PM is 1260 mins. 9:30 PM is 1290 mins.
    if (day >= 1 && day <= 4) {
      // Mon - Thu: 10:30 - 21:00
      return currentMins >= 630 && currentMins <= 1260;
    } else if (day === 5) {
      // Fri: 10:30 - 21:30
      return currentMins >= 630 && currentMins <= 1290;
    } else {
      // Sat - Sun: 11:00 - 21:00
      return currentMins >= 660 && currentMins <= 1260;
    }
  }, []);

  return (
    <section id="location" className="py-20 bg-stone-950 text-white relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-amber-400 text-xs font-bold tracking-wider uppercase mb-3 shadow-inner">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>Brisbane CBD Location & Ordering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white">
            Visit Us or <span className="text-red-500">Order Online</span>
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base">
            Conveniently located inside Uptown Brisbane on Elizabeth Street. Dine-in, takeaway, or order delivery straight to your doorstep.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Address, Phone & Hours */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 bg-stone-900/90 rounded-3xl p-6 sm:p-8 border border-stone-800/90 shadow-2xl flex flex-col justify-between space-y-8 backdrop-blur-sm"
          >
            <div className="space-y-6">
              {/* Live Status Badge */}
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isOpenNow ? 'bg-emerald-400' : 'bg-red-400'
                    }`} />
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${
                      isOpenNow ? 'bg-emerald-500' : 'bg-red-500'
                    }`} />
                  </span>
                  <span className="font-bold text-sm text-stone-100">
                    {isOpenNow ? 'Open Now For Dining & Pickup' : 'Currently Closed • Opens at 10:30 AM'}
                  </span>
                </div>
                <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${
                  isOpenNow ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-stone-800 text-stone-400'
                }`}>
                  {isOpenNow ? 'Dine In / Takeaway' : 'Pre-Orders Open'}
                </span>
              </div>

              {/* Exact Address */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-11 h-11 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">Exact Location</h4>
                  <p className="text-sm sm:text-base font-serif font-bold text-white mt-0.5">
                    {RESTAURANT_INFO.address}
                  </p>
                  <a
                    href={RESTAURANT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold mt-2 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Google Maps Directions</span>
                  </a>
                </div>
              </div>

              {/* Phone Dial */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">Direct Phone</h4>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="text-lg font-serif font-bold text-white hover:text-amber-400 transition-colors mt-0.5 block"
                  >
                    {RESTAURANT_INFO.phone}
                  </a>
                  <span className="text-xs text-stone-400">Call for takeaway pickup or table inquiries</span>
                </div>
              </div>

              {/* Opening Hours Table */}
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-stone-800 text-amber-400 border border-stone-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 mb-2.5">Opening Hours</h4>
                  <div className="space-y-2 text-xs">
                    {RESTAURANT_INFO.hours.map((h, i) => (
                      <div key={i} className="flex justify-between border-b border-stone-800/80 pb-1.5 text-stone-300">
                        <span className="font-medium text-stone-400">{h.days}:</span>
                        <span className="font-bold text-white">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Partner Buttons */}
            <div className="pt-4 border-t border-stone-800">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Order Delivery via Partners</span>
                </h5>
                <button
                  type="button"
                  onClick={() => onOpenDeliveryModal && onOpenDeliveryModal('UberEats')}
                  className="text-[10px] text-red-400 hover:text-red-300 font-extrabold uppercase underline tracking-wider"
                >
                  Log In / Sign Up
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {RESTAURANT_INFO.deliveryPartners.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => onOpenDeliveryModal && onOpenDeliveryModal(p.name)}
                    className="flex items-center justify-between p-3 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-xs font-bold text-stone-200 hover:text-white transition-all transform hover:-translate-y-0.5 shadow-sm text-left group"
                  >
                    <div>
                      <div>{p.name}</div>
                      <div className="text-[9px] text-amber-400/90 font-normal">{p.badge}</div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Seamless Full-Height Map Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 bg-stone-900/90 rounded-3xl border border-stone-800/90 overflow-hidden shadow-2xl flex flex-col justify-between p-4 sm:p-6 space-y-4"
          >
            {/* Embedded Google Map iframe - Expands seamlessly */}
            <div className="relative flex-1 w-full min-h-[360px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-stone-800 group">
              <iframe
                title="3 Kingdoms Brisbane Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.871182283033!2d153.0248769!3d-27.4706069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915a04eb03c089%3A0x4a431b6de161a13a!2s3%20Kingdoms!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={`w-full h-full transition-all duration-700 ${
                  mapInteractive ? 'grayscale-0 opacity-100 pointer-events-auto' : 'grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0'
                }`}
              />

              {/* Floating Location Overlay Card (Top Left) */}
              <div className="absolute top-4 left-4 z-10 bg-stone-950/90 backdrop-blur-md border border-stone-800 p-3.5 rounded-2xl shadow-xl max-w-xs pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-white">Uptown Brisbane CBD</span>
                </div>
                <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                  Located inside Uptown Elizabeth St Food Court level.
                </p>
              </div>

              {/* Floating Quick Landmarks Badge (Top Right) */}
              <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 bg-stone-950/90 backdrop-blur-md border border-stone-800 px-3 py-1.5 rounded-full shadow-lg text-[11px] font-bold text-amber-400 pointer-events-none">
                <Footprints className="w-3.5 h-3.5 text-amber-400" />
                <span>2 min walk from Queen St Mall</span>
              </div>

              {/* Bottom Interactive Directions Bar inside Map */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 bg-stone-950/90 backdrop-blur-md p-3 rounded-xl border border-stone-800 shadow-xl">
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <Compass className="w-4 h-4 text-red-500" />
                  <span className="font-semibold text-white">Elizabeth St Entrance</span>
                </div>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open Maps</span>
                </a>
              </div>
            </div>

            {/* Seamless Pickup Banner Card below Map */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 p-4 sm:p-5 rounded-2xl border border-stone-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-stone-950 flex items-center justify-center font-extrabold shadow-md flex-shrink-0">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-serif font-bold text-white flex items-center gap-2">
                    <span>Planning a Visit or Pick Up?</span>
                    <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-red-500/30">Fast Service</span>
                  </div>
                  <div className="text-xs text-stone-400 mt-0.5">Order ahead online for instant zero-wait takeaway pickup!</div>
                </div>
              </div>

              <a
                href="#menu"
                className="w-full sm:w-auto text-center bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-red-600/30 whitespace-nowrap flex items-center justify-center gap-2 group"
              >
                <span>Start Pickup Order</span>
                <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              </a>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

