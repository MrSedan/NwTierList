import { TierProps } from '../components/Tier';

export const generateTierLevel = (name: string, color: string, textColor: string): TierProps => {
  return {
    name,
    color,
    textColor,
    id: crypto.randomUUID(),
  };
};
