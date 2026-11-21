import { DIARY_CATALOGUE } from '../data/products';
import { QUIZ_QUESTIONS } from '../data/quizData';
import type { QuizAnswers, RecommendationResult, DiaryProduct, QuizOption } from '../types';

/**
 * Weights:
 * - Palette: 35%
 * - Purpose: 30%
 * - Mood: 20%
 * - Aesthetic: 15%
 * Total = 100%
 *
 * Scoring is genuine, un-inflated and directly reflective of matching criteria.
 */
export const SCORING_WEIGHTS = {
  palette: 35,
  purpose: 30,
  mood: 20,
  aesthetic: 15,
} as const;

export function calculateRecommendation(
  answers: Partial<QuizAnswers> = {},
  catalogue: DiaryProduct[] = DIARY_CATALOGUE
): RecommendationResult {
  // Graceful fallback for empty catalogue
  if (!catalogue || catalogue.length === 0) {
    throw new Error('No diary concepts found in catalogue.');
  }

  // Safe lookup of selected options (or defaults if missing)
  const moodOption: QuizOption =
    QUIZ_QUESTIONS[0].options.find((o) => o.id === answers.mood) ||
    QUIZ_QUESTIONS[0].options[0];
  const purposeOption: QuizOption =
    QUIZ_QUESTIONS[1].options.find((o) => o.id === answers.purpose) ||
    QUIZ_QUESTIONS[1].options[0];
  const aestheticOption: QuizOption =
    QUIZ_QUESTIONS[2].options.find((o) => o.id === answers.aesthetic) ||
    QUIZ_QUESTIONS[2].options[0];
  const paletteOption: QuizOption =
    QUIZ_QUESTIONS[3].options.find((o) => o.id === answers.palette) ||
    QUIZ_QUESTIONS[3].options[0];

  // Score each diary concept based on genuine matching logic
  const scoredProducts = catalogue.map((product) => {
    let score = 0;
    const profile = product.matchingProfile || {
      moods: [],
      purposes: [],
      aesthetics: [],
      palettes: [],
    };

    const paletteMatched = Boolean(answers.palette && profile.palettes.includes(answers.palette));
    const purposeMatched = Boolean(answers.purpose && profile.purposes.includes(answers.purpose));
    const moodMatched = Boolean(answers.mood && profile.moods.includes(answers.mood));
    const aestheticMatched = Boolean(answers.aesthetic && profile.aesthetics.includes(answers.aesthetic));

    if (paletteMatched) score += SCORING_WEIGHTS.palette;
    if (purposeMatched) score += SCORING_WEIGHTS.purpose;
    if (moodMatched) score += SCORING_WEIGHTS.mood;
    if (aestheticMatched) score += SCORING_WEIGHTS.aesthetic;

    return {
      product,
      score,
      matchedCriteria: {
        palette: paletteMatched,
        purpose: purposeMatched,
        mood: moodMatched,
        aesthetic: aestheticMatched,
      },
    };
  });

  // Deterministic sorting:
  // 1. Higher score first
  // 2. Tie-breaker: alphabetical by product name for deterministic stability
  scoredProducts.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.product.name.localeCompare(b.product.name);
  });

  const top = scoredProducts[0];
  const runnerUp = scoredProducts[1] || scoredProducts[0];

  const topMatch = top.product;
  const runnerUpProduct = runnerUp.product;

  const genuinePrimaryScore = top.score;
  const genuineSecondaryScore = runnerUp.score;

  // Personalized explanations strictly grounded in product attributes & user answers
  const matchReasons = {
    purposeInsight: generatePurposeInsight(answers.purpose, purposeOption, topMatch, top.matchedCriteria.purpose),
    moodInsight: generateMoodInsight(answers.mood, moodOption, topMatch, top.matchedCriteria.mood),
    aestheticInsight: generateAestheticInsight(answers.aesthetic, aestheticOption, topMatch, top.matchedCriteria.aesthetic),
    paletteInsight: generatePaletteInsight(answers.palette, paletteOption, topMatch, top.matchedCriteria.palette),
  };

  return {
    primaryDiary: topMatch,
    secondaryDiary: runnerUpProduct,
    matchScore: genuinePrimaryScore,
    secondaryMatchScore: genuineSecondaryScore,
    matchReasons,
    matchedCriteria: top.matchedCriteria,
    userSelections: {
      mood: moodOption,
      purpose: purposeOption,
      aesthetic: aestheticOption,
      palette: paletteOption,
    },
  };
}

function generatePurposeInsight(
  purposeId: string | undefined,
  purposeOption: QuizOption,
  product: DiaryProduct,
  isDirectMatch: boolean
): string {
  if (!purposeId) {
    return `Versatile ${product.specs.rulingType} layout accommodating varied writing and organization practices.`;
  }

  if (isDirectMatch) {
    return `Directly matches your ${purposeOption.label} practice with ${product.specs.rulingType} and ${product.specs.binding} comfort.`;
  }

  return `While originally tailored for ${product.matchingProfile.purposes.join(', ')}, its ${product.specs.rulingType} adapts well for ${purposeOption.label}.`;
}

function generateMoodInsight(
  moodId: string | undefined,
  moodOption: QuizOption,
  product: DiaryProduct,
  isDirectMatch: boolean
): string {
  if (!moodId) {
    return `The ${product.collection} concept is designed to cultivate an unhurried, mindful headspace.`;
  }

  if (isDirectMatch) {
    return `Complements your ${moodOption.label} state through the ${product.collection} concept, created as a ${product.tagline.toLowerCase()}.`;
  }

  return `Provides a grounding contrast to your ${moodOption.label} energy with a calming writing rhythm.`;
}

function generateAestheticInsight(
  aestheticId: string | undefined,
  aestheticOption: QuizOption,
  product: DiaryProduct,
  isDirectMatch: boolean
): string {
  if (!aestheticId) {
    return `Features ${product.specs.coverMaterial} with an understated ${product.visualPattern} aesthetic.`;
  }

  if (isDirectMatch) {
    return `Embodies your ${aestheticOption.label} aesthetic with tactile ${product.specs.coverMaterial} and ${product.visualPattern} styling.`;
  }

  return `Expresses a distinct tactile presence in ${product.specs.coverMaterial}, offering a balanced alternative to ${aestheticOption.label}.`;
}

function generatePaletteInsight(
  paletteId: string | undefined,
  paletteOption: QuizOption,
  product: DiaryProduct,
  isDirectMatch: boolean
): string {
  if (!paletteId) {
    return `Finished in signature cover and bookmark hues tailored to this diary concept.`;
  }

  if (isDirectMatch) {
    return `Directly incorporates your ${paletteOption.label} choice with a curated ${product.primaryColorHex} cover finish and coordinating ribbon marker.`;
  }

  return `Features an organic ${product.primaryColorHex} finish that harmonizes tastefully alongside ${paletteOption.label} desktop accessories.`;
}
