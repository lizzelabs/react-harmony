import type { HtmlTag, PropWithTheme } from '@/types';
import type { PieceProperties } from '../piece';
import type { CSSProperties } from 'react';

export type ScrollableProperties<
  Theme extends object | undefined,
  Element extends HtmlTag,
  Component extends HTMLElement = HTMLElementTagNameMap[Element],
> = PieceProperties<Theme, Element, Component> & {
  horizontal?: boolean;
  vertical?: boolean;
  size?: 'auto' | 'thin' | 'none';
  behavior?: ScrollBehavior;
  scrollSnap?: CSSProperties['scrollSnapType'];
  primary?: PropWithTheme<string, Theme>;
  highlight?: PropWithTheme<string, Theme>;
};
