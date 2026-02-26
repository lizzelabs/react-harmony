import type { PropWithTheme, WithStyle } from '@/types';
import type { ReactNode } from 'react';
import type { HarmonyAnimation } from '../animations';

export type MediaProperties<Theme extends object | undefined> = {
  query: string | ((theme: Theme | undefined) => string);
  children: ReactNode | ReactNode[];
  removeFromHtml?: boolean;
  keyframes?: HarmonyAnimation<string>;
  animateAs?: string;
  withStyle?:
    | PropWithTheme<WithStyle, Theme>[]
    | PropWithTheme<WithStyle[] | WithStyle, Theme>;
  onActivate?: () => void;
};

export type UseMedia = { style: WithStyle; shouldRemoveComponent: boolean };
