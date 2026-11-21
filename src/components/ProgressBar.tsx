import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  canGoBack: boolean;
  onBack: () => void;
  canGoForward?: boolean;
  onNext?: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
  canGoBack,
  onBack,
  canGoForward = false,
  onNext,
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-8">
      {/* Top row with Back navigation and Step counter */}
      <div className="flex items-center justify-between mb-3 text-sm">
        {canGoBack ? (
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-cream-900 transition-colors py-1 px-2.5 rounded-lg hover:bg-cream-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-400"
            aria-label="Previous question"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Previous</span>
          </button>
        ) : (
          <div className="text-xs tracking-wider uppercase font-mono text-stone-400">
            Discovery Phase
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-wide text-cream-900">
            {stepLabels[currentStep - 1] || `Step ${currentStep}`}
          </span>
          <span className="text-xs text-stone-400 font-mono">
            ({currentStep}/{totalSteps})
          </span>
          <span className="text-xs font-medium text-sage-700 bg-sage-100 px-2 py-0.5 rounded-full border border-sage-200">
            {percentage}%
          </span>

          {canGoForward && onNext && (
            <button
              onClick={onNext}
              className="group inline-flex items-center gap-1 text-xs font-medium text-sage-800 hover:text-cream-900 transition-colors py-1 px-2 rounded-lg hover:bg-sage-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 ml-1"
              aria-label="Next question"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative h-2 w-full bg-cream-200 rounded-full overflow-hidden border border-cream-300/80 shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-sage-400 via-sage-500 to-lavender-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        />
      </div>

      {/* Step Pills for visual orientation on desktop */}
      <div className="hidden sm:grid grid-cols-4 gap-2 mt-3">
        {stepLabels.map((label, idx) => {
          const stepNum = idx + 1;
          const isComplete = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={label}
              className={`flex items-center gap-1.5 text-[11px] py-1 px-2 rounded-md transition-all ${
                isCurrent
                  ? 'bg-sage-100 text-sage-900 font-semibold border border-sage-300 shadow-soft-sm'
                  : isComplete
                  ? 'text-stone-500 font-medium'
                  : 'text-stone-400'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  isCurrent
                    ? 'bg-sage-700 text-white'
                    : isComplete
                    ? 'bg-sage-200 text-sage-800'
                    : 'bg-cream-300 text-stone-500'
                }`}
              >
                {stepNum}
              </div>
              <span className="truncate">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
