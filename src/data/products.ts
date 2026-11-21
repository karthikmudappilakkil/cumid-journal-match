import type { DiaryProduct } from '../types';

/**
 * =====================================================================
 * CUMID PRODUCT CATALOGUE DATA FILE (ARCHETYPE SPECIMENS)
 * =====================================================================
 * NOTE: As per project guidelines, this separate data file serves as the
 * single configurable source of truth for diary models and matching profiles.
 *
 * All entries below represent curated DESIGN ARCHETYPES and concept models
 * for the diary recommendation engine. No fabricated retail prices, live
 * inventory stock, or verified laboratory certifications are asserted as facts.
 *
 * Catalogue managers:
 * When official CUMID SKU names, production prices, certified sustainability
 * audits, and direct store URLs become available, update the entries in this array.
 * =====================================================================
 */

const PROTOTYPE_CATALOGUE_NOTICE =
  'Concept Archetype Specimen: Specifications and material targets are design benchmarks. Official retail pricing, verified certifications, and live inventory will be published upon formal CUMID catalogue integration.';

export const DIARY_CATALOGUE: DiaryProduct[] = [
  {
    id: 'cumid-botanical-sage',
    name: 'The Botanical Meadow Journal (Archetype)',
    tagline: 'Quiet companion concept for mindful reflections and nature observations',
    collection: 'Flora & Solitude Concept Edition',
    isArchetypeModel: true,
    catalogueNotice: PROTOTYPE_CATALOGUE_NOTICE,
    description:
      'Engineered with a tactile woven linen cover design in soothing sage green. Conceptually paired with 120gsm paper targeted for smooth ink laydown without significant ghosting.',
    whyThisMatches:
      'Your desire for calm reflection and organic botanical tones matches with this restorative linen-bound concept archetype.',
    specs: {
      paperWeight: '120 gsm target (acid-free benchmark)',
      pages: 192,
      rulingType: '5mm subtle dotted grid',
      coverMaterial: 'Woven tactile linen style',
      dimensions: 'A5 (148 x 210 mm / 5.8 x 8.3 in)',
      binding: '180° lay-flat Smyth-sewn format',
      sustainabilityTarget: 'Target: Responsibly sourced paper (Lab audit pending)',
    },
    coverColorClass: 'bg-sage-100 border-sage-300 text-sage-900',
    accentColorClass: 'text-sage-700 bg-sage-50',
    primaryColorHex: '#729772',
    secondaryColorHex: '#E7EFE7',
    visualPattern: 'botanical',
    matchingProfile: {
      moods: ['reflective', 'seeking-order'],
      purposes: ['gratitude-reflection', 'bullet-habits'],
      aesthetics: ['botanical-natural', 'minimalist-pure'],
      palettes: ['sage-forest'],
    },
    featuredHighlights: [
      '180° lay-flat binding layout for left or right-hand journaling comfort',
      'Dual woven ribbon markers in coordinating moss and cream shades',
      'Expandable back gusset pocket design for notes and botanicals',
    ],
  },
  {
    id: 'cumid-twilight-lavender',
    name: 'The Twilight Contemplation Diary (Archetype)',
    tagline: 'Gentle sanctuary concept for night thoughts, poetry, and whimsical musings',
    collection: 'Nocturne & Reverie Concept Edition',
    isArchetypeModel: true,
    catalogueNotice: PROTOTYPE_CATALOGUE_NOTICE,
    description:
      'Concept hardback in soft dusk lavender. Designed for evening unwind rituals and creative flow states with expansive, unhurried margins.',
    whyThisMatches:
      'Your creative imagination and appreciation for dreamy lavender tones find an inspiring direction in this evening contemplation notebook concept.',
    specs: {
      paperWeight: '130 gsm target (hot-pressed ivory benchmark)',
      pages: 208,
      rulingType: 'Blank with faint bottom page numbers',
      coverMaterial: 'Soft-touch matte finish',
      dimensions: 'B5 Slim (176 x 250 mm / 6.9 x 9.8 in)',
      binding: 'Archival Smyth-sewn format',
      sustainabilityTarget: 'Target: Recycled fiber content (Lab audit pending)',
    },
    coverColorClass: 'bg-lavender-100 border-lavender-300 text-lavender-900',
    accentColorClass: 'text-lavender-700 bg-lavender-50',
    primaryColorHex: '#9C7EBA',
    secondaryColorHex: '#F1ECF5',
    visualPattern: 'modern',
    matchingProfile: {
      moods: ['creative', 'reflective'],
      purposes: ['creative-writing', 'gratitude-reflection'],
      aesthetics: ['modern-pastel', 'minimalist-pure'],
      palettes: ['muted-lavender'],
    },
    featuredHighlights: [
      'Hot-pressed ivory leaf specifications calibrated for dip and fountain pens',
      'Gilded edge detailing designed to catch warm bedside illumination',
      'Accompanied by a 16-page creative prompt and mood insert format',
    ],
  },
  {
    id: 'cumid-heirloom-cream',
    name: 'The Heirloom Classic Clothbound Notebook (Archetype)',
    tagline: 'European library craft concept for profound thoughts and daily discipline',
    collection: 'Antiquarian Archive Concept Edition',
    isArchetypeModel: true,
    catalogueNotice: PROTOTYPE_CATALOGUE_NOTICE,
    description:
      'Inspired by vintage library archives, featuring an unbleached oatmeal buckram cloth binding concept with debossed typography.',
    whyThisMatches:
      'Your preference for timeless vintage European aesthetics and honeyed cream hues harmonizes with this archive-grade heirloom concept.',
    specs: {
      paperWeight: '115 gsm target (milled cotton byproduct benchmark)',
      pages: 224,
      rulingType: 'Feint 6.5mm narrow ruled with top margin',
      coverMaterial: 'Natural buckram cloth texture',
      dimensions: 'A5 Medium (145 x 215 mm / 5.7 x 8.5 in)',
      binding: 'Reinforced library cloth spine format',
      sustainabilityTarget: 'Target: Cotton byproduct recovery (Lab audit pending)',
    },
    coverColorClass: 'bg-cream-200 border-cream-400 text-cream-900',
    accentColorClass: 'text-stone-700 bg-cream-50',
    primaryColorHex: '#DFCDB7',
    secondaryColorHex: '#FAF6EE',
    visualPattern: 'linen',
    matchingProfile: {
      moods: ['driven', 'reflective'],
      purposes: ['professional-planning', 'gratitude-reflection'],
      aesthetics: ['vintage-european', 'minimalist-pure'],
      palettes: ['warm-cream'],
    },
    featuredHighlights: [
      'Reinforced buckram cloth spine architecture designed for long-term desk durability',
      'Acid-free paper formulation targeted to prevent yellowing over time',
      'Blind-embossed spine area for volume numbering and personal archival',
    ],
  },
  {
    id: 'cumid-terracotta-planner',
    name: 'The Sunbaked Horizon Daily Executive (Archetype)',
    tagline: 'Grounded momentum concept for bold ambition and project architecture',
    collection: 'Terra & Focus Concept Edition',
    isArchetypeModel: true,
    catalogueNotice: PROTOTYPE_CATALOGUE_NOTICE,
    description:
      'Enclosed in warm sunbaked terracotta leatherette with an integrated elastic closure. Built for structured schedules and project mapping.',
    whyThisMatches:
      'Your driven mindset and appreciation for energetic terracotta accents make this structured executive planner concept your ideal co-pilot.',
    specs: {
      paperWeight: '125 gsm target (high-opacity benchmark)',
      pages: 240,
      rulingType: 'Structured daily planner with grid project matrix',
      coverMaterial: 'Supple vegan leatherette finish',
      dimensions: 'Desk A5+ (155 x 220 mm / 6.1 x 8.6 in)',
      binding: 'Lay-flat flexible flexi-bound format',
      sustainabilityTarget: 'Target: Animal-free materials & soy inks (Audit pending)',
    },
    coverColorClass: 'bg-terracotta-100 border-terracotta-400 text-cream-900',
    accentColorClass: 'text-terracotta-600 bg-terracotta-50',
    primaryColorHex: '#D48C7B',
    secondaryColorHex: '#F6E8E3',
    visualPattern: 'leatherette',
    matchingProfile: {
      moods: ['driven', 'seeking-order'],
      purposes: ['professional-planning', 'bullet-habits'],
      aesthetics: ['minimalist-pure', 'vintage-european'],
      palettes: ['terracotta-clay'],
    },
    featuredHighlights: [
      'Comprehensive sprint planning, milestones, and habit matrices layout',
      'Elastic loop closure and secure page-keeper band',
      'Numbered leaves with index table for rapid cross-referencing',
    ],
  },
  {
    id: 'cumid-minimal-zen-atelier',
    name: 'The Atelier Dot-Grid Master Journal (Archetype)',
    tagline: 'Pure, unencumbered space concept for freeform thinkers and organizers',
    collection: 'Pure Form Concept Edition',
    isArchetypeModel: true,
    catalogueNotice: PROTOTYPE_CATALOGUE_NOTICE,
    description:
      'Clean open aesthetics with micro-fine dots allowing total flexibility between writing, bullet routines, sketching, and data charting.',
    whyThisMatches:
      'Your pursuit of minimal order and balanced aesthetics finds clarity in this versatile dot-grid atelier concept.',
    specs: {
      paperWeight: '140 gsm target (mixed-media vellum benchmark)',
      pages: 180,
      rulingType: 'Light charcoal 4mm micro dot-grid',
      coverMaterial: 'Composite board texture',
      dimensions: 'Square Royale (190 x 190 mm / 7.5 x 7.5 in)',
      binding: 'Swiss-style open stitch format',
      sustainabilityTarget: 'Target: Alternative tree-free matrix (Audit pending)',
    },
    coverColorClass: 'bg-sand-100 border-sand-300 text-cream-900',
    accentColorClass: 'text-sand-400 bg-sand-50',
    primaryColorHex: '#D5CCC1',
    secondaryColorHex: '#FAF8F5',
    visualPattern: 'minimal',
    matchingProfile: {
      moods: ['seeking-order', 'creative'],
      purposes: ['bullet-habits', 'creative-writing'],
      aesthetics: ['minimalist-pure', 'modern-pastel'],
      palettes: ['warm-cream', 'sage-forest'],
    },
    featuredHighlights: [
      'Heavy 140gsm weight designed to resist bleed from water-based brush pens',
      'Square layout providing spacious lateral thinking room on tabletops',
      'Lay-flat Swiss binding allowing panoramic double-page spread work',
    ],
  },
];
