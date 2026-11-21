import React from 'react';
import { motion } from 'framer-motion';
import { QuizOption } from '../types';
import { IconHelper } from './IconHelper';
import { Check } from 'lucide-react';

interface QuizCardProps {
  option: QuizOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  index: number;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  option,
  isSelected,
  onSelect,
  index,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(option.id);
    }
  };

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={() => onSelect(option.id)}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className={`group relative text-left w-full h-full p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden focus:outline-none focus-visible:ring-3 focus-visible:ring-sage-500 shadow-soft-sm ${
        isSelected
          ? 'bg-white border-sage-500 shadow-soft-md ring-2 ring-sage-500/20'
          : 'bg-white/80 hover:bg-white border-cream-300 hover:border-sage-300 hover:shadow-soft-md'
      }`}
    >
      {/* Subtle background glow when selected */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50/60 via-transparent to-lavender-50/50 pointer-events-none" />
      )}

      {/* Top Header inside card: Icon / Swatch & Badge */}
      <div className="relative z-10 flex items-start justify-between gap-3 w-full mb-4">
        {/* Swatch or Icon */}
        {option.colorSwatch ? (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-cream-100 border border-cream-300">
            <span
              className="w-7 h-7 rounded-lg shadow-sm border border-black/10 inline-block transition-transform group-hover:scale-105"
              style={{ backgroundColor: option.colorSwatch.primary }}
            />
            <span
              className="w-5 h-7 rounded-lg shadow-sm border border-black/10 inline-block"
              style={{ backgroundColor: option.colorSwatch.secondary }}
            />
            <span
              className="w-3 h-7 rounded-lg shadow-sm border border-black/10 inline-block"
              style={{ backgroundColor: option.colorSwatch.accent }}
            />
          </div>
        ) : (
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200 border ${
              isSelected
                ? 'bg-sage-600 text-white border-sage-700 shadow-sm'
                : 'bg-cream-100 text-stone-700 border-cream-300 group-hover:bg-sage-100 group-hover:text-sage-800 group-hover:border-sage-200'
            }`}
          >
            <IconHelper name={option.iconName} className="w-5 h-5" />
          </div>
        )}

        {/* Selected Checkmark or Badge */}
        <div className="flex items-center gap-2">
          {option.badge && (
            <span
              className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border transition-colors ${
                isSelected
                  ? 'bg-sage-100 text-sage-800 border-sage-300'
                  : 'bg-cream-100 text-stone-600 border-cream-300'
              }`}
            >
              {option.badge}
            </span>
          )}

          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all border ${
              isSelected
                ? 'bg-sage-600 text-white border-sage-700 scale-100'
                : 'border-cream-300 bg-cream-50 text-transparent opacity-60 group-hover:opacity-100 group-hover:border-sage-300'
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1">
        <h3
          className={`text-lg font-semibold tracking-tight transition-colors mb-1.5 ${
            isSelected ? 'text-cream-900' : 'text-cream-900 group-hover:text-sage-800'
          }`}
        >
          {option.label}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          {option.subtitle}
        </p>
      </div>

      {/* Bottom tags */}
      {option.tags && option.tags.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-cream-200/80">
          {option.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono tracking-wider text-stone-500 bg-cream-100 px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </motion.button>
  );
};
