# CUMID Diary Finder — Sensory Diary Discovery Experience

An interactive frontend prototype for **CUMID**, a diary and fine-stationery concept. The experience helps users explore diary concepts through a four-step sensory discovery quiz based on mood, writing purpose, aesthetic preferences, and colour palette.

CUMID Diary Finder uses a transparent weighted recommendation engine to suggest diary design concepts based on the preferences users select. Product materials, dimensions, paper specifications, and binding details represent proposed design targets and development benchmarks, not verified or commercially available products.

---

## ✦ Key Features

1. **Editorial Landing Experience**
   - Editorial hero: *“Find Your Perfect Diary”*, with Cormorant Garamond typography.
   - Concept preview featuring proposed paper and binding benchmarks.
   - Clear *“Start Exploring”* entry point.

2. **Four-Step Sensory Discovery Quiz**
   - **Step 1 — Current Mood:** Reflective & Quiet, Energetic & Driven, Creative & Whimsical, Overwhelmed & Seeking Order.
   - **Step 2 — Purpose & Ritual:** Daily Reflection & Mindful Gratitude, Bullet Journaling & Habits, Creative Writing & Poetry, Professional Planning & Strategy.
   - **Step 3 — Aesthetic Temperament:** Minimalist & Pure, Vintage European & Antiquarian, Botanical & Earthy, Playful & Contemporary Pastel.
   - **Step 4 — Colour Palette:** Sage & Whispering Forest, Muted Lavender & Twilight Dusk, Warm Almond & Honeyed Cream, Terracotta & Sunbaked Clay.

3. **Interaction & Accessibility Features**
   - Four-step progress indicator and backward navigation.
   - Radio-group semantics, selected-state announcements, keyboard selection, and visible focus styling.
   - Animated transitions powered by **Framer Motion**.
   - A short recommendation-calculation transition.

4. **Weighted Recommendation Engine**
   - Scores preferences using these weights:
     - **Palette:** 35%
     - **Purpose:** 30%
     - **Mood:** 20%
     - **Aesthetic:** 15%
   - Match tiers: Strong (≥70%), Moderate (≥35% and <70%), Weak (>0% and <35%), and Exploratory (0%).
   - Handles incomplete answers without substituting unselected defaults.
   - Uses deterministic tie-breaking for repeatable results.
   - Provides match explanations, a four-part preference breakdown, and an alternative diary concept.
   - Shows a concept illustration and a **View Diary Details** modal.
   - Offers copy/share of the recommendation summary and a retake-quiz flow.

5. **Concept Catalogue Transparency**
   - Diary entries are design concepts, not confirmed retail products.
   - Paper weights, dimensions, materials, binding, and sustainability details are proposed targets or development benchmarks.
   - The project does not claim live stock, retail prices, purchase availability, or verified certifications.

---

## ✦ Project Structure

```
cumid-diary-finder/
├── src/
│   ├── components/
│   │   ├── CalculatingScreen.tsx
│   │   ├── DiaryIllustration.tsx
│   │   ├── Header.tsx
│   │   ├── IconHelper.tsx
│   │   ├── LandingScreen.tsx
│   │   ├── ProductDetailModal.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── QuizCard.tsx
│   │   └── ResultsScreen.tsx
│   ├── data/
│   │   ├── products.ts
│   │   └── quizData.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── clipboard.ts
│   │   └── recommendationEngine.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── scripts/
│   └── pre-deployment-audit.mjs
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## ✦ Catalogue Configuration

The diary concept catalogue and matching profiles are maintained in:

[src/data/products.ts](src/data/products.ts)

When CUMID's actual products are finalized, update the corresponding catalogue entries with verified specifications and approved product information. Do not treat the example values below as confirmed product specifications.

Example concept entry:

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
    coverMaterial: 'Woven tactile linen style (proposed)',
    dimensions: 'A5 concept format (148 x 210 mm)',
    binding: 'Proposed 180° lay-flat Smyth-sewn format',
    sustainabilityTarget: 'Responsibly sourced paper target (verification pending)',
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

### Requirements

- Node.js and npm.
- Install project dependencies before running the commands below.

### Commands

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev

# Create the TypeScript-checked production build
npm run build

# Run the automated pre-deployment audit
npm test

# Preview the production build locally
npm run preview
```

**Important:** Run `npm run build` before `npm test`. The audit checks the generated `dist/` build artifacts as well as executing recommendation-engine tests and performing source-code inspections. Its static checks do not replace interactive browser testing, manual accessibility review, or testing on real mobile and desktop devices.

---

## ✦ Current Project Scope

CUMID Diary Finder is currently a frontend discovery prototype. It does not include a live checkout, payment processing, inventory management, order fulfilment, or verified commercial product catalogue. These capabilities should only be described as available after they have been implemented and tested.
