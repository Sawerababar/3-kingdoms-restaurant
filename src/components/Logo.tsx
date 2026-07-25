import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  className?: string;
  showChinese?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'light',
  className = '',
  showChinese = true,
}) => {
  // Size calculations for pixel-perfect scale matching the storefront sign photo
  const sizes = {
    sm: {
      chineseText: 'text-xs sm:text-sm font-black tracking-wider',
      barHeight: 'h-[1.5px]',
      stampSize: 'w-4 h-4 rounded text-[9px]',
      englishText: 'text-[10px] sm:text-xs font-bold tracking-tight',
      gap: 'gap-1',
    },
    md: {
      chineseText: 'text-sm sm:text-base font-black tracking-wider',
      barHeight: 'h-[2px]',
      stampSize: 'w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-md text-[10px]',
      englishText: 'text-xs sm:text-sm font-extrabold tracking-tight',
      gap: 'gap-1.5',
    },
    lg: {
      chineseText: 'text-lg sm:text-xl font-black tracking-wider',
      barHeight: 'h-[2px]',
      stampSize: 'w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-xs',
      englishText: 'text-sm sm:text-base font-extrabold tracking-tight',
      gap: 'gap-2',
    },
    xl: {
      chineseText: 'text-2xl sm:text-3xl font-black tracking-wider',
      barHeight: 'h-[2.5px]',
      stampSize: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-base',
      englishText: 'text-xl sm:text-2xl font-black tracking-tight',
      gap: 'gap-2.5',
    },
  }[size];

  const textColor = variant === 'dark' ? 'text-stone-900' : 'text-white';
  const barBg = variant === 'dark' 
    ? 'bg-stone-800' 
    : 'bg-gradient-to-r from-red-400 via-stone-100 to-white shadow-[0_0_12px_rgba(255,255,255,0.8)]';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`inline-flex items-center justify-center bg-black border border-stone-800 rounded-xl px-2.5 py-1.5 shadow-md shadow-black/60 origin-center ${className}`}
    >
      <div className="flex flex-col select-none">
        {/* Top Row: Illuminated White Brush Calligraphy '三国蜀菜' */}
        {showChinese && (
          <div className="flex items-center justify-between w-full mb-0.5">
            <motion.span
              animate={{
                textShadow: [
                  '0 0 4px rgba(255,255,255,0.6)',
                  '0 0 10px rgba(255,255,255,0.95)',
                  '0 0 4px rgba(255,255,255,0.6)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className={`text-white ${sizes.chineseText} leading-none font-serif font-black`}
              style={{ fontFamily: '"Noto Serif SC", "Songti SC", "SimSun", serif' }}
            >
              三国蜀菜
            </motion.span>
          </div>
        )}

        {/* Middle Line: Horizontal White Sign Line stretching across full brand width */}
        <motion.div 
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className={`w-full ${sizes.barHeight} bg-gradient-to-r from-red-500 via-white to-stone-100 shadow-[0_0_8px_rgba(255,255,255,0.8)] rounded-full my-0.5`} 
        />

        {/* Bottom Row: Red Square '3' Stamp Badge + 'Kingdoms' text */}
        <div className={`flex items-center ${sizes.gap} w-full`}>
          {/* Red Sign Badge with Stylized '3' */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 4px rgba(220,38,38,0.5)',
                '0 0 10px rgba(239,68,68,0.9)',
                '0 0 4px rgba(220,38,38,0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className={`${sizes.stampSize} bg-gradient-to-br from-red-600 via-red-600 to-red-700 text-white font-extrabold flex items-center justify-center rounded-md border border-red-400/50 shrink-0 relative overflow-hidden`}
          >
            <span className="font-serif italic drop-shadow-sm font-black leading-none">
              3
            </span>
          </motion.div>

          {/* English Brand Title 'Kingdoms' */}
          <span className={`text-white ${sizes.englishText} font-sans leading-none tracking-normal drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]`}>
            Kingdoms
          </span>
        </div>
      </div>
    </motion.div>
  );
};


