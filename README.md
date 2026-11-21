# CUMID Diary Finder — Sensory Recommendation Micro-Experience

An interactive, production-quality frontend discovery experience for **CUMID**, an artisanal ecommerce brand specializing in diaries and fine stationery.

---

## ✦ Key Features

1. **Editorial Landing Experience**:
   - Hero headline *"Find Your Perfect Diary"* with editorial typography and Cormorant Garamond serif styling.
   - Narrative value pillars: 120+ GSM fountain-pen friendly paper, ritual calibration, and 180° Smyth-sewn lay-flat binding.
   - Interactive preview of the specimen diary archetype.
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

4. **Premium Results Experience**:
   - Celebratory confetti burst upon uncovering the match.
   - 3D tactile book spine & cover specimen illustration reflecting the journal's exact color profile, ribbon bookmarks, and debossed atelier insignia.
   - High-affinity match score badge (92% - 99%).
   - Deep-dive *"Why This Matches Your Mind"* explanation and 4-part ritual harmony breakdown.
   - Technical specifications grid (paper weight, page count, ruling, binding, cover finish, dimensions).
   - Interactive **Shop Now** modal showing stock readiness, Small-batch Atelier craft note, and one-click reserve interaction.
   - **Share & Copy** match summary to clipboard.
   - **Alternative Companion Journal** recommendation with quick inspection.
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
│   │   ├── ProductDetailModal.tsx    # "Shop Now" / specifications sheet modal
│   │   ├── ProgressBar.tsx           # Multi-step progress bar with Back navigation
│   │   ├── QuizCard.tsx              # Selectable interactive cards with swatches & tags
│   │   └── ResultsScreen.tsx         # Recommendation results with breakdown & confetti
│   ├── data/
│   │   ├── products.ts               # SINGLE SOURCE OF TRUTH for diary catalogue
│   │   └── quizData.ts               # 4-question discovery flow configuration
│   ├── types/
│   │   └── index.ts                  # TypeScript definitions for quiz, models & results
│   ├── utils/
│   │   └── recommendationEngine.ts   # Weighted affinity algorithm and insight generator
│   ├── App.tsx                       # Main application state orchestrator
│   ├── index.css                     # Tailwind CSS and editorial typography
│   └── main.tsx                      # Application mount
├── tailwind.config.js                # Custom palette (cream, sage, lavender, terracotta)
├── vite.config.ts                    # Vite 6 configuration
└── package.json
```

---

## ✦ Catalogue Configuration (For CUMID Product Team)

As per requirements, no fake live prices or broken store URLs are hardcoded into components. All product models live in:

[src/data/products.ts](file:///Users/karthikmp/Documents/Projects/CUMID/src/data/products.ts)

When official CUMID SKU codes, prices, and direct store URLs go live, simply update the entries in `DIARY_CATALOGUE`:

```typescript
{
  id: 'cumid-botanical-sage',
  name: 'The Botanical Meadow Journal',
  tagline: 'Quiet companion for mindful reflections and nature observations',
  collection: 'Flora & Solitude Edition',
  specs: {
    paperWeight: '120 gsm ultra-smooth acid-free',
    pages: 192,
    rulingType: '5mm subtle dotted grid',
    coverMaterial: 'Belgian woven tactile linen',
    dimensions: 'A5 (148 x 210 mm / 5.8 x 8.3 in)',
    binding: '180° lay-flat Smyth sewn',
    sustainability: 'FSC-certified & chlorine-free',
  },
  matchingProfile: {
    moods: ['reflective', 'seeking-order'],
    purposes: ['gratitude-reflection', 'bullet-habits'],
    aesthetics: ['botanical-natural', 'minimalist-pure'],
    palettes: ['sage-forest'],
  },
  // Add live retail price & direct store URL here when available
}
```

---

## ✦ Development & Build

```bash
# Run development server
npm run dev

# Run production build (TypeScript + Vite)
npm run build

# Preview production build
npm run preview
```
