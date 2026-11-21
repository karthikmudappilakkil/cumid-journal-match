import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Bookmark, Copy, CheckCircle2, Info } from 'lucide-react';
import { DiaryProduct } from '../types';
import { DiaryIllustration } from './DiaryIllustration';

interface ProductDetailModalProps {
  product: DiaryProduct;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [savedPreference, setSavedPreference] = useState(false);
  const [copied, setCopied] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSavePreference = () => {
    setSavedPreference(true);
    setTimeout(() => {
      setSavedPreference(false);
    }, 3500);
  };

  const handleCopySpecs = () => {
    const text = `CUMID Diary Concept: ${product.name}\nCollection: ${product.collection}\nPaper Benchmark: ${product.specs.paperWeight}\nFormat: ${product.specs.pages} Pages (${product.specs.rulingType})\nBinding: ${product.specs.binding}\nCover Texture: ${product.specs.coverMaterial}\nNotice: Explore this CUMID diary concept. Product specifications, materials and availability are subject to final development.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-diary-title"
        className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-cream-50 w-full max-w-3xl rounded-3xl border border-cream-300 shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-cream-200 bg-white/70">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-widest uppercase text-sage-800 font-semibold">
                  {product.collection}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cream-200 text-stone-600 font-mono">
                  Concept Prototype
                </span>
              </div>
              <h3 id="modal-diary-title" className="font-editorial text-2xl text-cream-900 font-medium">
                {product.name}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-cream-100 hover:bg-cream-200 border border-cream-300 flex items-center justify-center text-stone-600 hover:text-cream-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Product Visual */}
              <div className="md:col-span-5 flex justify-center bg-white/50 p-4 rounded-2xl border border-cream-200">
                <DiaryIllustration product={product} size="sm" />
              </div>

              {/* Product Narrative & Highlights */}
              <div className="md:col-span-7 space-y-4">
                <p className="text-sm text-stone-700 leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-cream-900">
                    Artisanal Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {product.featuredHighlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-sage-700 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Friendly, Professional Concept Notice */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold block">Concept Prototype Notice</span>
                    <p className="text-[11px] leading-relaxed text-amber-900">
                      Explore this CUMID diary concept. Product specifications, materials and availability are subject to final development.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Matrix */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-cream-900">
                  Design Benchmark Specifications
                </h4>
                <span className="text-[10px] font-mono text-stone-400">
                  Development Targets
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-cream-200">
                  <span className="text-[10px] text-stone-400 font-mono uppercase block">Paper Weight Target</span>
                  <span className="font-medium text-cream-900">{product.specs.paperWeight}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-cream-200">
                  <span className="text-[10px] text-stone-400 font-mono uppercase block">Pages & Ruling</span>
                  <span className="font-medium text-cream-900">{product.specs.pages} Pages • {product.specs.rulingType}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-cream-200">
                  <span className="text-[10px] text-stone-400 font-mono uppercase block">Binding Architecture</span>
                  <span className="font-medium text-cream-900">{product.specs.binding}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-cream-200">
                  <span className="text-[10px] text-stone-400 font-mono uppercase block">Dimensions</span>
                  <span className="font-medium text-cream-900">{product.specs.dimensions}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-cream-200">
                  <span className="text-[10px] text-stone-400 font-mono uppercase block">Cover Style</span>
                  <span className="font-medium text-cream-900">{product.specs.coverMaterial}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-cream-200">
                  <span className="text-[10px] text-stone-400 font-mono uppercase block">Sourcing Target</span>
                  <span className="font-medium text-cream-900">{product.specs.sustainabilityTarget}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-cream-200 bg-white/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleCopySpecs}
              className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-cream-900 transition-colors py-2 px-3 rounded-lg hover:bg-cream-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage-600" />
                  <span className="text-sage-700 font-medium">Spec Sheet Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Spec Sheet</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-cream-300 hover:bg-cream-100 text-xs font-medium text-stone-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
              >
                Close
              </button>

              <button
                onClick={handleSavePreference}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-sage-700 hover:bg-sage-800 text-white text-xs font-semibold transition-all shadow-soft-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
              >
                {savedPreference ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Concept Saved to Session</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save Concept Reference</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
