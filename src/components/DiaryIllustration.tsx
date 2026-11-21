import React from 'react';
import { DiaryProduct } from '../types';

interface DiaryIllustrationProps {
  product: DiaryProduct;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const DiaryIllustration: React.FC<DiaryIllustrationProps> = ({
  product,
  className = '',
  size = 'md',
}) => {
  // Dedicated compact thumbnail for horizontal companion cards
  if (size === 'xs') {
    return (
      <div className={`relative flex items-center justify-center p-1.5 select-none ${className}`}>
        {/* Soft ambient glow */}
        <div
          className="absolute w-20 h-24 rounded-2xl blur-lg opacity-30 transform translate-y-1"
          style={{ backgroundColor: product.primaryColorHex }}
        />

        {/* Compact Diary Card */}
        <div
          className="relative w-[76px] h-[105px] rounded-r-lg rounded-l-xs shadow-md transition-transform duration-300 hover:scale-105 flex flex-col justify-between overflow-hidden border border-black/10 p-2"
          style={{
            backgroundColor: product.primaryColorHex,
            boxShadow:
              '6px 10px 20px -3px rgba(42, 38, 33, 0.28), -2px 0 6px rgba(42, 38, 33, 0.15) inset',
          }}
        >
          {/* Subtle cover texture */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)',
              backgroundSize: '6px 6px',
            }}
          />

          {/* Spine gradient lighting */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/35 via-black/10 to-transparent pointer-events-none z-10" />
          <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/20 pointer-events-none z-10" />

          {/* Bookmark ribbon */}
          <div className="absolute top-0 right-3.5 w-1.5 h-full pointer-events-none z-20 flex flex-col items-center">
            <div
              className="w-1.5 h-[108%] rounded-b-xs shadow-xs"
              style={{ backgroundColor: product.secondaryColorHex }}
            />
          </div>

          {/* Top Foil Accent */}
          <div className="relative z-10 pl-1 pt-0.5">
            <span className="text-[7px] font-mono uppercase tracking-widest text-white/80 font-bold block">
              CUMID
            </span>
            <span className="text-[9px] font-editorial text-white/95 font-medium leading-tight block line-clamp-1">
              {product.name.replace(/\s*\((Concept|Archetype)\)/g, '')}
            </span>
          </div>

          {/* Center Emblem */}
          <div className="relative z-10 flex justify-center py-0.5 pl-1">
            <div className="w-5 h-5 rounded-full border border-white/25 flex items-center justify-center bg-white/10 backdrop-blur-xs">
              <svg
                className="w-2.5 h-2.5 text-white/80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3v18" />
                <path d="M3 12h18" />
              </svg>
            </div>
          </div>

          {/* Bottom Spec Details */}
          <div className="relative z-10 pl-1 border-t border-white/15 pt-0.5 flex items-center justify-between text-white/75 text-[7px] font-mono">
            <span>{product.specs.paperWeight.split(' ')[0]}</span>
            <span>{product.specs.pages}p</span>
          </div>

          {/* Page Edge on Right */}
          <div className="absolute right-0 top-0.5 bottom-0.5 w-1.5 bg-gradient-to-l from-amber-100 to-stone-200 shadow-inner rounded-r-xs flex flex-col justify-around py-1 opacity-90">
            <div className="w-full h-px bg-stone-300/60" />
            <div className="w-full h-px bg-stone-300/60" />
          </div>
        </div>
      </div>
    );
  }

  // Standard sizes: sm (modal), md (landing preview), lg (spotlight)
  const dimensions = {
    sm: 'w-44 h-60',
    md: 'w-56 h-76 md:w-64 md:h-88',
    lg: 'w-64 h-84 md:w-76 md:h-96',
  }[size];

  const isSmall = size === 'sm';

  return (
    <div className={`relative flex items-center justify-center p-4 ${className}`}>
      {/* Gentle shadow backdrop */}
      <div
        className="absolute w-3/4 h-3/4 rounded-3xl blur-2xl opacity-30 transform translate-y-6"
        style={{ backgroundColor: product.primaryColorHex }}
      />

      {/* Diary 3D Perspective Box */}
      <div
        className={`relative ${dimensions} rounded-r-2xl rounded-l-md shadow-2xl transition-transform duration-500 hover:rotate-1 hover:scale-102 flex flex-col justify-between overflow-hidden border border-black/10`}
        style={{
          backgroundColor: product.primaryColorHex,
          boxShadow:
            '10px 18px 38px -6px rgba(42, 38, 33, 0.28), -4px 0 12px rgba(42, 38, 33, 0.12) inset',
        }}
      >
        {/* Cover texture overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)`,
            backgroundSize: '8px 8px',
          }}
        />

        {/* Book spine simulated lighting effect on the left */}
        <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none z-10" />
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/20 pointer-events-none z-10" />

        {/* Bookmark ribbons hanging at the bottom */}
        <div className="absolute top-0 right-10 w-2.5 h-full pointer-events-none z-20 flex flex-col items-center">
          <div
            className="w-2.5 h-[106%] rounded-b-sm shadow-md"
            style={{ backgroundColor: product.secondaryColorHex }}
          />
        </div>
        <div className="absolute top-0 right-14 w-2 h-full pointer-events-none z-20 flex flex-col items-center">
          <div className="w-2 h-[103%] rounded-b-sm bg-amber-800/60 shadow-sm" />
        </div>

        {/* Top Cover Foil Accent */}
        <div className={`relative z-10 ${isSmall ? 'p-4' : 'p-6 md:p-8'} flex flex-col items-start`}>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold text-white/90 bg-black/20 backdrop-blur-sm border border-white/20">
            <span>CUMID</span>
            <span>•</span>
            <span>{product.collection.split(' ')[0]}</span>
          </div>

          <div className={isSmall ? 'mt-4' : 'mt-8'}>
            <p className="text-[11px] tracking-widest uppercase font-mono text-white/75">
              ATELIER ARCHIVE
            </p>
            <h4
              className={`font-editorial ${
                isSmall ? 'text-lg sm:text-xl' : 'text-2xl md:text-3xl'
              } text-white font-medium leading-tight mt-1 drop-shadow-sm`}
            >
              {product.name.replace(/\s*\((Concept|Archetype)\)/g, '')}
            </h4>
          </div>
        </div>

        {/* Middle decorative blind deboss / gold emblem */}
        <div className={`relative z-10 ${isSmall ? 'px-4 py-1' : 'px-6 md:px-8 py-2'} flex justify-center`}>
          <div
            className={`${
              isSmall ? 'w-10 h-10' : 'w-16 h-16'
            } rounded-full border border-white/25 flex items-center justify-center bg-white/5 backdrop-blur-xs`}
          >
            <svg
              className={`${isSmall ? 'w-5 h-5' : 'w-8 h-8'} text-white/80`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3v18" />
              <path d="M3 12h18" />
              <circle cx="12" cy="12" r="4" strokeWidth="0.8" />
            </svg>
          </div>
        </div>

        {/* Bottom Details on Cover */}
        <div
          className={`relative z-10 ${
            isSmall ? 'p-4' : 'p-6 md:p-8'
          } flex items-end justify-between border-t border-white/15 bg-black/10`}
        >
          <div className="text-white/80 text-xs">
            <p className="font-medium">{product.specs.paperWeight.split(' ')[0]} Paper</p>
            <p className="text-[11px] text-white/60">{product.specs.pages} Pages • Lay Flat</p>
          </div>
          <div className="text-[10px] tracking-widest uppercase font-mono text-white/70">
            N° 0{product.specs.pages}
          </div>
        </div>

        {/* Realistic Page Edge on Right */}
        <div className="absolute right-0 top-1 bottom-1 w-2 bg-gradient-to-l from-amber-100 via-amber-50 to-stone-200 shadow-inner rounded-r-xs flex flex-col justify-around py-2 opacity-90">
          <div className="w-full h-px bg-stone-300/60" />
          <div className="w-full h-px bg-stone-300/60" />
          <div className="w-full h-px bg-stone-300/60" />
          <div className="w-full h-px bg-stone-300/60" />
        </div>
      </div>
    </div>
  );
};
