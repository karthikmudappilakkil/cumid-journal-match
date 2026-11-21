import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { LandingScreen } from './components/LandingScreen';
import { ProgressBar } from './components/ProgressBar';
import { QuizCard } from './components/QuizCard';
import { CalculatingScreen } from './components/CalculatingScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { QUIZ_QUESTIONS } from './data/quizData';
import { QuizAnswers, QuestionCategory, RecommendationResult } from './types';
import { calculateRecommendation } from './utils/recommendationEngine';
import { Sparkles, Heart } from 'lucide-react';

const STEP_LABELS = ['Mood', 'Purpose', 'Aesthetic', 'Palette'];

export const App: React.FC = () => {
  // Step 0: Landing
  // Steps 1-4: Questions
  // Step 5: Calculating animation
  // Step 6: Results
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const isQuizUnderway = currentStep >= 1 && currentStep <= totalQuestions;

  // Start Quiz from Landing
  const handleStart = () => {
    setAnswers({});
    setRecommendation(null);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Restart Quiz
  const handleRestart = () => {
    setAnswers({});
    setRecommendation(null);
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back button handler
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 1) {
      setCurrentStep(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Select an option for the current question
  const handleSelectOption = (categoryId: QuestionCategory, optionId: string) => {
    const updatedAnswers = {
      ...answers,
      [categoryId]: optionId,
    };
    setAnswers(updatedAnswers);

    // Provide a brief 280ms delay so the user feels the selection feedback before transitioning
    setTimeout(() => {
      if (currentStep < totalQuestions) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // All 4 questions answered: Calculate recommendation!
        setCurrentStep(5); // Calculating step
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const result = calculateRecommendation(updatedAnswers as QuizAnswers);
        setRecommendation(result);

        // Show calculating transition for 1.3 seconds
        setTimeout(() => {
          setCurrentStep(6); // Results step
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1300);
      }
    }, 280);
  };

  // Current active question
  const activeQuestion = QUIZ_QUESTIONS[currentStep - 1];

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-cream-900 selection:bg-sage-200">
      {/* Top Header */}
      <Header
        currentStep={currentStep}
        totalSteps={totalQuestions}
        isQuizActive={isQuizUnderway}
        onRestart={handleRestart}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* Step 0: Elegant Landing Screen */}
          {currentStep === 0 && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <LandingScreen onStart={handleStart} />
            </motion.div>
          )}

          {/* Steps 1 - 4: Multi-Step Quiz Questions */}
          {isQuizUnderway && activeQuestion && (
            <motion.div
              key={`question-${activeQuestion.id}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="py-6 sm:py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
            >
              {/* Progress Indicator */}
              <ProgressBar
                currentStep={currentStep}
                totalSteps={totalQuestions}
                stepLabels={STEP_LABELS}
                canGoBack={true}
                onBack={handleBack}
              />

              {/* Question Header */}
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-200/90 border border-cream-300 text-[11px] font-mono tracking-widest uppercase text-sage-800 font-semibold mb-3">
                  <Sparkles className="w-3 h-3 text-sage-600" />
                  <span>Question {currentStep} of {totalQuestions} • {activeQuestion.categoryLabel}</span>
                </span>

                <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-cream-900 font-normal tracking-tight mb-3">
                  {activeQuestion.title}
                </h2>

                <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-lg mx-auto">
                  {activeQuestion.subtitle}
                </p>
              </div>

              {/* Options Grid (4 Selectable Cards) */}
              <div
                role="radiogroup"
                aria-label={activeQuestion.title}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto"
              >
                {activeQuestion.options.map((option, index) => {
                  const isSelected = answers[activeQuestion.id] === option.id;

                  return (
                    <QuizCard
                      key={option.id}
                      option={option}
                      isSelected={isSelected}
                      index={index}
                      onSelect={(optId) => handleSelectOption(activeQuestion.id, optId)}
                    />
                  );
                })}
              </div>

              {/* Keyboard Accessibility Hint */}
              <div className="text-center mt-8 text-xs text-stone-400 font-mono">
                Select an option to advance • Press Enter or Space to choose
              </div>
            </motion.div>
          )}

          {/* Step 5: Calculating Screen */}
          {currentStep === 5 && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CalculatingScreen />
            </motion.div>
          )}

          {/* Step 6: Results Screen */}
          {currentStep === 6 && recommendation && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
            >
              <ResultsScreen
                recommendation={recommendation}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-cream-300/80 bg-cream-50/70 py-8 mt-12 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-editorial text-base text-cream-900 font-semibold tracking-wider uppercase">
              C U M I D
            </span>
            <span>•</span>
            <span>Diary & Fine Stationery Atelier</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-stone-400">
            <span>Designed with care for mindful rituals</span>
            <Heart className="w-3 h-3 text-terracotta-400 inline mx-0.5 fill-terracotta-400" />
            <span>• Product data modularly configured</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
