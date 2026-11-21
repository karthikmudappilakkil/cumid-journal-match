import React from 'react';
import { BookOpen, Sparkles, RotateCcw } from 'lucide-react';

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
  isQuizActive: boolean;
  onRestart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  totalSteps,
  isQuizActive,
  onRestart,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-cream-50/85 backdrop-blur-md border-b border-cream-300/60 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Editorial Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sage-100 border border-sage-300 flex items-center justify-center text-sage-900 shadow-soft-sm">
            <BookOpen className="w-5 h-5 text-sage-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-editorial text-2xl font-bold tracking-widest text-cream-900 uppercase">
                C U M I D
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-sage-700 bg-sage-100/80 px-2 py-0.5 rounded-full border border-sage-200">
                Diary Finder
              </span>
            </div>
            <p className="text-[11px] text-stone-500 tracking-wider uppercase font-mono">
              Sensory Stationery & Bound Journals
            </p>
          </div>
        </div>

        {/* Status / Quick Action */}
        <div className="flex items-center gap-3">
          {isQuizActive && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-200/70 border border-cream-300 text-xs text-cream-900 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-sage-500 animate-pulse" />
              <span>Step {currentStep} of {totalSteps}</span>
            </div>
          )}

          {isQuizActive && (
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-stone-600 hover:text-cream-900 hover:bg-cream-200 transition-colors border border-transparent hover:border-cream-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-400"
              title="Restart Quiz"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          {!isQuizActive && (
            <div className="hidden md:flex items-center gap-2 text-xs text-stone-500 tracking-wide">
              <span>Bespoke Recommendations</span>
              <span>•</span>
              <span>2-Minute Curation</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
