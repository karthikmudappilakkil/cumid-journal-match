export type QuestionCategory = 'mood' | 'purpose' | 'aesthetic' | 'palette';

export interface QuizOption {
  id: string;
  label: string;
  subtitle: string;
  iconName: string;
  badge?: string;
  colorSwatch?: {
    primary: string;
    secondary: string;
    accent: string;
    name: string;
  };
  tags: string[];
}

export interface QuizQuestion {
  id: QuestionCategory;
  stepNumber: number;
  title: string;
  subtitle: string;
  categoryLabel: string;
  options: QuizOption[];
}

export type QuizAnswers = Record<QuestionCategory, string>;

export interface ProductSpecification {
  paperWeight: string;
  pages: number;
  rulingType: string;
  coverMaterial: string;
  dimensions: string;
  binding: string;
  sustainabilityTarget: string;
}

export interface DiaryProduct {
  id: string;
  name: string;
  tagline: string;
  collection: string;
  isArchetypeModel: boolean;
  catalogueNotice: string;
  description: string;
  whyThisMatches: string;
  specs: ProductSpecification;
  coverColorClass: string;
  accentColorClass: string;
  primaryColorHex: string;
  secondaryColorHex: string;
  visualPattern: 'linen' | 'leatherette' | 'botanical' | 'minimal' | 'modern';
  matchingProfile: {
    moods: string[];
    purposes: string[];
    aesthetics: string[];
    palettes: string[];
  };
  featuredHighlights: string[];
}

export interface RecommendationResult {
  primaryDiary: DiaryProduct;
  secondaryDiary: DiaryProduct;
  matchScore: number;
  secondaryMatchScore: number;
  matchReasons: {
    moodInsight: string;
    purposeInsight: string;
    aestheticInsight: string;
    paletteInsight: string;
  };
  matchedCriteria: {
    mood: boolean;
    purpose: boolean;
    aesthetic: boolean;
    palette: boolean;
  };
  userSelections: {
    mood: QuizOption;
    purpose: QuizOption;
    aesthetic: QuizOption;
    palette: QuizOption;
  };
}
