import type { PropWithTheme } from '@/types';
import type { CSSProperties, ReactNode } from 'react';

export type KeyFramesFromTo = `${number}%` | `from` | 'to';
export type CssAnimation<Name extends string> = {
  [keyframes in `@keyframes ${Name}`]: {
    [key in KeyFramesFromTo]?: CSSProperties;
  };
};

export type HarmonyAnimation<Name extends string> = {
  name: Name;
  animation: CssAnimation<Name>;
};

export type AnimationsProperties<Theme extends object | undefined> = {
  value:
    | PropWithTheme<HarmonyAnimation<string>, Theme>
    | PropWithTheme<HarmonyAnimation<string>, Theme>[];
  children?: ReactNode | ReactNode[];
};
