import React from 'react';
import {
  Moon,
  Sparkles,
  Palette,
  Compass,
  HeartHandshake,
  CheckSquare,
  Feather,
  Briefcase,
  Square,
  BookOpen,
  Leaf,
  Sun,
  Trees,
  CloudMoon,
  Coffee,
  Flame,
  BookMarked,
  Award,
  Check,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Share2,
  ShoppingBag,
  Sparkle,
  Layers,
  ShieldCheck,
  Heart,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

interface IconHelperProps {
  name: string;
  className?: string;
}

export const IconHelper: React.FC<IconHelperProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Moon':
      return <Moon className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'HeartHandshake':
      return <HeartHandshake className={className} />;
    case 'CheckSquare':
      return <CheckSquare className={className} />;
    case 'Feather':
      return <Feather className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Square':
      return <Square className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Leaf':
      return <Leaf className={className} />;
    case 'Sun':
      return <Sun className={className} />;
    case 'Trees':
      return <Trees className={className} />;
    case 'CloudMoon':
      return <CloudMoon className={className} />;
    case 'Coffee':
      return <Coffee className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'BookMarked':
      return <BookMarked className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'Check':
      return <Check className={className} />;
    case 'RotateCcw':
      return <RotateCcw className={className} />;
    case 'ArrowRight':
      return <ArrowRight className={className} />;
    case 'ArrowLeft':
      return <ArrowLeft className={className} />;
    case 'Share2':
      return <Share2 className={className} />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} />;
    case 'Sparkle':
      return <Sparkle className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Heart':
      return <Heart className={className} />;
    case 'ExternalLink':
      return <ExternalLink className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
};
