import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useTheme } from '../context/ThemeContext';
import { X, ExternalLink, CheckCircle2, ShieldCheck, Lock, Sparkles, Smartphone, Mail, ArrowRight, UserCheck, Star, Gift, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DeliveryPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPartner?: string;
}

export const DeliveryPartnerModal: React.FC<DeliveryPartnerModalProps> = ({
  isOpen,
  onClose,
  initialPartner = 'UberEats'
}) => {
  const { mode } = useTheme();
  const isNight = mode === 'night';

  const [activePartner, setActivePartner] = useState<string>(initialPartner);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Form fields
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [promoCode, setPromoCode] = useState('3KINGDOMS15');
  
  // Connected state per platform
  const [connectedUsers, setConnectedUsers] = useState<Record<string, { email: string; name: string; pass: string }>>({
    DoorDash: { email: 'patron@brisbane.com', name: 'Alex M.', pass: 'DashPass $0 Delivery Active' }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const platforms = [
    {
      id: 'UberEats',
      name: 'UberEats',
      url: 'https://www.ubereats.com',
      color: '#06C167',
      bgLight: 'bg-emerald-50 text-emerald-950 border-emerald-200',
      bgDark: 'bg-emerald-950/60 text-emerald-100 border-emerald-800',
      badge: 'Fastest 15-25 min delivery',
      promo: 'Get $15 off your first 3 Kingdom orders',
      code: 'UBER3KINGDOMS'
    },
    {
      id: 'DoorDash',
      name: 'DoorDash',
      url: 'https://www.doordash.com',
      color: '#FF3008',
      bgLight: 'bg-red-50 text-red-950 border-red-200',
      bgDark: 'bg-red-950/60 text-red-100 border-red-800',
      badge: '$0 Delivery Fee with DashPass',
      promo: '20% Off Sichuan Noodle Bowls',
      code: 'DASHPASS20'
    },
    {
      id: 'Fantuan',
      name: 'Fantuan 饭团外卖',
      url: 'https://www.fantuanorder.com',
      color: '#00B2E3',
      bgLight: 'bg-cyan-50 text-cyan-950 border-cyan-200',
      bgDark: 'bg-cyan-950/60 text-cyan-100 border-cyan-800',
      badge: 'Official Asian Food Partner',
      promo: 'Exclusive 15% OFF for Brisbane CBD',
      code: 'FANTUAN3K'
    },
    {
      id: 'EatClub',
      name: 'EatClub',
      url: 'https://www.eatclub.com.au',
      color: '#6C5CE7',
      bgLight: 'bg-purple-50 text-purple-950 border-purple-200',
      bgDark: 'bg-purple-950/60 text-purple-100 border-purple-800',
      badge: 'Live Deals & Pickup Discounts',
      promo: 'Instant 25% Off Takeaway Voucher',
      code: 'EATCLUB25'
    }
  ];

  const currentPlatform = platforms.find((p) => p.id === activePartner) || platforms[0];
  const isConnected = !!connectedUsers[currentPlatform.id];

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone) return;

    setIsLoading(true);
    setSuccessMsg('');

    setTimeout(() => {
      setIsLoading(false);
      const userIdentifier = emailOrPhone.includes('@') ? emailOrPhone : `+61 ${emailOrPhone}`;
      const name = fullName || userIdentifier.split('@')[0] || 'Patron';

      setConnectedUsers((prev) => ({
        ...prev,
        [currentPlatform.id]: {
          email: userIdentifier,
          name: name,
          pass: `${currentPlatform.name} Premium Perks Unlocked`
        }
      }));

      setSuccessMsg(`Successfully ${authMode === 'login' ? 'logged into' : 'created account on'} ${currentPlatform.name}! Perks applied.`);
    }, 800);
  };

  const handleDisconnect = () => {
    setConnectedUsers((prev) => {
      const updated = { ...prev };
      delete updated[currentPlatform.id];
      return updated;
    });
    setSuccessMsg('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden ${
            isNight ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
          }`}
        >
          {/* Top Banner Header with Close Button */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 text-white border-b border-stone-800">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              aria-label="Close delivery modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official Delivery Partner Portal</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
              Log In & Order on Delivery Platforms
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              Sign in to your preferred delivery account to order 3 Kingdoms Sichuan Food directly with member vouchers and $0 delivery fee perks.
            </p>

            {/* Platform Selector Tabs */}
            <div className="mt-6 flex flex-wrap gap-2">
              {platforms.map((p) => {
                const isActive = activePartner === p.id;
                const hasConn = !!connectedUsers[p.id];
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActivePartner(p.id);
                      setSuccessMsg('');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all border ${
                      isActive
                        ? 'bg-white text-stone-950 border-white shadow-lg scale-105'
                        : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:bg-stone-700'
                    }`}
                  >
                    <span>{p.name}</span>
                    {hasConn && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400" title="Connected" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-6 sm:p-8 space-y-6">

            {/* Selected Platform Perks Card */}
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              isNight ? currentPlatform.bgDark : currentPlatform.bgLight
            }`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-black text-base">{currentPlatform.name}</span>
                  <span className="text-[10px] font-extrabold bg-stone-900 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
                    {currentPlatform.badge}
                  </span>
                </div>
                <div className="text-xs font-semibold mt-1 flex items-center gap-1.5 opacity-90">
                  <Gift className="w-3.5 h-3.5" />
                  <span>Promo Deal: {currentPlatform.promo}</span>
                </div>
              </div>

              <div className="bg-stone-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-stone-700 flex items-center gap-1.5 self-stretch sm:self-auto justify-center">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>Code: {currentPlatform.code}</span>
              </div>
            </div>

            {/* Connected Account Banner or Login/Signup Forms */}
            {isConnected ? (
              <div className={`p-6 rounded-2xl border text-center space-y-4 ${
                isNight ? 'bg-emerald-950/40 border-emerald-800 text-emerald-100' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold">
                    Connected to {currentPlatform.name}
                  </h4>
                  <p className="text-xs font-medium mt-1 opacity-90">
                    Logged in as <strong>{connectedUsers[currentPlatform.id].email}</strong> ({connectedUsers[currentPlatform.id].name})
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                    {connectedUsers[currentPlatform.id].pass}
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={currentPlatform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition-all inline-flex items-center justify-center gap-2"
                  >
                    <span>Launch 3 Kingdoms on {currentPlatform.name}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={handleDisconnect}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs px-4 py-3 rounded-xl transition-colors"
                  >
                    Switch / Log Out Account
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Auth Mode Toggle Switch */}
                <div className="flex items-center justify-center bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl border border-stone-200 dark:border-stone-700 max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setSuccessMsg('');
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                      authMode === 'login'
                        ? 'bg-red-600 text-white shadow'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    Log In to {currentPlatform.name}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      setSuccessMsg('');
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                      authMode === 'signup'
                        ? 'bg-red-600 text-white shadow'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    Sign Up Free
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {authMode === 'signup' && (
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-red-500/30 ${
                          isNight
                            ? 'bg-stone-800 border-stone-700 text-white placeholder-stone-500'
                            : 'bg-white border-stone-300 text-stone-900 placeholder-stone-400'
                        }`}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {currentPlatform.name} Account Email or Australian Mobile (+61)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="0412 345 678 or email@example.com"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-red-500/30 ${
                          isNight
                            ? 'bg-stone-800 border-stone-700 text-white placeholder-stone-500'
                            : 'bg-white border-stone-300 text-stone-900 placeholder-stone-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                        Password or OTP Passcode
                      </label>
                      {authMode === 'login' && (
                        <span className="text-[10px] text-red-500 font-bold hover:underline cursor-pointer">
                          Forgot password?
                        </span>
                      )}
                    </div>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-red-500/30 ${
                        isNight
                          ? 'bg-stone-800 border-stone-700 text-white placeholder-stone-500'
                          : 'bg-white border-stone-300 text-stone-900 placeholder-stone-400'
                      }`}
                    />
                  </div>

                  {authMode === 'signup' && (
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        3 Kingdoms Member Promo Code
                      </label>
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs font-mono font-bold border ${
                          isNight ? 'bg-stone-800 border-amber-500/50 text-amber-300' : 'bg-amber-50 border-amber-300 text-amber-900'
                        }`}
                      />
                    </div>
                  )}

                  {/* Social Logins */}
                  <div className="pt-2">
                    <div className="relative text-center text-[10px] text-stone-400 my-2">
                      <span className="bg-white dark:bg-stone-900 px-2 font-semibold">Or fast login with</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEmailOrPhone('google.user@gmail.com');
                          setFullName('Google Patron');
                        }}
                        className="py-2 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-300 dark:border-stone-700 transition-colors"
                      >
                        Google
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEmailOrPhone('apple.user@icloud.com');
                          setFullName('Apple Patron');
                        }}
                        className="py-2 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-300 dark:border-stone-700 transition-colors"
                      >
                        Apple ID
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEmailOrPhone('wechat_user_brisbane');
                          setFullName('WeChat Patron');
                        }}
                        className="py-2 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-300 dark:border-stone-700 transition-colors"
                      >
                        WeChat
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>{authMode === 'login' ? `Log In to ${currentPlatform.name}` : `Create ${currentPlatform.name} Account`}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {successMsg && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{successMsg}</span>
                  </div>
                )}
              </div>
            )}

            {/* Direct Link External Fallback */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
              <span>Prefer official website?</span>
              <a
                href={currentPlatform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-red-500 hover:underline flex items-center gap-1"
              >
                <span>Visit {currentPlatform.name} Web Page</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
