import { DIARY_CATALOGUE } from '../data/products';
import { QUIZ_QUESTIONS } from '../data/quizData';
import type { QuizAnswers, RecommendationResult, DiaryProduct } from '../types';

export function calculateRecommendation(answers: QuizAnswers): RecommendationResult {
  // Find selected option objects
  const moodOption = QUIZ_QUESTIONS[0].options.find((o) => o.id === answers.mood) || QUIZ_QUESTIONS[0].options[0];
  const purposeOption = QUIZ_QUESTIONS[1].options.find((o) => o.id === answers.purpose) || QUIZ_QUESTIONS[1].options[0];
  const aestheticOption = QUIZ_QUESTIONS[2].options.find((o) => o.id === answers.aesthetic) || QUIZ_QUESTIONS[2].options[0];
  const paletteOption = QUIZ_QUESTIONS[3].options.find((o) => o.id === answers.palette) || QUIZ_QUESTIONS[3].options[0];

  // Score each diary product
  const scoredProducts = DIARY_CATALOGUE.map((product) => {
    let score = 0;
    const profile = product.matchingProfile;

    // Palette match (weight: 35)
    if (profile.palettes.includes(answers.palette)) {
      score += 35;
    } else {
      score += 10;
    }

    // Purpose match (weight: 30)
    if (profile.purposes.includes(answers.purpose)) {
      score += 30;
    } else {
      score += 8;
    }

    // Mood match (weight: 20)
    if (profile.moods.includes(answers.mood)) {
      score += 20;
    } else {
      score += 6;
    }

    // Aesthetic match (weight: 15)
    if (profile.aesthetics.includes(answers.aesthetic)) {
      score += 15;
    } else {
      score += 5;
    }

    return { product, score };
  });

  // Sort descending by score
  scoredProducts.sort((a, b) => b.score - a.score);

  const topMatch = scoredProducts[0].product;
  const runnerUp = scoredProducts[1]?.product || scoredProducts[0].product;
  const rawScore = scoredProducts[0].score;
  // Normalize score between 92% and 99% for an encouraging, realistic match affinity
  const matchPercentage = Math.min(99, Math.max(92, Math.round(88 + (rawScore / 100) * 11)));

  // Generate personalized match reasons based on specific selections
  const matchReasons = {
    moodInsight: generateMoodInsight(answers.mood, topMatch),
    purposeInsight: generatePurposeInsight(answers.purpose, topMatch),
    aestheticInsight: generateAestheticInsight(answers.aesthetic, topMatch),
    paletteInsight: generatePaletteInsight(answers.palette, topMatch),
  };

  return {
    primaryDiary: topMatch,
    secondaryDiary: runnerUp,
    matchScore: matchPercentage,
    matchReasons,
    userSelections: {
      mood: moodOption,
      purpose: purposeOption,
      aesthetic: aestheticOption,
      palette: paletteOption,
    },
  };
}

function generateMoodInsight(mood: string, _product: DiaryProduct): string {
  switch (mood) {
    case 'reflective':
      return `Tailored for peaceful contemplation with calming tactile bindings and zero-glare paper.`;
    case 'driven':
      return `Engineered for purposeful momentum, offering structured layout clarity and quick indexing.`;
    case 'creative':
      return `Unlocks your imaginative flow with generous margins and fountain-pen grade bleed resistance.`;
    case 'seeking-order':
      return `Brings grounding tranquility to mental clutter with clean ruling and tactile calm.`;
    default:
      return `Harmonizes with your emotional tempo and thoughtful headspace.`;
  }
}

function generatePurposeInsight(purpose: string, product: DiaryProduct): string {
  switch (purpose) {
    case 'gratitude-reflection':
      return `Crafted with unhurried ${product.specs.paperWeight} paper that elevates morning or evening gratitude rituals.`;
    case 'bullet-habits':
      return `Features ${product.specs.rulingType} optimized for clean habit trackers, checkboxes, and rapid logs.`;
    case 'creative-writing':
      return `Bound with lay-flat 180° stitching so your prose and sketches flow across seamless spreads.`;
    case 'professional-planning':
      return `Includes executive-grade ribbon dividers and durable archival cloth to organize projects with poise.`;
    default:
      return `Designed to support your daily practice with lasting craftsmanship.`;
  }
}

function generateAestheticInsight(aesthetic: string, _product: DiaryProduct): string {
  switch (aesthetic) {
    case 'minimalist-pure':
      return `Quiet, unpretentious beauty with refined proportions and understated tactile finishes.`;
    case 'vintage-european':
      return `Nods to historic bookbinding ateliers with heirloom cloth and blind-embossed detailing.`;
    case 'botanical-natural':
      return `Rooted in natural textures, botanical undertones, and earth-conscious tactile covers.`;
    case 'modern-pastel':
      return `Contemporary pastel elegance that brings an optimistic, artful aesthetic to your tabletop.`;
    default:
      return `Elevates your workspace with sophisticated editorial balance.`;
  }
}

function generatePaletteInsight(palette: string, _product: DiaryProduct): string {
  switch (palette) {
    case 'sage-forest':
      return `Wrapped in gentle sage and herbal greens that induce visual calm and focus.`;
    case 'muted-lavender':
      return `Dressed in ethereal twilight lavender for a dreamy, peaceful evening aura.`;
    case 'warm-cream':
      return `Enveloped in timeless honeyed linen and warm ivory tones that age gracefully.`;
    case 'terracotta-clay':
      return `Infused with sunbaked terracotta and warm earth tones for grounded vitality.`;
    default:
      return `Crafted in bespoke hues inspired by nature and mindful living.`;
  }
}
