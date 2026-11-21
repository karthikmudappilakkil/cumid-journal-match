# CUMID Diary Finder — Sensory Recommendation Micro-Experience

An interactive, production-quality frontend discovery experience for **CUMID**, an artisanal ecommerce brand specializing in diaries and fine stationery.

---

## ✦ Key Features

1. **Editorial Landing Experience**:
   - Hero headline *"Find Your Perfect Diary"* with editorial typography and Cormorant Garamond serif styling.
   - Narrative value pillars: 120+ GSM fountain-pen friendly paper, ritual calibration, and 180° Smyth-sewn lay-flat binding.
   - Interactive preview of specimen diary concepts.
   - Intuitive *"Start Exploring"* discovery entry point.

2. **Four-Step Personality & Sensory Quiz**:
   - **Step 1 — Current Mood**: Reflective & Quiet, Energetic & Driven, Creative & Whimsical, Overwhelmed & Seeking Order.
   - **Step 2 — Purpose & Ritual**: Daily Reflection & Mindful Gratitude, Bullet Journaling & Habits, Creative Writing & Poetry, Professional Planning & Strategy.
   - **Step 3 — Aesthetic Temperament**: Minimalist & Pure, Vintage European & Antiquarian, Botanical & Earthy, Playful & Contemporary Pastel.
   - **Step 4 — Color Palette**: Sage & Whispering Forest, Muted Lavender & Twilight Dusk, Warm Almond & Honeyed Cream, Terracotta & Sunbaked Clay with live dual-tone swatches.

3. **Smooth Interaction & Accessibility**:
   - Multi-step progress bar with step indicators, progress percentages, and backward navigation.
   - Fully accessible: `role="radio"`, `aria-checked`, keyboard Enter/Space selection, and focus-visible rings.
   - Smooth animated slide & fade transitions powered by **Framer Motion**.
   - Delightful 1.2s transitional calculating animation simulating bespoke atelier curation.

4. **Transparent Weighted Recommendation Engine**:
   - Transparent, genuine scoring based on explicit matching weights:
     - **Palette**: 35%
     - **Purpose**: 30%
     - **Mood**: 20%
     - **Aesthetic**: 15%
   - Match strength tiers: Strong (≥70%), Moderate (≥35%), Weak (>0%), and Exploratory Specimen (0%).
   - Incomplete and partial answers are explicitly handled without falling back to artificial default answers.
   - Deterministic tie-breaking ensures consistent results across identical answers.
   - Celebratory confetti burst when genuine match affinity reaches 50% or higher.
   - Dynamic 3D tactile book illustration reflecting the diary concept's exact color profile, ribbon bookmarks, debossed insignia, and page gilding.
   - Deep-dive *"Why This Matches Your Mind"* explanation and 4-part ritual harmony breakdown.
   - Technical specifications grid (paper weight benchmarks, page count, ruling, binding, cover finish, dimensions).
   - Interactive **View Diary Details** modal showing development benchmarks and concept specifications.
   - **Share & Copy** match summary to clipboard.
   - **Alternative Companion Journal** recommendation with clean thumbnail preview.
   - Clean **Retake Quiz** flow returning to the initial state.

---

## ✦ Architectural Structure

```
cumid-diary-finder/
├── src/
│   ├── components/
│   │   ├── CalculatingScreen.tsx     # Bespoke analysis transition animation
│   │   ├── DiaryIllustration.tsx     # Tactile 3D book cover & ribbon renderer
│   │   ├── Header.tsx                # Editorial header with CUMID branding & reset
│   │   ├── IconHelper.tsx            # Dynamic Lucide icon mapping
│   │   ├── LandingScreen.tsx         # Hero discovery landing screen
│   │   ├── ProductDetailModal.tsx    # Diary details & specifications modal
│   │   ├── ProgressBar.tsx           # Multi-step progress bar with Back navigation
│   │   ├── QuizCard.tsx              # Selectable interactive cards with swatches & tags
│   │   └── ResultsScreen.tsx         # Recommendation results with breakdown & confetti
│   ├── data/
│   │   ├── products.ts               # SINGLE SOURCE OF TRUTH for diary concept catalogue
│   │   └── quizData.ts               # 4-question discovery flow configuration
│   ├── types/
│   │   └── index.ts                  # TypeScript definitions for quiz, models & results
│   ├── utils/
│   │   └── recommendationEngine.ts   # Weighted affinity algorithm and insight generator
│   ├── App.tsx                       # Main application state orchestrator
│   ├── index.css                     # Tailwind CSS and editorial typography
│   └── main.tsx                      # Application mount
├── scripts/
│   └── pre-deployment-audit.mjs      # Comprehensive runtime QA audit runner
├── tailwind.config.js                # Custom palette (cream, sage, lavender, terracotta)
├── vite.config.ts                    # Vite 6 configuration
└── package.json
```

---

## ✦ Catalogue Configuration (For CUMID Product Team)

No fabricated retail prices, fake stock availability, or unverified claims are hardcoded into components. All product concepts live in:

[src/data/products.ts](src/data/products.ts)

When official CUMID SKU codes, prices, and direct store URLs go live, update the entries in `DIARY_CATALOGUE`:

```typescript
{
  id: 'cumid-botanical-sage',
  name: 'The Botanical Meadow Journal (Concept)',
  tagline: 'Quiet companion concept for mindful reflections and nature observations',
  collection: 'Flora & Solitude Concept Edition',
  specs: {
    paperWeight: '120 gsm target (acid-free benchmark)',
    pages: 192,
    rulingType: '5mm subtle dotted grid',
    coverMaterial: 'Woven tactile linen style',
    dimensions: 'A5 (148 x 210 mm / 5.8 x 8.3 in)',
    binding: '180° lay-flat Smyth-sewn format',
    sustainabilityTarget: 'Target: Responsibly sourced paper (Lab audit pending)',
  },
  matchingProfile: {
    moods: ['reflective', 'seeking-order'],
    purposes: ['gratitude-reflection', 'bullet-habits'],
    aesthetics: ['botanical-natural', 'minimalist-pure'],
    palettes: ['sage-forest'],
  },
}
```

---

## ✦ Development & Testing

```bash
# Run development server
npm run dev

# Run production build (TypeScript + Vite)
npm run build

# Run automated pre-deployment QA audit
npm test

# Preview production build
npm run preview
```
