import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Feather, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
import { DiaryIllustration } from './DiaryIllustration';
import { DIARY_CATALOGUE } from '../data/products';

interface LandingScreenProps {
  onStart: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  const showcaseDiary = DIARY_CATALOGUE[0];

  return (
    <div className="relative overflow-hidden py-10 sm:py-16 md:py-20">
      {/* Decorative background ambient glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-gradient-to-r from-sage-200/40 via-cream-200/50 to-lavender-200/40 blur-3xl rounded-full -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Value Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Editorial Label Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200/80 border border-cream-300 text-xs font-semibold text-sage-900 tracking-wide uppercase mb-6 shadow-soft-sm">
              <Sparkles className="w-3.5 h-3.5 text-sage-600" />
              <span>Personalized Sensory Stationery</span>
            </div>

            {/* Core Heading */}
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-cream-900 leading-[1.08] tracking-tight mb-6">
              Find Your <span className="italic font-serif font-medium text-sage-700">Perfect</span> Diary
            </h1>

            {/* Beautiful Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-stone-600 font-normal leading-relaxed max-w-2xl mb-8">
              Every mind moves at its own cadence. Take our sensory discovery quiz to uncover
              the journal thoughtfully matched to your daily rituals, aesthetic temperament,
              and paper sensibilities.
            </p>

            {/* Start Exploring CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <motion.button
                onClick={onStart}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-sage-700 hover:bg-sage-800 text-white font-medium text-base shadow-soft-md hover:shadow-soft-hover transition-all duration-300 focus:outline-none focus-visible:ring-3 focus-visible:ring-sage-500"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <div className="flex items-center justify-center gap-2 text-xs text-stone-500 font-mono tracking-wider uppercase px-2 py-1">
                <Compass className="w-3.5 h-3.5 text-sage-600" />
                <span>4 Intuitive Questions • ~2 Minutes</span>
              </div>
            </div>

            {/* Micro Feature Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-6 border-t border-cream-300/80">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/60 border border-cream-200">
                <Feather className="w-4 h-4 text-sage-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-cream-900">120+ GSM Target</h4>
                  <p className="text-[11px] text-stone-500 leading-snug">Benchmark for fountain pens</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/60 border border-cream-200">
                <HeartHandshake className="w-4 h-4 text-lavender-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-cream-900">Ritual Match</h4>
                  <p className="text-[11px] text-stone-500 leading-snug">Calibrated to your daily cadence</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/60 border border-cream-200">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-cream-900">Lay-Flat Format</h4>
                  <p className="text-[11px] text-stone-500 leading-snug">180° Smyth-sewn comfort</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Tactile Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Editorial Showcase Frame */}
            <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white/70 border border-cream-300 shadow-soft-lg backdrop-blur-xs flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs text-stone-500 mb-2 pb-3 border-b border-cream-200 font-mono tracking-wider">
                <span>CUMID SPECIMEN</span>
                <span className="text-sage-700 font-semibold uppercase">CONCEPT PREVIEW</span>
              </div>

              {/* Center Diary Illustration */}
              <DiaryIllustration product={showcaseDiary} size="md" />

              {/* Bottom caption */}
              <div className="mt-4 text-center">
                <p className="font-editorial text-lg text-cream-900 font-medium">
                  {showcaseDiary.name}
                </p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1">
                  Discover which tactile binding, ruling format, and palette answers your ritual.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
