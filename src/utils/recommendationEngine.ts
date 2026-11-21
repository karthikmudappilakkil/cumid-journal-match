import { DIARY_CATALOGUE } from '../data/products';
import { QUIZ_QUESTIONS } from '../data/quizData';
import type { QuizAnswers, RecommendationResult, DiaryProduct, QuizOption, MatchStrength } from '../types';

/**
 * Weights:
 * - Palette: 35%
 * - Purpose: 30%
 * - Mood: 20%
 * - Aesthetic: 15%
 * Total = 100%
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
  if (!catalogue || catalogue.length === 0) {
    throw new Error('No diary concepts found in catalogue.');
  }

  // Lookup ONLY options the user actually selected; do not substitute unchosen defaults
  const moodOption: QuizOption | undefined = answers.mood
    ? QUIZ_QUESTIONS[0].options.find((o) => o.id === answers.mood)
    : undefined;
  const purposeOption: QuizOption | undefined = answers.purpose
    ? QUIZ_QUESTIONS[1].options.find((o) => o.id === answers.purpose)
    : undefined;
  const aestheticOption: QuizOption | undefined = answers.aesthetic
    ? QUIZ_QUESTIONS[2].options.find((o) => o.id === answers.aesthetic)
    : undefined;
  const paletteOption: QuizOption | undefined = answers.palette
    ? QUIZ_QUESTIONS[3].options.find((o) => o.id === answers.palette)
    : undefined;

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
  // 2. Stable secondary tie-breaker: alphabetical by product name
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

  // Determine match strength tier
  let matchStrength: MatchStrength = 'exploratory';
  if (genuinePrimaryScore >= 70) {
    matchStrength = 'strong';
  } else if (genuinePrimaryScore >= 35) {
    matchStrength = 'moderate';
  } else if (genuinePrimaryScore > 0) {
    matchStrength = 'weak';
  }

  // Explanations strictly grounded in the user's actual selections and product specs
  const matchReasons = {
    purposeInsight: generatePurposeInsight(purposeOption, topMatch, top.matchedCriteria.purpose),
    moodInsight: generateMoodInsight(moodOption, topMatch, top.matchedCriteria.mood),
    aestheticInsight: generateAestheticInsight(aestheticOption, topMatch, top.matchedCriteria.aesthetic),
    paletteInsight: generatePaletteInsight(paletteOption, topMatch, top.matchedCriteria.palette),
  };

  return {
    primaryDiary: topMatch,
    secondaryDiary: runnerUpProduct,
    matchScore: genuinePrimaryScore,
    secondaryMatchScore: genuineSecondaryScore,
    matchStrength,
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
  purposeOption: QuizOption | undefined,
  product: DiaryProduct,
  isDirectMatch: boolean
): string {
  if (!purposeOption) {
    return `No purpose was selected. This concept features ${product.specs.rulingType} adaptable for various writing practices.`;
  }

  if (isDirectMatch) {
    return `Directly matches your ${purposeOption.label} practice with ${product.specs.rulingType} and ${product.specs.binding} comfort.`;
  }

  return `While developed with a focus on ${product.matchingProfile.purposes.join(', ')}, its ${product.specs.rulingType} layout can accommodate ${purposeOption.label}.`;
}

function generateMoodInsight(
  moodOption: QuizOption | undefined,
  product: DiaryProduct,
  isDirectMatch: boolean
): string {
  if (!moodOption) {
    return `No mood was selected. The ${product.collection} concept is crafted to cultivate an unhurried, mindful space.`;
  }

  if (isDirectMatch) {
    return `Complements your ${moodOption.label} state through the ${product.collection} concept, created as a ${product.tagline.toLowerCase()}.`;
  }

  return `Offers an alternative calming tempo to your ${moodOption.label} energy with an intentional writing structure.`;
}

function generateAestheticInsight(
  aestheticOption: QuizOption | undefined,
  product: DiaryProduct,
  isDirectMatch: boolean
): string {
  if (!aestheticOption) {
    return `No aesthetic was selected. Presents ${product.specs.coverMaterial} with an understated ${product.visualPattern} style.`;
  }

  if (isDirectMatch) {
    return `Embodies your ${aestheticOption.label} preference with tactile ${product.specs.coverMaterial} and ${product.visualPattern} detailing.`;
  }

  return `Presents tactile ${product.specs.coverMaterial}, providing a clean stylistic complement to ${aestheticOption.label}.`;
}

function generatePaletteInsight(
  paletteOption: QuizOption | undefined,
  product: DiaryProduct,
  isDirectMatch: boolean
): string {
  if (!paletteOption) {
    return `No palette was selected. Features signature ${product.primaryColorHex} cover styling with coordinating ribbon details.`;
  }

  if (isDirectMatch) {
    return `Directly reflects your ${paletteOption.label} choice with a curated ${product.primaryColorHex} cover finish and coordinating ribbon marker.`;
  }

  return `Finished in ${product.primaryColorHex}, offering an organic neutral palette that pairs alongside ${paletteOption.label} workspace items.`;
}
