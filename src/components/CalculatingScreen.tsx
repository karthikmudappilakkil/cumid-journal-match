import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Feather } from 'lucide-react';

export const CalculatingScreen: React.FC = () => {
  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center text-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white/80 p-8 sm:p-10 rounded-3xl border border-cream-300 shadow-soft-lg flex flex-col items-center"
      >
        {/* Animated Icon Ring */}
        <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed border-sage-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="w-14 h-14 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 shadow-inner"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Feather className="w-6 h-6 text-sage-700" />
          </motion.div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>Curating Atelier Match</span>
        </div>

        <h3 className="font-editorial text-2xl sm:text-3xl text-cream-900 font-medium mb-3">
          Crafting Your Personal Match
        </h3>

        <p className="text-sm text-stone-500 leading-relaxed mb-6">
          Analyzing your mood cadence, writing rituals, aesthetic harmony, and preferred color tones...
        </p>

        {/* Animated Progress Bar */}
        <div className="w-full bg-cream-200 h-1.5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sage-400 via-lavender-400 to-sage-600 rounded-full"
            initial={{ width: '10%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
};
