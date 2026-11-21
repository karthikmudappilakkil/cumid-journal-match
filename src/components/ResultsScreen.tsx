import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  RotateCcw,
  BookOpen,
  Share2,
  CheckCircle2,
  ArrowRight,
  Eye,
  Check,
} from 'lucide-react';
import { RecommendationResult, DiaryProduct } from '../types';
import { DiaryIllustration } from './DiaryIllustration';
import { ProductDetailModal } from './ProductDetailModal';
import { IconHelper } from './IconHelper';
import { copyToClipboard } from '../utils/clipboard';

interface ResultsScreenProps {
  recommendation: RecommendationResult | null;
  onRestart: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  recommendation,
  onRestart,
}) => {
  const [selectedProductForModal, setSelectedProductForModal] = useState<DiaryProduct | null>(null);
  const [copied, setCopied] = useState(false);

  // Fallback for missing/empty recommendation
  if (!recommendation || !recommendation.primaryDiary) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto px-4">
        <div className="p-8 rounded-3xl bg-white/80 border border-cream-300 shadow-soft-md">
          <h3 className="font-editorial text-3xl text-cream-900 font-medium mb-3">
            Unable to Generate Match
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed mb-6">
            We could not determine a matching diary from the provided responses. Please retake the quiz to explore our diary concepts.
          </p>
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sage-700 hover:bg-sage-800 text-white text-xs font-semibold transition-all shadow-soft-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  const {
    primaryDiary,
    secondaryDiary,
    matchScore,
    secondaryMatchScore,
    matchStrength = 'moderate',
    matchReasons,
    matchedCriteria,
    userSelections,
  } = recommendation;

  const strengthLabels = {
    strong: {
      badge: 'IDEAL COMPANION',
      subHeader: 'Bespoke Recommendation Calibrated',
      insightTitle: 'Why This Matches Your Mind',
    },
    moderate: {
      badge: 'RECOMMENDED CONCEPT',
      subHeader: 'Curated Concept Match',
      insightTitle: 'Why This Matches Your Ritual',
    },
    weak: {
      badge: 'PRELIMINARY MATCH',
      subHeader: 'Partial Concept Match',
      insightTitle: 'Partial Alignment Analysis',
    },
    exploratory: {
      badge: 'EXPLORATORY SPECIMEN',
      subHeader: 'Exploratory Concept Profile',
      insightTitle: 'Concept Overview & Profile',
    },
  }[matchStrength];

  // Trigger celebratory confetti on mount if genuine match >= 50%
  useEffect(() => {
    try {
      if (matchScore >= 50) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#729772', '#9C7EBA', '#DFCDB7', '#D48C7B'],
        });
      }
    } catch {
      // Defensive fallback if canvas context is restricted
    }
  }, [matchScore]);

  const handleShare = async () => {
    const text = `My CUMID Diary Match: ${primaryDiary.name} (${matchScore}% Genuine Match)! Concept recommendation from CUMID Diary Finder.`;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="py-8 sm:py-12 md:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Match Affirmation Pill */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-cream-300"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sage-600" />
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-stone-600 font-semibold">
            {strengthLabels.subHeader}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-stone-700 bg-white hover:bg-cream-100 border border-cream-300 transition-colors shadow-soft-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-400"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-sage-600" />
                <span className="text-sage-700">Summary Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-stone-500" />
                <span>Share Match</span>
              </>
            )}
          </button>

          <button
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-stone-700 bg-white hover:bg-cream-100 border border-cream-300 transition-colors shadow-soft-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-400"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span>Retake Quiz</span>
          </button>
        </div>
      </motion.div>

      {/* Primary Diary Spotlight Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
        {/* Left Column: Visual Book Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col items-center"
        >
          <div className="w-full bg-gradient-to-b from-white/90 to-cream-100/70 p-6 sm:p-8 rounded-3xl border border-cream-300 shadow-soft-lg flex flex-col items-center relative">
            {/* Match Badge */}
            <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 border border-sage-300 text-xs font-bold text-sage-900 shadow-soft-sm">
              <Sparkles className="w-3.5 h-3.5 text-sage-600" />
              <span>{matchScore}% Match</span>
            </div>

            <div className="absolute top-5 right-5 text-[10px] font-mono uppercase tracking-wider text-stone-400">
              {strengthLabels.badge}
            </div>

            <div className="my-6">
              <DiaryIllustration product={primaryDiary} size="lg" />
            </div>

            {/* Quick Specs Pill Row */}
            <div className="w-full grid grid-cols-3 gap-2 pt-4 border-t border-cream-200 text-center text-xs">
              <div className="p-2 rounded-lg bg-cream-50 border border-cream-200">
                <span className="block text-[10px] uppercase font-mono text-stone-400">Paper</span>
                <span className="font-semibold text-cream-900">{primaryDiary.specs.paperWeight.split(' ')[0]}</span>
              </div>
              <div className="p-2 rounded-lg bg-cream-50 border border-cream-200">
                <span className="block text-[10px] uppercase font-mono text-stone-400">Pages</span>
                <span className="font-semibold text-cream-900">{primaryDiary.specs.pages}</span>
              </div>
              <div className="p-2 rounded-lg bg-cream-50 border border-cream-200">
                <span className="block text-[10px] uppercase font-mono text-stone-400">Format</span>
                <span className="font-semibold text-cream-900">{primaryDiary.specs.dimensions.split(' ')[0]}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Editorial Analysis & Details CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-sage-800 bg-sage-100 border border-sage-300 mb-3">
            <span>{primaryDiary.collection}</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-cream-900 font-normal leading-tight mb-3">
            {primaryDiary.name}
          </h2>

          <p className="text-base sm:text-lg text-sage-800 italic font-serif mb-4">
            "{primaryDiary.tagline}"
          </p>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6">
            {primaryDiary.description}
          </p>

          {/* Explanation Box */}
          <div className="w-full p-4 sm:p-5 rounded-2xl bg-white/80 border border-cream-300 shadow-soft-sm mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sage-600" />
              <span>{strengthLabels.insightTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {primaryDiary.whyThisMatches}
            </p>
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProductForModal(primaryDiary)}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-sage-700 hover:bg-sage-800 text-white font-medium text-base shadow-soft-md hover:shadow-soft-hover transition-all focus:outline-none focus-visible:ring-3 focus-visible:ring-sage-500"
            >
              <BookOpen className="w-4 h-4" />
              <span>View Diary Details</span>
            </motion.button>

            <button
              onClick={() => setSelectedProductForModal(primaryDiary)}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-cream-100 text-cream-900 font-medium text-sm border border-cream-300 transition-colors shadow-soft-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
            >
              <Eye className="w-4 h-4 text-stone-500" />
              <span>View Benchmark Specs</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Deep-Dive Harmony Grid: User Selections Breakdown */}
      <div className="mb-16">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-sage-800 font-semibold">
            Ritual Harmony Breakdown
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl text-cream-900 font-medium mt-1">
            How Your Answers Shaped This Recommendation
          </h3>
          <p className="text-xs text-stone-500 mt-2">
            Weighted match: Palette (35%), Purpose (30%), Mood (20%), Aesthetic (15%)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Mood Card */}
          <div className="p-5 rounded-2xl bg-white/70 border border-cream-300 shadow-soft-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono uppercase mb-2">
                <span>01 • Mood (20%)</span>
                {userSelections.mood ? (
                  <IconHelper name={userSelections.mood.iconName} className="w-4 h-4 text-sage-600" />
                ) : (
                  <Sparkles className="w-4 h-4 text-stone-400" />
                )}
              </div>
              <h4 className="font-semibold text-cream-900 text-sm mb-1">
                {userSelections.mood ? userSelections.mood.label : 'Not Specified'}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed mb-3">
                {userSelections.mood ? userSelections.mood.subtitle : 'Skipped or omitted during quiz'}
              </p>
            </div>
            <div className="pt-3 border-t border-cream-200 text-xs text-sage-800 bg-sage-50/60 p-2.5 rounded-xl border border-sage-100">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[10px] uppercase font-mono text-sage-700">Alignment</span>
                {matchedCriteria.mood ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sage-700">
                    <Check className="w-3 h-3" /> Matched (+20%)
                  </span>
                ) : (
                  <span className="text-[10px] text-stone-400 font-mono">
                    {userSelections.mood ? 'Partial' : 'Omitted (0%)'}
                  </span>
                )}
              </div>
              <p className="leading-snug">{matchReasons.moodInsight}</p>
            </div>
          </div>

          {/* Purpose Card */}
          <div className="p-5 rounded-2xl bg-white/70 border border-cream-300 shadow-soft-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono uppercase mb-2">
                <span>02 • Purpose (30%)</span>
                {userSelections.purpose ? (
                  <IconHelper name={userSelections.purpose.iconName} className="w-4 h-4 text-sage-600" />
                ) : (
                  <Sparkles className="w-4 h-4 text-stone-400" />
                )}
              </div>
              <h4 className="font-semibold text-cream-900 text-sm mb-1">
                {userSelections.purpose ? userSelections.purpose.label : 'Not Specified'}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed mb-3">
                {userSelections.purpose ? userSelections.purpose.subtitle : 'Skipped or omitted during quiz'}
              </p>
            </div>
            <div className="pt-3 border-t border-cream-200 text-xs text-sage-800 bg-sage-50/60 p-2.5 rounded-xl border border-sage-100">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[10px] uppercase font-mono text-sage-700">Alignment</span>
                {matchedCriteria.purpose ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sage-700">
                    <Check className="w-3 h-3" /> Matched (+30%)
                  </span>
                ) : (
                  <span className="text-[10px] text-stone-400 font-mono">
                    {userSelections.purpose ? 'Partial' : 'Omitted (0%)'}
                  </span>
                )}
              </div>
              <p className="leading-snug">{matchReasons.purposeInsight}</p>
            </div>
          </div>

          {/* Aesthetic Card */}
          <div className="p-5 rounded-2xl bg-white/70 border border-cream-300 shadow-soft-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono uppercase mb-2">
                <span>03 • Aesthetic (15%)</span>
                {userSelections.aesthetic ? (
                  <IconHelper name={userSelections.aesthetic.iconName} className="w-4 h-4 text-sage-600" />
                ) : (
                  <Sparkles className="w-4 h-4 text-stone-400" />
                )}
              </div>
              <h4 className="font-semibold text-cream-900 text-sm mb-1">
                {userSelections.aesthetic ? userSelections.aesthetic.label : 'Not Specified'}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed mb-3">
                {userSelections.aesthetic ? userSelections.aesthetic.subtitle : 'Skipped or omitted during quiz'}
              </p>
            </div>
            <div className="pt-3 border-t border-cream-200 text-xs text-sage-800 bg-sage-50/60 p-2.5 rounded-xl border border-sage-100">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[10px] uppercase font-mono text-sage-700">Alignment</span>
                {matchedCriteria.aesthetic ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sage-700">
                    <Check className="w-3 h-3" /> Matched (+15%)
                  </span>
                ) : (
                  <span className="text-[10px] text-stone-400 font-mono">
                    {userSelections.aesthetic ? 'Partial' : 'Omitted (0%)'}
                  </span>
                )}
              </div>
              <p className="leading-snug">{matchReasons.aestheticInsight}</p>
            </div>
          </div>

          {/* Palette Card */}
          <div className="p-5 rounded-2xl bg-white/70 border border-cream-300 shadow-soft-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono uppercase mb-2">
                <span>04 • Palette (35%)</span>
                <span
                  className="w-4 h-4 rounded-full border border-black/10 inline-block"
                  style={{ backgroundColor: userSelections.palette?.colorSwatch?.primary || '#729772' }}
                />
              </div>
              <h4 className="font-semibold text-cream-900 text-sm mb-1">
                {userSelections.palette ? userSelections.palette.label : 'Not Specified'}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed mb-3">
                {userSelections.palette ? userSelections.palette.subtitle : 'Skipped or omitted during quiz'}
              </p>
            </div>
            <div className="pt-3 border-t border-cream-200 text-xs text-sage-800 bg-sage-50/60 p-2.5 rounded-xl border border-sage-100">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[10px] uppercase font-mono text-sage-700">Alignment</span>
                {matchedCriteria.palette ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sage-700">
                    <Check className="w-3 h-3" /> Matched (+35%)
                  </span>
                ) : (
                  <span className="text-[10px] text-stone-400 font-mono">
                    {userSelections.palette ? 'Partial' : 'Omitted (0%)'}
                  </span>
                )}
              </div>
              <p className="leading-snug">{matchReasons.paletteInsight}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Companion Match (Secondary recommendation) */}
      {secondaryDiary && secondaryDiary.id !== primaryDiary.id && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white/60 border border-cream-300 shadow-soft-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="shrink-0 w-20 flex items-center justify-center">
                <DiaryIllustration product={secondaryDiary} size="xs" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                  Alternative Companion • {secondaryMatchScore}% Match (
                  {secondaryMatchScore >= 70
                    ? 'Strong Match'
                    : secondaryMatchScore >= 35
                    ? 'Moderate Match'
                    : secondaryMatchScore > 0
                    ? 'Weak Match'
                    : 'Exploratory Match'}
                  )
                </span>
                <h4 className="font-editorial text-2xl text-cream-900 font-medium">
                  {secondaryDiary.name}
                </h4>
                <p className="text-xs text-stone-600 max-w-md mt-1">
                  {secondaryDiary.tagline}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedProductForModal(secondaryDiary)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream-100 hover:bg-cream-200 border border-cream-300 text-xs font-semibold text-cream-900 transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
            >
              <span>Explore This Concept</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Restart Prompt */}
      <div className="mt-12 text-center">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 text-xs font-medium text-stone-500 hover:text-cream-900 transition-colors py-2 px-4 rounded-full hover:bg-cream-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-400"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Want to explore a different mood or purpose? Restart Quiz</span>
        </button>
      </div>

      {/* Product Detail Modal */}
      {selectedProductForModal && (
        <ProductDetailModal
          product={selectedProductForModal}
          isOpen={!!selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
        />
      )}
    </div>
  );
};
